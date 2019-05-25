import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  IonicPage,
  NavController,
  ToastController,
  NavParams,
  LoadingController,
  Loading
} from "ionic-angular";

import {
  LoggedUserProvider,
  UserProvider,
  DeviceStorageServices
} from "../../providers/providers";
import { ILoggedUser } from "../../providers/device-storage/device-storage";
import { User_post } from "../../models/API_Senders/user_post";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginPage } from "../login/login";
import { UserPostResponse } from "../../models/API_Receivers/UserPostResponse";
import { HttpHeaders } from "@angular/common/http";
import { Logged_User } from "../../models/API_Senders/logged_user_post";
import { UserResponse } from "../../models/API_Receivers/UserResponse";
import swal from "sweetalert";

import { HomeLoggedPage } from "../home-logged/home-logged";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  // Manejo del formulario
  signUpForm: FormGroup;
  Registro: User_post;
  tipodeusuario: string;
  tipoUsuarioNumber: number;
  isTCAceppted: boolean = false;
  private signupErrorString: string; // Our translated text strings

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loggedUserProvider: LoggedUserProvider,
    public userProvider: UserProvider,
    public translateService: TranslateService,
    public navParams: NavParams,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private storage: DeviceStorageServices
  ) {
    this.tipodeusuario = this.navParams.get("component");
    this.setUserNumberType(this.tipodeusuario);

    const groupForm = {
      UserName: ["", Validators.required],
      nombre: ["", Validators.required],
      apellidos: ["", Validators.required],
      email: ["", Validators.required],
      cedula: [""],
      token: ["", Validators.required],
      fechaDeNacimiento: [""],
      sexo: [""],
      edad: [""],
      provincia: [""],
      sector: [""],
      calle: [""],
      numero: [""],
      celular: ["", Validators.required],
      telefonotrabajo: [""],
      contrasena: ["", Validators.required],
      contrasena2: ["", Validators.required]
    };

    if (this.isTeacher()) {
      groupForm["indiceDeMateria"] = ["", Validators.required];
    }
    this.signUpForm = this.formBuilder.group(groupForm);

    this.translateService.get("SIGNUP_ERROR").subscribe(value => {
      this.signupErrorString = value;
    });
  }

  /**
   * Añade el ID a tipoUsuarioNumber dependiendo del tipo.
   *
   * @param string
   */
  setUserNumberType(type: string): void {
    if (type == "tutor") {
      this.tipoUsuarioNumber = 4;
    }

    if (type == "docente") {
      this.tipoUsuarioNumber = 3;
    }

    if (type == "director") {
      this.tipoUsuarioNumber = 2;
    }
  }

  Loginpage() {
    this.navCtrl.push(LoginPage);
  }

  /**
   * Genera y devuelve el formato de registro
   *
   * @param formValues Valores del formulario
   */
  formatRegister(formValues: any): User_post {
    console.log(formValues);
    this.Registro = {
      status: "1",
      password2: formValues.contrasena2,
      last_name: formValues.apellidos,
      date_birth: formValues.fechaDeNacimiento,
      public_id_school: formValues.token,
      age: formValues.edad,
      tutor_id: 0,
      first_name: formValues.nombre,
      phone: formValues.telefonotrabajo,
      cell_phone: formValues.celular,
      id_type: this.tipoUsuarioNumber,
      gender: formValues.sexo,
      user_id: 0,
      password: formValues.contrasena,
      user_name: formValues.UserName,
      email: formValues.email,
      document_id: formValues.cedula
    };

    if (this.isTeacher()) {
      this.Registro["subject_array_id"] = formValues.indiceDeMateria;
    }

    return this.Registro;
  }

  /**
   * Muestra el toast con un mensaje.
   * @param msg
   * @param duration
   * @param position
   */
  showNotification(msg: string, duration = 2000, position = "bottom") {
    const toast = this.toastCtrl.create({
      message: msg,
      duration,
      position
    });
    toast.present();
  }

  /**
   * Metodo para la creacion del usuario.
   */
  createUser() {
    const loading: Loading = this.loadingController.create({
      content: "Favor Esperar",
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });
    loading.present();

    this.formatRegister(this.signUpForm.value);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };

    this.userProvider
      ._post(this.Registro, httpOptions)
      .take(1)
      .toPromise()
      .then(res => {
        const response = <UserPostResponse>(<any>res);
        console.log(res);
        console.log(response);
        if (
          response.htmlCode === 201 ||
          (this.isTeacher() && response.htmlCode === 424)
        ) {
          loading.dismiss();
          return this.doSignIn();
        }
        swal("Ha ocurrido un error REGISTRO, Intentelo más tarde", "error");
        loading.dismiss();
      })
      .catch(e => swal("Error", e.message));
  }

  /**
   * Realiza el login
   */
  doSignIn() {
    const account: Logged_User = {
      password: this.Registro.password,
      user_name: this.Registro.user_name,
      id_type: "" + this.Registro.id_type
    };
    this.loggedUserProvider
      ._post(account)
      .take(1)
      .toPromise()
      .then((res: UserResponse) => {
        console.log(res);
        if (res.typeResponse == "Success" && res.htmlCode == 200) {
          this.setUserInStorage({ ...this.Registro, ...res.value[0] }).then(
            () => {
              this.navCtrl.setRoot(HomeLoggedPage);
            }
          );
        } else {
          swal("Ha ocurrido un error LOGIN, Intentelo más tarde", "error");
        }
      });
  }

  /**
   *  Metodo utilizado para validar el submit del formulario
   */
  onSubmit(): void {
    // Validar si el formulario es valido
    if (!this.signUpForm.valid) {
      this.showNotification("Favor rellenar campos faltantes");
      return;
    }

    // Validar la contraseña
    if (
      this.signUpForm.value.contrasena !== this.signUpForm.value.contrasena2
    ) {
      this.showNotification("Las contraseñas deben ser iguales");
      return;
    }

    if (!this.isTCAceppted) {
      this.showNotification("Debe aceptar los términos y condiciones");
      return;
    }

    this.createUser();
  }

  /**
   * Almacena el usuario en el almacenamiento.
   * @param user
   */
  setUserInStorage(user) {
    const newUser = { ...user, tipodeusuario: this.tipodeusuario };
    const loggedUser: ILoggedUser = {
      username: newUser.username,
      firstname: newUser.first_name,
      lastname: newUser.last_name,
      email: newUser.email,
      publicId: newUser.public_id,
      tipodeusuario: newUser.tipodeusuario,
      ID: newUser.id_user || newUser.ID,
      Gender: newUser.gender,
      phone: newUser.cell_phone,
      telefonocasa: newUser.phone
    };
    return this.storage.setLoggedUserAsync(loggedUser);
  }

  /**
   * Valida si el usuario actual es un Docente
   */
  isTeacher() {
    return this.tipodeusuario === "docente";
  }
}
