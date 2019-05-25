import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { LoginPage } from "../login/login";
import { SignupPage } from "../signup/signup";
import { DeviceStorageServices } from "../../providers/providers";
import { ILoggedUser } from "../../providers/device-storage/device-storage";
import { HomeLoggedPage } from "../home-logged/home-logged";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  opcionesregistro: IRegistryOption[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private storage: DeviceStorageServices
  ) {
    this.opcionesregistro = [
      {
        title: "Padre o Tutor",
        description:
          "Regístrese para obtener las informaciones principales referente a la docencia de sus hijos.",
        image: "tutor",
        component: "tutor"
      },
      {
        title: "Docente",
        description:
          "Regístrese para obtener las informaciones principales referente a la docencia de sus hijos.",
        image: "docente",
        component: "docente"
      },
      {
        title: "Líder de Escuela",
        description:
          "Regístrese para obtener las informaciones principales referente a la docencia de sus hijos.",
        image: "director",
        component: "director"
      }
    ];
  }

  /**
   * Retorna una promise que indica si esta loggeado el usuario
   */
  userIsLogged(): Promise<boolean> {
    return this.storage.getLoggedUserAsync().then((user: ILoggedUser) => {
      if (typeof user !== "undefined" && user) {
        if (
          user.ID &&
          user.publicId &&
          user.firstname &&
          user.lastname &&
          user.tipodeusuario
        ) {
          return true;
        } else {
          return false;
        }
      }
    });
  }

  ionViewWillEnter() {
    this.userIsLogged().then(answer => {
      answer && this.navCtrl.push(HomeLoggedPage);
    });
  }

  SignInPage() {
    this.navCtrl.push(LoginPage);
  }

  SignUpPage(item: any) {
    this.navCtrl.push(SignupPage, { component: item });
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

interface IRegistryOption {
  title: string;
  description: string;
  image: string;
  component: any;
}
