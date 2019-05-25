import { Injectable } from "@angular/core";
import { Api } from "../api/api";

@Injectable()
export class ActivitiesProvider {
  constructor(public api: Api) {}

  _get() {
    return this.api.get("activity");
  }

  _getByStudentId(studentId) {
    return this.api.get(`activity/${studentId}`);
  }

  _post(params: IActivitiesPostParam) {
    return this.api.post("activity", params);
  }
}

export interface IActivitiesPostParam {
  activity_id: number;
  user_id: number;
  description: string;
  title: string;
  date: string;
  student_name: string;
}

export interface IActivity {
  activity_id: number;
  date: string;
  description: string;
  student_name: string;
  title: string;
  user_id: number;
}

export interface IActivitiesOptions {
  text: string;
  id: number;
  selected?: boolean;
}

export const ACTIVITIES_OPTIONS: IActivitiesOptions[] = [
  {
    id: 1,
    text: "Durmio en la manana",
    selected: false
  },
  {
    id: 2,
    text: "Durmio en la tarde",
    selected: false
  },
  {
    id: 3,
    text: "Desayuno",
    selected: false
  },
  {
    id: 4,
    text: "Merendo en la manana",
    selected: false
  },
  {
    id: 5,
    text: "Merendo en la tarde",
    selected: false
  },
  {
    id: 6,
    text: "Lloro",
    selected: false
  },
  {
    id: 7,
    text: "Realizo actividades",
    selected: false
  },
  {
    id: 8,
    text: "Fue al bano",
    selected: false
  },
  {
    id: 10,
    text: "Compartio",
    selected: false
  },
  {
    id: 11,
    text: "Almorzo",
    selected: false
  },
  {
    id: 12,
    text: "Inquieto (a)",
    selected: false
  },
  {
    id: 13,
    text: "Interactuo",
    selected: false
  }
];

export const ACTIVITIES_OPTIONS_WITHACE: IActivitiesOptions[] = [
  {
    id: 1,
    text: "Durmió en la mañana"
  },
  {
    id: 2,
    text: "Durmió en la tarde"
  },
  {
    id: 3,
    text: "Desayunó"
  },
  {
    id: 4,
    text: "Merendó en la mañana"
  },
  {
    id: 5,
    text: "Merendó en la tarde"
  },
  {
    id: 6,
    text: "Lloró"
  },
  {
    id: 7,
    text: "Realizó actividades"
  },
  {
    id: 8,
    text: "Fue al baño"
  },
  {
    id: 10,
    text: "Compartió"
  },
  {
    id: 11,
    text: "Almorzó"
  },
  {
    id: 12,
    text: "Inquieto (a)"
  },
  {
    id: 13,
    text: "Interactuó"
  }
];
