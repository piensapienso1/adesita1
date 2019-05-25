import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  constructor(public api: Api) {}

  _get() {
    return this.api.get("user");
  }

  _post(params: any, reqOpts?: any) {
    return this.api.post("user", params, reqOpts);
  }

  _put(params?: any, body?: any, reqOpts?: any) {
    return this.api.put("user", body, reqOpts);
  }

  _getById(params?: any) {
    return this.api.get("user/" + params);
  }
  _getByPublicIdAndIdType(params?: any) {
    return this.api.get("user/" + params.public_id + "/" + params.id_type);
  }
}
