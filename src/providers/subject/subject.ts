import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the SubjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubjectProvider {
  constructor(public api: Api) {}

  _getById(param) {
    return this.api.get("subject/" + param);
  }

  _get() {
    return this.api.get("subject");
  }
}

export interface ISubjectAssigned {
  subject: string;
  average: number;
  subjectId?: number;
}
