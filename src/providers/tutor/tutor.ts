import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the TutorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TutorProvider {
  constructor(public api: Api) {}

  _getChildrensById(publicId: string) {
    return this.api.get("child/" + publicId);
  }

  _get() {
    return this.api.get("tutor");
  }

  _getById(params?: any) {
    return this.api.get("tutor/" + params);
  }

  _getStudentsById(params: ITutorChildParams) {
    return this.api.get(`tutor/${params.publicId}/${params.schoolId}`);
  }
}

export interface ITutorChildParams {
  publicId: string;
  schoolId: string;
}

export interface IEnrolledChild {
  fullName: string;
  publicId: string;
  userCode: string;
  course?: string;
  image?: string;
  courseId?: string;
  userId: number;
  numCourseStudent?: number;
}
