import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MemoProvider, INLParam } from "../../providers/memo/memo";
import {
  DeviceStorageServices,
  ILoggedUser
} from "../../providers/device-storage/device-storage";
import { IResponseAPI } from "../../models/API_Receivers/IResponseAPI";

/**
 * Generated class for the NewslettersDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-newsletters-details",
  templateUrl: "newsletters-details.html"
})
export class NewslettersDetailsPage {
  newsLettersDetails: INLDetails[];
  newsLetter: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private memoProvider: MemoProvider,
    private storage: DeviceStorageServices
  ) {
    this.newsLetter = this.navParams.get("newsLetter");
    this.storage
      .getLoggedUserAsync()
      .then((user: ILoggedUser) => {
        const params: INLParam = {
          memo_id: this.newsLetter.memoId,
          public_id_change: user.publicId
        };
        console.log(params, this.newsLetter);
        return this.updateMemo(params);
      })
      .then(res => {
        console.log(<IResponseAPI>(<any>res));
      });
  }

  updateMemo(params) {
    return this.memoProvider
      ._put(params)
      .take(1)
      .toPromise();
  }

  ionViewDidLoad() {
    const { title, message, date } = this.newsLetter;

    this.newsLettersDetails = [
      {
        title,
        message,
        date
      }
    ];
  }
}

interface INLDetails {
  title: string;
  message: string;
  date: string;
}
