import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Camera } from "@ionic-native/camera";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { IonicStorageModule, Storage } from "@ionic/storage";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { Items } from "../mocks/providers/items";
import {
  Settings,
  UserProvider,
  LoggedUserProvider,
  Api,
  MemoProvider,
  DeviceStorageServices
} from "../providers/providers";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { HomeLoggedPage } from "../pages/home-logged/home-logged";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { SignupPage } from "../pages/signup/signup";
import { EducativeCenterDetailsPage } from "../pages/educative-center-details/educative-center-details";
import { SubjectDetailsDocentePage } from "../pages/subject-details-docente/subject-details-docente";
import { NewslettersDirectorPage } from "../pages/newsletters-director/newsletters-director";
import { SchoolProvider } from "../providers/school/school";
import { DirectorProvider } from "../providers/director/director";
import { SubjectProvider } from "../providers/subject/subject";

import { LongPressModule } from "ionic-long-press";
import { TutorProvider } from "../providers/tutor/tutor";

import { PhotoLibrary } from "@ionic-native/photo-library";
import { FileChooser } from "@ionic-native/file-chooser";
import { FileTransfer } from "@ionic-native/file-transfer";
import { ModalPhoto } from "../pages/edit-profile/photo-modal";
import { CDVPhotoLibraryPipe } from "../pipes/cdvphotolibrary.pipe";
import { TeacherProvider } from "../providers/teacher/teacher";
import { TaskProvider } from "../providers/task/task";
import { ActivitiesProvider } from "../providers/activities/activities";
import { StudentProvider } from "../providers/student/student";
import { CalificationProvider } from "../providers/calification/calification";
import { AssistanceProvider } from "../providers/assistance/assistance";
import { NewslettersPage } from "../pages/newsletters/newsletters";
import { NewslettersDetailsPage } from "../pages/newsletters-details/newsletters-details";

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: "Ionitron J. Framework",
    option3: "3",
    option4: "Hello"
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HomeLoggedPage,
    EditProfilePage,
    SignupPage,
    EducativeCenterDetailsPage,
    SubjectDetailsDocentePage,
    ModalPhoto,
    CDVPhotoLibraryPipe,
    NewslettersDirectorPage,
    NewslettersPage,
    NewslettersDetailsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    HomeLoggedPage,
    EditProfilePage,
    SignupPage,
    EducativeCenterDetailsPage,
    SubjectDetailsDocentePage,
    ModalPhoto,
    NewslettersDirectorPage,
    NewslettersPage,
    NewslettersDetailsPage
  ],
  providers: [
    Api,
    Items,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    LoggedUserProvider,
    MemoProvider,
    AssistanceProvider,
    SchoolProvider,
    DeviceStorageServices,
    DirectorProvider,
    SubjectProvider,
    StudentProvider,
    CalificationProvider,
    TutorProvider,
    TaskProvider,
    ActivitiesProvider,
    TeacherProvider,
    PhotoLibrary,
    Camera,
    FileChooser,
    FileTransfer
    /*GradeProvider,
    CourseProvider,
    ImageProvider,
    ScheduleProvider,
    MemoProvider,
    CityProvider,
    ProvinceProvider,
    NeighborhoodProvider,
    ZoneProvider*/
  ]
})
export class AppModule {}
