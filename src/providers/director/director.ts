import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the DirectorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DirectorProvider {
  constructor(public api: Api) {}

  _getByIdSchool(id) {
    return this.api.get(`director/${id}`);
  }
}
