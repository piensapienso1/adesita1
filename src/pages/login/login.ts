import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  IonicPage,
  NavController,
  ToastController,
  LoadingController,
  Loading,
  Toast
} from "ionic-angular";
import {
  LoggedUserProvider,
  UserProvider,
  DeviceStorageServices
} from "../../providers/providers";
import { Logged_User } from "../../models/API_Senders/logged_user_post";
import swal from "sweetalert";
import { LoggedUserResponse } from "../../models/API_Receivers/LoggedUserResponse";
import { UserResponse } from "../../models/API_Receivers/UserResponse";
import { ILoggedUser } from "../../providers/device-storage/device-storage";
import { HomeLoggedPage } from "../home-logged/home-logged";
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: Logged_User = {
    password: "",
    user_name: "",
    id_type: ""
  };

  // Our translated text strings
  private loginErrorString: string;
  toast: any;

  constructor(
    public navCtrl: NavController,
    public loggedUserProvider: LoggedUserProvider,
    public userProvider: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingController: LoadingController,
    private storage: DeviceStorageServices
  ) {
    this.translateService.get("LOGIN_ERROR").subscribe(value => {
      this.loginErrorString = value;
    });
  }

  /**
   * Crea y devuelve un toast con el mensaje asignado
   *
   * @param msg
   */
  showToastMessage(msg: string): Toast {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: "bottom"
    });
    return this.toast;
  }

  /**
   * Valida si el form 'account' esta completo
   */
  formIsComplete(): boolean {
    if (
      this.account.id_type == "" ||
      this.account.password == "" ||
      this.account.user_name == ""
    ) {
      this.showToastMessage("Favor rellenar campos faltantes").present();
      return false;
    }
    return true;
  }

  /**
   * Realiza el login del usuario y retorna una promise con los datos
   */
  requestLogin(): Promise<any> {
    return this.loggedUserProvider
      ._post(this.account)
      .take(1)
      .toPromise();
  }

  /**
   * Solicita la data del usuario loggeado buscado por su publicId
   *
   * @param publicId
   */
  getLoggedData(publicId): Promise<any> {
    return this.userProvider
      ._getById(publicId)
      .take(1)
      .toPromise()
      .then((response: UserResponse) => {
        if (response.typeResponse == "Success" && response.htmlCode == 200) {
          console.log(response);
          return response.value[0];
        }
      });
  }

  /**
   * Realiza todo el proceso de login -
   */
  doLoginT(): void {
    if (!this.formIsComplete()) return;

    let loading: Loading = this.loadingController.create({
      content: "Favor Esperar",
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });
    loading.present();

    let userName = "";
    let type = "";

    this.requestLogin()
      .then((resp: LoggedUserResponse) => {
        if (resp.typeResponse == "Success" && resp.htmlCode == 200) {
          return resp.value[0];
        }
        throw new Error(resp.description);
      })
      .then(user => {
        userName = user.user_name;
        type = user.type.toLowerCase();
        return this.getLoggedData(user.public_id);
      })
      .then(fullUser => {
        const user: ILoggedUser = {
          username: userName,
          ID: fullUser.user_id,
          publicId: fullUser.public_id,
          tipodeusuario: type || fullUser.name.toLowerCase(),
          firstname: fullUser.first_name,
          lastname: fullUser.last_name,
          Gender: fullUser.gender,
          email: fullUser.email,
          phone: fullUser.cell_phone,
          telefonocasa: fullUser.phone
        };
        return this.storage.setLoggedUserAsync(user);
      })
      .then(() => {
        this.navCtrl.setRoot(HomeLoggedPage);
      })
      .catch(err => {
        loading.dismiss();
        swal("Ups!..", err.message, "error");
      });
  }

  atras() {
    this.navCtrl.pop();
  }

  _mensajeBienvenida(usuario: string) {
    var mensaje = "Bienvenid@";
    console.log(localStorage.getItem("loggedUserInformation_Gender"));
    if (localStorage.getItem("loggedUserInformation_Gender") == "f") {
      mensaje = "Bienvenida";
    } else {
      mensaje = "Bienvenido";
    }
    let toast = this.toastCtrl.create({
      duration: 2000,
      message: "" + mensaje + " " + usuario,
      position: "bottom"
    });
    toast.present();
  }
}
