import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the LoggedUserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoggedUserProvider {
  constructor(public api: Api) {}

  _get() {
    return this.api.get("loggeduser");
  }

  _post(params?: any) {
    return this.api.post("loggeduser", params);
  }
}
