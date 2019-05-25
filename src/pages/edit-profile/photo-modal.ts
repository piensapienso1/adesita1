import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { LibraryItem } from "@ionic-native/photo-library";
/**
 * Generated class for the PhotoModal page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    templateUrl: "photo-modal.html",
})
export class ModalPhoto {
    photos: LibraryItem[] = [];

    constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController){
        this.photos = this.navParams.get("photos")
        console.log(this.photos)
    }

    selectThisImg(photo) {
        console.log(photo)
        this.viewCtrl.dismiss({ selected: true, photo: photo })
    }

    dismiss() {
        this.viewCtrl.dismiss({ selected: true })
    }
}