import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the SubjectDetailsDocentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-subject-details-docente",
  templateUrl: "subject-details-docente.html"
})
export class SubjectDetailsDocentePage {
  subjectSelected;
  subjectModules: ISubjectModules[];
  private _paramSchool;
  private _paramSubject;

  gradeSubject = {
    title: "Calificaciones",
    description: "Asigne las calificaciones obtenidas de cada estudiante.",
    image: "calificacion",
    component: "SubjectCalificationPage",
    buttontext: "Calificación"
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const subject: ISubject = <ISubject>this.navParams.get("subject");
    this._paramSchool = this.navParams.get("school");
    this._paramSubject = this.navParams.get("paramSubject");
    this.subjectModules = this.getSubjectsModule();
    this.subjectSelected = {
      title: subject.materia,
      curso: subject.curso,
      horario: subject.horario,
      ID: subject.subjectId,
      totalestudiante: subject.cantidadestudiantes
    };
  }

  getSubjectsModule() {
    return [
      {
        title: "Calificaciones",
        description: "Asigne las calificaciones obtenidas de cada estudiante.",
        image: "calificacion",
        component: "SubjectCalificationDetailsPage",
        buttontext: "Calificación"
      },
      {
        title: "Asistencia",
        description:
          "Coloque la asistencia correspondiente a los alumnos del aula.",
        image: "asistencia",
        component: "AsistenceDocentePage",
        buttontext: "Pasar asistencia"
      },
      {
        title: "Agenda",
        description:
          "Asigne tareas o registre el desempeño diario de cada estudiante.",
        image: "agendatareas",
        component: "TasksActivitiesAgendaTabsPage",
        buttontext: "Ir a agenda"
      }
    ];
  }

  goToComponent(component) {
    const params = {
      subjectSelected: { ...this._paramSubject, ...this.subjectSelected },
      school: this._paramSchool
    };

    /* Para prueba */
    // params.subjectSelected.course_id = 24;
    // params.subjectSelected.subject_id = 41;
    /*          */

    console.log(params);
    // this.navCtrl.push(component, params);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SubjectDetailsDocentePage");
  }
}

interface ISubject {
  subjectId: number;
  courseId: number;
  curso: string;
  materia: string;
  horario: string;
  cantidadestudiantes?: string;
  component: string;
  image: string;
  icon: string;
}

interface ISubjectModules {
  title: string;
  description: string;
  image: string;
  component: any;
  buttontext: string;
}
