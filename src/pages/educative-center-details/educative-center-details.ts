import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  SchoolProvider,
  DeviceStorageServices,
  DirectorProvider,
  SubjectProvider
} from "../../providers/providers";
import { IResponseAPI } from "../../models/API_Receivers/IResponseAPI";
import { SubjectDetailsDocentePage } from "../subject-details-docente/subject-details-docente";
import {
  TutorProvider,
  ITutorChildParams,
  IEnrolledChild
} from "../../providers/tutor/tutor";
import swal from "sweetalert";
import { NewslettersPage } from "../newsletters/newsletters";

/**
 * Generated class for the EducativeCenterDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-educative-center-details",
  templateUrl: "educative-center-details.html"
})
export class EducativeCenterDetailsPage {
  school: ISchoolDetails;
  private _paramSchool;
  tipodeusuario;

  profileDirector;

  schoolOptionsDetails: ISchoolOptionsDetails[];
  subjects: ISubject[];
  enrolled: IEnrolledChild[];
  loggedUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private schoolService: SchoolProvider,
    private directorProvider: DirectorProvider,
    private storage: DeviceStorageServices,
    private subjectProvider: SubjectProvider,
    private tutorProvider: TutorProvider
  ) {
    const schoolId = this.navParams.get("id");
    this._paramSchool = this.navParams.get("school");

    console.log("PARAM SCHOOL", this._paramSchool);

    this.getSchoolDetailsByID(+schoolId)
      .then(() => {
        return this.storage.getLoggedUserAsync();
      })
      .then(user => {
        this.loggedUser = user;
        this.tipodeusuario = user.tipodeusuario;
        console.log(user);
        if (this.isTutor)
          return this.getChildrensByPublicId(this.loggedUser.publicId);
        return this.getSubjectsByPublicId(this.loggedUser.publicId);
      })
      .then(() => {
        this.getDirectorBySchoolId(schoolId);
      });

    this.schoolOptionsDetails = [
      {
        title: "Boletines Informativos",
        description: "Verifique donde está ubicado el centro educativo.",
        component: "NewslettersDetails",
        image: "detalleboletines",
        icon: "",
        type: "boletinesinformativos",
        buttontext: "Ir a boletines"
      }
    ];
  }

  ionViewDidLoad() {}

  /**
   * Setter de la propiedad 'enrolled'
   *
   * @param school
   */
  setChildrens(values: any[]) {
    console.log("HIJOS", values);
    this.enrolled = values.map(
      (obj): IEnrolledChild => {
        return {
          fullName: obj.student_name,
          publicId: obj.public_id_child,
          userCode: obj.user_code,
          image: "perfil",
          course: obj.course_name || " - ",
          courseId: obj.course_id,
          userId: obj.user_id,
          numCourseStudent: obj.num_course_students
        };
      }
    );
  }

  /**
   * Setter de la propiedad 'school'
   *
   * @param school
   */
  setSchoolSelected(school) {
    this.school = <ISchoolDetails>school;
  }

  /**
   * Setter de la propiedad 'subject'
   *
   * @param school
   */
  setSubjects(subjects) {
    console.log(subjects);
    this.subjects = subjects.map(
      (sub): ISubject => {
        const result: ISubject = {
          courseId: sub.course_id,
          subjectId: sub.subject_id,
          curso: sub.course_name || " - ",
          materia: sub.subject_name,
          horario: `${sub.time_from} / ${sub.time_to}`,
          component: "EducativeCenter",
          image: "materiasdocente",
          icon: "notificacionmensajes",
          cantidadestudiantes: sub.count_students,
          response: sub
        };
        return result;
      }
    );
  }

  /**
   * Obtiene todos los datos que seran mostrados en el detalle
   *
   * @param id school_id
   */
  getSchoolDetailsByID(id: number) {
    return this.schoolService
      ._getById(id)
      .take(1)
      .toPromise()
      .then(res => {
        const response = <IResponseAPI>(<any>res);
        if (response.htmlCode == 200) {
          return this.setSchoolSelected(response.value[0]);
        }
        throw new Error(response.description);
      })
      .catch(e => swal(e.message, "error"));
  }

  /**
   * Obtiene los hijos del tutor registrado
   *
   * @param publicId
   */
  getChildrensByPublicId(publicId: string) {
    this.tutorProvider
      ._getChildrensById(publicId)
      .take(1)
      .toPromise()
      .then(res => {
        const response = <IResponseAPI>(<any>res);
        if (response.htmlCode == 200) {
          return this.setChildrens(response.value);
        }
        throw new Error(response.description);
      })
      .catch(e => swal(e.message, "error"));
  }

  /**
   * Obtiene las asignaturas de acuerdo al publicId del usuario loggeado.
   *
   * @param publicId
   */
  getSubjectsByPublicId(publicId) {
    return this.subjectProvider
      ._getById(publicId)
      .take(1)
      .toPromise()
      .then(res => {
        const response = <IResponseAPI>(<any>res);
        if (response.htmlCode == 200) {
          return this.setSubjects(response.value);
        }
        throw new Error(response.description);
      })
      .catch(e => swal(e.message, "error"));
  }

  /**
   * Obtiene el director por el id del school
   */
  getDirectorBySchoolId(schoolId) {
    const id = schoolId || this.school.school_id;
    return this.directorProvider
      ._getByIdSchool(id)
      .take(1)
      .toPromise()
      .then(res => {
        const response = <IResponseAPI>(<any>res);
        if (response.htmlCode == 200) {
          return this.setDirector(response.value[0]);
        }
        throw new Error(response.description);
      })
      .catch(e => swal(e.message, "error"));
  }

  /**
   * Setter de la propiedad director
   *
   * @param director
   */
  setDirector(director: any) {
    this.profileDirector = {
      nombredirectorcentro: director.director_name,
      ID: director.user_id,
      image: "perfil"
    };
  }

  /**
   * Valida si es tutor y tiene asignaturas
   */
  get isTutor() {
    return this.tipodeusuario == "tutor";
  }

  /**
   * Valida si es docente y tiene asignaturas
   */
  get isTeacher() {
    return this.subjects && this.tipodeusuario == "docente";
  }

  /**
   * Retorna el nombre de la escuela
   */
  get schoolName() {
    return this._paramSchool.school_name;
  }

  /**
   * Navega a Boletines / NewsLetter
   */
  goToNewLetter() {
    this.navCtrl.push(NewslettersPage);
  }

  goToChildStudent(student) {
    const school = this._paramSchool;
    // this.navCtrl.push(DatosEstudiantePage, { student, school });
  }

  /**
   * Va al detalle de la materia seleccionada
   *
   * @param subject
   */
  goToSubjectDetails(subject: ISubject) {
    this.navCtrl.push(SubjectDetailsDocentePage, {
      subject,
      school: this._paramSchool,
      paramSubject: subject.response
    });
  }
}

interface ISchoolDetails {
  apartment: string;
  block: string;
  document_id: string;
  id_city: number;
  id_neighborhood: number;
  id_province: number;
  id_zone: number;
  location: string;
  logo: string;
  name: string;
  school_code: string;
  school_id: 3;
  street: string;
}

interface ISchoolOptionsDetails {
  title: string;
  description: string;
  component: string;
  image: string;
  icon: string;
  type: string;
  buttontext: string;
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
  response?: any;
}
