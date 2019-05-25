import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the SchoolProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SchoolProvider {
  constructor(public api: Api) {}

  _get() {
    return this.api.get("school");
  }

  _getById(id: string | number) {
    return this.api.get(`school/${id}`);
  }

  public _getByPublicId(params: ISchoolParam) {
    return this.api.get(`school/${params.publicId}`);
  }

  _post(params: any, reqOpts?: any) {
    return this.api.post("school", params, reqOpts);
  }
}

export interface ISchoolParam {
  publicId: string;
}
