import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController,
  Loading,
  Platform,
  ModalController
} from "ionic-angular";
import {
  UserProvider,
  DeviceStorageServices,
  LoggedUserProvider,
  ImageProvider
} from "../../providers/providers";
import { FormGroup, FormControl } from "@angular/forms";
import { IResponseAPI } from "../../models/API_Receivers/IResponseAPI";
import { ILoggedUser } from "../../providers/device-storage/device-storage";
import { PhotoLibrary, LibraryItem } from "@ionic-native/photo-library";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FileChooser } from "@ionic-native/file-chooser";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { ModalPhoto } from "./photo-modal";
import { HomeLoggedPage } from "../home-logged/home-logged";
/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-edit-profile",
  templateUrl: "edit-profile.html"
})
export class EditProfilePage {
  updateForm: FormGroup;
  userDataLoggedIn: IUpdateUserDataLoggedIn;
  photos: any;
  selectedPhoto = "assets/imgs/perfil.png";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: DeviceStorageServices,
    public toastCtrl: ToastController,
    private userProvider: UserProvider,
    private loggedUserProvider: LoggedUserProvider,
    private photoLibrary: PhotoLibrary,
    private camera: Camera,
    private fileChooser: FileChooser,
    private transfer: FileTransfer,
    private modalCtrl: ModalController
  ) {
    this.storage.getLoggedUserAsync().then(user => {
      this.userDataLoggedIn = user;
    });
    this.updateForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl(),
      cell_phone: new FormControl(),
      phone: new FormControl(),
      email: new FormControl()
    });
  }

  /**
   * Toma la foto mediante la camara
   */
  getPhotoFromCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera
      .getPicture(options)
      .then(
        imageData => {
          let base64Image = "data:image/jpeg;base64," + imageData;
          this.showNotification("IMG: " + base64Image);
        },
        err => {
          this.showNotification("ERROR: " + err.message);
        }
      )
      .catch(err => {
        this.showNotification("ERROR CATCH: " + err.message);
      });
  }

  /**
   * Sube la imagen tomada desde el sistema de archivo
   */
  getPhotoFromFile() {
    this.fileChooser
      .open()
      .then(uri => {
        this.showNotification("URI:" + uri);

        const fileTransfer: FileTransferObject = this.transfer.create();

        let options: FileUploadOptions = {
          fileKey: "file",
          fileName: "name.jpg",
          headers: {}
        };

        fileTransfer
          .upload(uri, "http://157.230.10.122/PhotoApp", options)
          .then(
            data => {
              this.showNotification("SUBIO" + data);
            },
            err => {
              this.showNotification("ERROR EN SUBIDA" + err.message);
            }
          );
      })
      .catch(e => {
        this.showNotification("ERROR EN ELEGIR" + e.message);
      });
  }

  /**
   * Toma la foto por la galeria (NOT WORKING)
   */
  getPhotoFromGallery() {
    this.photoLibrary
      .requestAuthorization()
      .then(() => {
        this.photoLibrary.getLibrary().subscribe({
          next: library => {
            this.setPhotoLibrary(library);
            library.forEach(function(libraryItem) {
              console.log(libraryItem.id); // ID of the photo
              console.log(libraryItem.photoURL); // Cross-platform access to photo
              console.log(libraryItem.thumbnailURL); // Cross-platform access to thumbnail
              console.log(libraryItem.fileName);
              console.log(libraryItem.width);
              console.log(libraryItem.height);
              console.log(libraryItem.creationDate);
              console.log(libraryItem.latitude);
              console.log(libraryItem.longitude);
              console.log(libraryItem.albumIds); // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
            });
          },
          error: err => {
            this.showNotification("error with the photo" + err.message);
          },
          complete: () => this.presentPhotoModal()
        });
      })
      .catch(err =>
        this.showNotification("permissions weren't granted" + err.message)
      );
  }

  setPhotoLibrary(library) {
    this.photos = library;
  }

  presentPhotoModal() {
    this.showNotification("was complete");
    const photosToModal: LibraryItem[] = this.photos
      .sort((a, b) => b.creationDate - a.creationDate)
      .slice(0, 200);
    const photoModal = this.modalCtrl.create(ModalPhoto, {
      photos: photosToModal
    });

    photoModal.onDidDismiss(responseData => {
      if (responseData.selected) {
        this.selectedPhoto = responseData.photo.thumbnailURL;
      }
    });

    photoModal.present();
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

  ionViewDidLoad() {
    if (typeof this.userDataLoggedIn !== "undefined") {
      this.getLoggedUserById(this.userDataLoggedIn.ID).then((response: any) => {
        this.storage.setLoggedUser(response);
        this.storage.getLoggedUserAsync().then(user => {
          this.userDataLoggedIn = user;
        });
      });
    }
  }

  _close() {
    this.navCtrl.pop();
  }

  _updateData() {}

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

  onSubmit() {
    // Validar si el formulario es valido
    if (!this.updateForm.valid) {
      this.showNotification("Favor rellenar campos faltantes");
      return;
    }
    this.updateUser();
  }

  updateUser() {
    this.userProvider
      ._getById(this.userDataLoggedIn.publicId)
      .take(1)
      .toPromise()
      .then((v: any) => {
        const val = v.value[0];
        const us = this.updateForm.value;
        const newUser = { ...val, ...us };
        console.log("el nuevo usuario", newUser);
        this.userProvider
          ._put(null, newUser)
          .take(1)
          .toPromise()
          .then(res => {
            const response = <any>res;
            const user = response.value;
            const name = user.name || "";
            const loggedUser: ILoggedUser = {
              ID: user.user_id,
              Gender: user.gender,
              email: user.email,
              firstname: user.first_name,
              lastname: user.last_name,
              phone: user.cell_phone,
              publicId: user.public_id,
              telefonocasa: user.phone,
              tipodeusuario: this.userDataLoggedIn.tipodeusuario,
              username: this.userDataLoggedIn.username
            };
            console.log("usuario devuelto", loggedUser);
            return this.storage.setLoggedUserAsync(loggedUser);
          })
          .then(ob => {
            if (this.selectedPhoto !== "assets/imgs/perfil.png") {
              //return this.imageProvider._postImage(this.selectedPhoto);
            }
          })
          .then(() => {
            this.navCtrl.push(HomeLoggedPage);
          });
      });
  }
}

interface IUpdateUserDataLoggedIn {
  firstname: string;
  lastname: string;
  celular: string;
  telefonocasa: string;
  email: string;
  username: string;
  image: string;
  ID: string;
  publicId: string;
  tipodeusuario?: string;
}
