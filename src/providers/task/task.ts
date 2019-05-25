import { Injectable } from "@angular/core";
import { Api } from "../api/api";

@Injectable()
export class TaskProvider {
  constructor(public api: Api) {}

  _getByStudentId(studentId) {
    return this.api.get(`task/${studentId}`);
  }

  _put(body: ITaskPutParams, reqOpts?: any) {
    return this.api.put("task", body, reqOpts);
  }

  _post(params?: any) {
    return this.api.post("task", params);
  }
}

export interface ITaskPutParams {
  public_id_teacher: string;
  status_student?: number;
  task_id: number;
  subject_id?: number;
  status_teacher?: number;
  date?: string;
  school_id?: number;
  user_id: number;
  school_name?: string;
  subject_name?: string;
}

export interface ITask {
  subject_name: string;
  subject_id: number;
  course: string;
  course_id: number;
  date: string;
  description: string;
  task_id: number;
  status_student: string;
  public_id_teacher: string;
}

export interface ITaskPostParamsOld {
  subject_name?: string;
  subject_id: number;
  course?: string;
  course_id: number;
  date: string;
  description: string;
  id_task?: number;
  status_student?: string;
  public_id_docente: string;
}

export interface ITaskPostParams {
  public_id_teacher: string;
  user_id: number;
  description: string;
  task_id?: number;
  subject_id: number;
  school_name?: string;
  subject_name?: string;
  status_teacher: number;
  status_student?: number;
  date: string;
  school_id: number;
}

export interface IStudentTask {
  taskId: number;
  subjectName: string;
  courseName: string;
  date: string;
  description: string;
}

export enum AgendaTab {
  task = "tareas",
  performance = "desempeño"
}
