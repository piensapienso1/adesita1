import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Api } from "../api/api";

/*
  Generated class for the CalificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalificationProvider {
  constructor(public api: Api) {}

  _get() {
    return this.api.get("qualification");
  }

  _getByStudentId(params: IStudentCalificationParam) {
    return this.api.get(
      `qualification/${params.courseId}/${params.studentId}/${params.subjectId}`
    );
  }

  _getAllByStudentId(studentId) {
    return this.api.get(`qualification/${studentId}`);
  }

  _getByCourseAndSubjectId(param: ICalificationParam) {
    return this.api.get(`qualification/${param.courseId}/${param.subjectId}`);
  }

  _post(request: ICalificationRequest) {
    console.log(request);
    return this.api.post("qualification", request);
  }
}

export interface ICalificationRequest {
  id_usr_student: number;
  id_subject: number;
  test_type: string;
  value: number;
  id_course: number;
  id_qualification_type?: number;
  test_date: string;
}

export interface IStudentCalificationParam {
  subjectId: number;
  studentId: number;
  courseId: number;
}

export interface ICalificationParam {
  subjectId: string;
  courseId: string;
}

export interface ICalificationAssigned {
  type: string;
  subject?: string;
  calification: number;
  date?: string;
}
