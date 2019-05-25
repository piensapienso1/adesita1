import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the TeacherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeacherProvider {
  constructor(public api: Api) {}

  _get() {
    return this.api.get("teacher");
  }

  _getByPublicId(params: ITeacherParam) {
    return this.api.get(`teacher/${params.publicId}/${params.schoolId}`);
  }

  _post(params?: any) {
    return this.api.post("teacher", params);
  }
}

export interface ITeacherParam {
  publicId: string;
  schoolId: number;
}
