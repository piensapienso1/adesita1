import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Loading,
  LoadingController
} from "ionic-angular";
import { FormBuilder } from "@angular/forms";
import { MemoProvider } from "../../providers/memo/memo";
import swal from "sweetalert";
import { Memo_Post } from "../../models/API_Senders/memo_post";
import { MemoPostResponse } from "../../models/API_Receivers/MemoPostResponse";
import { DeviceStorageServices } from "../../providers/providers";
import { ILoggedUser } from "../../providers/device-storage/device-storage";
import { IResponseAPI } from "../../models/API_Receivers/IResponseAPI";

@IonicPage()
@Component({
  selector: "page-newsletters-director",
  templateUrl: "newsletters-director.html"
})
export class NewslettersDirectorPage {
  memo: Memo_Post = {
    id_memo_type: 0,
    description: "",
    title: "",
    public_id_creator: "",
    school_id: 0
  };
  loggedUser: ILoggedUser;
  loading: Loading;
  school: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public memoProvider: MemoProvider,
    public loadingCtrl: LoadingController,
    private storage: DeviceStorageServices
  ) {
    this.storage.getLoggedUserAsync().then(user => {
      this.loggedUser = user;
    });
    this.school = this.navParams.get("_paramSchool");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad NewslettersPage");
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Enviando Boletin",
      dismissOnPageChange: true,
      enableBackdropDismiss: false
    });

    this.loading.present();
  }

  showMsgInSwal(title, msg?, type = "success") {
    swal(title, msg, type);
  }

  validateForm(): boolean {
    return (
      !!this.memo.title &&
      !!this.memo.description &&
      this.memo.id_memo_type !== 0
    );
  }

  _sendMemo() {
    if (!this.validateForm()) {
      return this.showMsgInSwal("Aviso", "Debe llenar todos los campos");
    }

    this.memo.public_id_creator = this.loggedUser.publicId;
    this.memo.school_id = this.school.school_id;
    this.presentLoading();
    this.memoProvider
      ._post(this.memo)
      .take(1)
      .toPromise()
      .then(res => {
        const response = <IResponseAPI>(<any>res);
        if (response.typeResponse == "Success" && response.htmlCode == 201) {
          this.loading.dismiss();
          this.showMsgInSwal("Excelente", "Enviado correctamente");
          return this.navCtrl.pop();
        }
        this.loading.dismiss();
        this.showMsgInSwal(
          "Ups!..",
          "No se ha podido enviar el boletín",
          "error"
        );
      })
      .catch(err => {
        this.loading.dismiss();
        this.showMsgInSwal("Ups!..", "Ha ocurrido un error", "error");
      });
  }
}
