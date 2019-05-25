import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController
} from "ionic-angular";
import { EditProfilePage } from "../edit-profile/edit-profile";
import { LoginPage } from "../login/login";
import { SchoolProvider, ISchoolParam } from "../../providers/school/school";
import { IResponseAPI } from "../../models/API_Receivers/IResponseAPI";
import {
  LoggedUserProvider,
  DeviceStorageServices
} from "../../providers/providers";
import swal from "sweetalert";

import { EducativeCenterDetailsPage } from "../educative-center-details/educative-center-details";
import { HomePage } from "../home/home";
import { NewslettersDirectorPage } from "../newsletters-director/newsletters-director";

/**
 * Generated class for the HomeLoggedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home-logged",
  templateUrl: "home-logged.html"
})
export class HomeLoggedPage {
  userLoggedIn: any;
  adminsModules: IModulosAdministrativos[];
  tutorsAndTeachersSchool: ICentrosEducativosDocentesTutor[];
  tipodeusuario: string;
  principalSchool: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private schoolProvider: SchoolProvider,
    private loggedUserProvider: LoggedUserProvider,
    private storage: DeviceStorageServices
  ) {
    this.getLoggedUserData().then(res => {
      this.userLoggedIn = res;
      this.tipodeusuario = this.userLoggedIn.tipodeusuario;
      this.adminsModules = this.getAdminModules();
      this.getSchools(this.userLoggedIn.publicId);
      console.log(this.userLoggedIn);
    });
  }

  /**
   * Añade el ID a tipoUsuarioNumber dependiendo del tipo.
   *
   * @param string
   */
  getUserNumberType(type: string): number {
    if (type == "tutor") {
      return 4;
    }

    if (type == "docente") {
      return 3;
    }

    if (type == "director") {
      return 2;
    }
  }

  ionViewWillEnter() {
    this.storage.getLoggedUserAsync().then(res => {
      this.userLoggedIn = res;
    });
    console.log(this.userLoggedIn);
  }

  _OpenPage(item: any) {
    const _paramSchool =
      this.principalSchool || this.tutorsAndTeachersSchool[0];
    const userLogged = this.userLoggedIn;
    this.navCtrl.push(item, { _paramSchool, userLogged });
  }

  _NotificationsPage() {
    //this.navCtrl.push(NotificationsPage);
  }

  _goToEditProfile() {
    this.navCtrl.push(EditProfilePage);
  }
  _popUpMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      title: "Acciones de Usuario",
      buttons: [
        {
          text: "Cerrar Sesion",
          role: "destructive",
          cssClass: "color:danger",
          handler: () => {
            this.storage.clearUserLogged().then(() => {
              this.navCtrl.setRoot(HomePage);
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Metodo que devuelve los datos del usuario loggeado sino lo envia al home.
   */
  async getLoggedUserData(): Promise<IUserDataLoggedIn> {
    const asyncUser = this.storage.getLoggedUserAsync();
    /*const user = this.storage.getLoggedUser();

    if (typeof user.publicId === "undefined" || user.publicId === "undefined") {
      this.navCtrl.push(HomePage);
    }*/
    return asyncUser;
  }

  /**
   * Metodo para obtener el modulo de los administradores.
   */
  getAdminModules() {
    return [
      /* {
        title: "Consultas generales",
        description:
          "Realice consultas rápidas sobre los registros de cada uno de los integrantes creados en su centro educativo",
        image: "consultas",
        component: "ConsultsDirectorPage",
        buttontext: "Consultar",
        tipodeusuario: "director"
      },*/
      {
        title: "Boletines",
        description:
          "Cree boletines para informar a los padres, docentes y empleados sobre alguna actividad del centro.",
        image: "boletines",
        component: NewslettersDirectorPage,
        buttontext: "Crear",
        tipodeusuario: "director"
      }
      /*{
        title: "Mensajes",
        description: "Envíe mensajes directos a padres, docentes y empleados",
        image: "mensaje",
        component: "MessagesSearchTabsPageDirectorPage",
        buttontext: "Ir a chat",
        tipodeusuario: "director"
      }*/
    ];
  }

  /**
   * Obtiene los datos del usuario loggeado
   *
   * @param userId
   */
  async getLoggedUserById(userId) {
    const response = <IResponseAPI>(<any>await this.loggedUserProvider
      ._get()
      .take(1)
      .toPromise());
    if (response.htmlCode == 200) {
      const result = response.value.find(obj => obj.id_user == userId);
      return result;
    }
    return {};
  }
  /**
   * Metodo que devuelve los centros educativos. FAKE
   */
  getSchoolsFake() {
    return [
      {
        title: "Nombre del Centro Educativo1",
        description: "Estos son los centros educativos donde imparte docencia.",
        image: "centroeducativo",
        component: "",
        Telefono: "",
        ID: "",
        tipodeusuario: "docente"
      },
      {
        title: "Nombre del Centro Educativo2",
        description: "Estos son los centros educativos donde imparte docencia.",
        image: "centroeducativo",
        component: "",
        Telefono: "",
        ID: "",
        tipodeusuario: "docente"
      },

      {
        title: "Nombre del Centro Educativo",
        description: "Estos son los centros educativos donde imparte docencia.",
        image: "centroeducativo",
        component: "",
        Telefono: "",
        ID: "",
        tipodeusuario: "tutor"
      }
    ];
  }

  /**
   * Metodo que devuelve los centros educativos.
   */
  async getSchools(publicId: string) {
    const Params: ISchoolParam = {
      publicId: publicId || this.userLoggedIn.publicId
    };
    this.schoolProvider
      ._getByPublicId(Params)
      .take(1)
      .toPromise()
      .then(res => {
        const response = <IResponseAPI>(<any>res);
        if (response.typeResponse == "Success" && response.htmlCode == 200) {
          this.tutorsAndTeachersSchool = response.value;
          if (this.isPrincipal) {
            this.principalSchool = response.value[0];
          }
        } else {
          swal("Ha ocurrido un error CARGANDO LOS CENTROS EDUCATIVOS", "error");
        }
      })
      .catch(e => console.log(e));
  }

  /**
   * Va al detalle de la escuela seleccionada
   *
   * @param school
   */
  centroEducativoDetalles(school) {
    this.navCtrl.push(EducativeCenterDetailsPage, {
      school,
      id: school.school_id
    });
  }

  /**
   * Propiedad que indica si el usuario loggeado es docente o tutor
   */
  get isSchoolTeacherOrTutor() {
    return (
      (this.tutorsAndTeachersSchool && this.tipodeusuario == "docente") ||
      this.tipodeusuario == "tutor"
    );
  }

  /**
   * Propiedad que indica si el usuario loggeado es director
   */
  get isPrincipal() {
    return this.adminsModules && this.tipodeusuario == "director";
  }
}

interface IUserDataLoggedIn {
  firstname: string;
  username: string;
  lastname: string;
  ID: string;
  Gender?: string;
  tipodeusuario?: string;
  publicId?: string;
}

interface IModulosAdministrativos {
  title: string;
  description: string;
  image: string;
  component: any;
  buttontext: string;
  tipodeusuario: string;
}

interface ICentrosEducativosDocentesTutor {
  title: string;
  description: string;
  image: string;
  component: any;
  ID: string;
  Telefono: string;
  tipodeusuario: string;
}
