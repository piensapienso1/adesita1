import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
/*
  Generated class for the GradeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceStorageServices {
  constructor(private storage: Storage) {}

  /**
   * Limpia los datos almacenados del usuario.
   */
  clearUserLogged() {
    return this.storage.set("loggedUser", {});
  }

  /**
   * Returna los datos del usuario loggeado (LocalStorage)
   */
  getLoggedUser(): any {
    const firstname = localStorage.getItem("loggedUserInformation_FirstName");
    const lastname = localStorage.getItem("loggedUserInformation_LastName");
    const ID = localStorage.getItem("loggedUserInformation_IdUser");
    const username = localStorage.getItem("loggedUserInformation_UserName");
    const Gender = localStorage.getItem("loggedUserInformation_Gender");
    const email = localStorage.getItem("loggedUserInformation_Email");
    const phone = localStorage.getItem("loggedUserInformation_Phone");
    const telefonocasa = localStorage.getItem("loggedUserInformation_Tel");
    const tipoUsuario = localStorage.getItem("loggedUserInformation_Type");
    const publicId = localStorage.getItem("loggedUserPublic_Id");

    return {
      firstname,
      username,
      lastname,
      ID,
      email,
      phone,
      telefonocasa,
      Gender,
      publicId,
      tipodeusuario: tipoUsuario
    };
  }

  /**
   * coloca los datos del usuario loggeado (LocalStorage)
   */
  setLoggedUser(user: any) {
    localStorage.setItem("loggedUserInformation_FirstName", user.first_name);
    localStorage.setItem("loggedUserInformation_LastName", user.last_name);
    if (user.id_user)
      localStorage.setItem("loggedUserInformation_IdUser", user.id_user);
    if (user.user_name)
      localStorage.setItem("loggedUserInformation_UserName", user.user_name);
    localStorage.setItem("loggedUserInformation_Gender", user.gender);
    localStorage.setItem("loggedUserInformation_Email", user.email);
    localStorage.setItem("loggedUserInformation_Phone", user.cell_phone);
    localStorage.setItem("loggedUserInformation_Tel", user.phone);
    if (user.tipodeusuario)
      localStorage.setItem("loggedUserInformation_Type", user.tipodeusuario);
    localStorage.setItem("loggedUserPublic_Id", user.public_id);
  }

  /**
   * Returna una promise con los datos del usuario loggeado
   */
  async getLoggedUserAsync() {
    let asyncUser = await this.storage.get("loggedUser");

    /**
     * Esto es para test
     */
    if (asyncUser) {
      // asyncUser.publicId = "15ac181e-5ea8-46ce-920d-89c68bf6b800";
      // asyncUser.publicId = "820e4b80-807b-464e-80bb-3476c22f9f87";
    }

    console.log(asyncUser);

    return asyncUser;
  }

  /**
   * Returna una promise colocando los datos del usuario loggeado
   */
  setLoggedUserAsync(user: ILoggedUser) {
    const loggedUser: ILoggedUser = user;
    return this.storage.set("loggedUser", loggedUser);
  }
}

export interface ILoggedUser {
  firstname: string;
  lastname: string;
  ID: number;
  username: string;
  Gender?: string;
  email?: string;
  phone?: string;
  telefonocasa?: string;
  tipodeusuario: string;
  publicId: string;
}
