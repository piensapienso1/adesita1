import { Component, Pipe } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController
} from "ionic-angular";
import { FormBuilder } from "@angular/forms";
import { MemoProvider } from "../../providers/memo/memo";
import { NewslettersResponse } from "../../models/API_Receivers/NewslettersResponse";
import { NewslettersDetailsPage } from "../newsletters-details/newsletters-details";
import swal from "sweetalert";
import { DeviceStorageServices } from "../../providers/providers";
import { IResponseAPI } from "../../models/API_Receivers/IResponseAPI";

/**
 * Generated class for the NewslettersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-newsletters",
  templateUrl: "newsletters.html"
})
@Pipe({
  name: "truncate"
})
export class NewslettersPage {
  newsLettersOptions: INewsLetterOptions[];
  memos: IMemo[];
  loading: Loading;
  tipodeusuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public memoProvider: MemoProvider,
    public loadingCtrl: LoadingController,
    private storage: DeviceStorageServices
  ) {}

  /**
   * Muestra la notificacion de carga
   */
  showNotification() {
    this.loading = this.loadingCtrl.create({
      content: "Cargando Boletines",
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });
    this.loading.present();
  }

  /**
   * Obtiene los memos y los asigna a la propiedad 'memo'
   */
  getMemos() {
    return this.memoProvider
      ._get()
      .take(1)
      .toPromise()
      .then(res => {
        const response = <IResponseAPI>(<any>res);
        if (response.htmlCode == 200 && response.typeResponse == "Success") {
          this.memos = <IMemo[]>response.value;
        }
      });
  }

  ionViewDidEnter() {
    this.showNotification();
    this.getMemos()
      .then(obj => {
        return this.storage.getLoggedUserAsync();
      })
      .then(user => {
        this.newsLettersOptions = this.memos
          .filter(
            m => m.id_memo_type === this.getTypeUserCode(user.tipodeusuario)
          )
          .map(this.clasifiedMemos(user));
        this.newsLettersOptions = this.newsLettersOptions.sort((a, b) =>
          a.date >= b.date ? -1 : 1
        );
        console.log(this.newsLettersOptions);
        this.loading.dismiss();
      })
      .catch(e => {
        swal("Ups!..", "Ha ocurrido un error: " + e.message, "error");
      });
  }

  ionViewDidLoad() {}

  getTypeUserCode(type) {
    switch (type) {
      case "docente":
        return 1;
      case "director":
        return 3;
      case "tutor":
        return 2;
      case "estudiante":
        return 5;
    }
  }

  getIconIfViewed(memo, publicId): string {
    if (
      memo.public_id_change === "None" ||
      !Array.isArray(memo.public_id_change)
    ) {
      return "notificacionactivada";
    }

    const result = memo.public_id_change.filter(m => m.public_id == publicId);

    return result.length ? "notificaciondesactivada" : "notificacionactivada";
  }

  /**
   * High order function
   *
   * Clasifica los memos/boletines de acuerdo al tipo de usuario
   */
  clasifiedMemos = ({ publicId, tipodeusuario }) => (
    memo
  ): INewsLetterOptions => {
    console.log(memo, tipodeusuario);
    switch (tipodeusuario) {
      case "director":
        if (memo.id_memo_type == 3) {
          return {
            memoId: memo.memo_id,
            title: memo.title,
            NomCenter: memo.school_name,
            image: "detalleboletinestutor",
            date: memo.memo_date,
            message: memo.description,
            icon: this.getIconIfViewed(memo, publicId)
          };
        }
        break;
      case "estudiante":
        if (memo.id_memo_type == 5) {
          return {
            memoId: memo.memo_id,
            title: memo.title,
            NomCenter: memo.school_name,
            image: "detalleboletinestutor",
            date: memo.memo_date,
            message: memo.description,
            icon: this.getIconIfViewed(memo, publicId)
          };
        }
        break;
      case "tutor":
        if (memo.id_memo_type == 2) {
          return {
            memoId: memo.memo_id,
            title: memo.title,
            NomCenter: memo.school_name,
            image: "detalleboletinestutor",
            date: memo.memo_date,
            message: memo.description,
            icon: this.getIconIfViewed(memo, publicId)
          };
        }
        break;
      case "docente":
        if (memo.id_memo_type == 1) {
          return {
            memoId: memo.memo_id,
            title: memo.title,
            NomCenter: memo.school_name,
            image: "detalleboletinestutor",
            date: memo.memo_date,
            message: memo.description,
            icon: this.getIconIfViewed(memo, publicId)
          };
        }
        break;
    }
  };

  _NewslettersDetails(news: any) {
    this.navCtrl.push(NewslettersDetailsPage, {
      newsLetter: news
    });
  }
}

interface INewsLetterOptions {
  NomCenter: string;
  title: string;
  image: string;
  date: string;
  message: string;
  icon: string;
  memoId: number;
}

interface IMemo {
  id_memo_type: number;
  memo_date: string;
  description: string;
  title: string;
  user_id: string;
}
