import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the AssistanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AssistanceProvider {
  constructor(public api: Api) {
    console.log("Hello AssistanceProvider Provider");
  }

  _get() {
    return this.api.get("assitance");
  }

  _getByPublicId(param: IStudentAssistanceParam) {
    return this.api.get(`assitance/${param.publicId}/${param.subjectId}`);
  }

  _getByStudentId(studentId: number) {
    return this.api.get(`assitance/${studentId}`);
  }

  _post(params?: any) {
    return this.api.post("assitance", params);
  }
}

export interface IStudentAssistanceParam {
  publicId: string;
  subjectId: number;
}
