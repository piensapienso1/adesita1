import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the StudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudentProvider {
  constructor(public api: Api) {}

  _get() {
    return this.api.get("student");
  }

  _getStudentsList(params: IStudentListParam) {
    return this.api.get(
      `student/${params.courseId}/${params.schoolId}/${params.subjectId}`
    );
  }

  _post(params?: any) {
    return this.api.post("student", params);
  }
}

export interface IStudentListParam {
  courseId: number;
  schoolId: number;
  subjectId: number;
}

export interface IStudent {
  publicId: string;
  parentId: number;
  userId: number;
  name: string;
  userCode: string;
  image: string | any;
  isPresent: boolean;
  selected: boolean;
  justifyText?: string;
}
