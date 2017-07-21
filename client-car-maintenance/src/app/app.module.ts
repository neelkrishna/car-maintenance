import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpModule, Http } from '@angular/http';

import { CarsListPage } from '../pages/cars-list/cars-list';
import { CarCreateOrEditPage } from '../pages/car-create-or-edit/car-create-or-edit';
import { CarDetailPage } from '../pages/car-detail/car-detail';

import { OilChangesListPage } from '../pages/oil-changes-list/oil-changes-list';
import { OilChangeCreateOrEditPage } from '../pages/oil-change-create-or-edit/oil-change-create-or-edit';
import { OilChangeDetailPage } from '../pages/oil-change-detail/oil-change-detail';

import { TireRotationsListPage } from '../pages/tire-rotations-list/tire-rotations-list';
import { TireRotationCreateOrEditPage } from '../pages/tire-rotation-create-or-edit/tire-rotation-create-or-edit';
import { TireRotationDetailPage } from '../pages/tire-rotation-detail/tire-rotation-detail';

import { InspectionsListPage } from '../pages/inspections-list/inspections-list';
import { InspectionCreateOrEditPage } from '../pages/inspection-create-or-edit/inspection-create-or-edit';
import { InspectionDetailPage } from '../pages/inspection-detail/inspection-detail';

import { OtherEntriesListPage } from '../pages/other-entries-list/other-entries-list';
import { OtherEntryCreateOrEditPage } from '../pages/other-entry-create-or-edit/other-entry-create-or-edit';
import { OtherEntryDetailPage } from '../pages/other-entry-detail/other-entry-detail';

import { CarService } from '../services/car.service';
import { OilChangeService } from '../services/oil-change.service';
import { TireRotationService } from '../services/tire-rotation.service';
import { InspectionService } from '../services/inspection.service';
import { OtherEntryService } from '../services/other-entry.service';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,

    CarsListPage,
    CarCreateOrEditPage,
    CarDetailPage,

    OilChangesListPage,
    OilChangeCreateOrEditPage,
    OilChangeDetailPage,

    TireRotationsListPage,
    TireRotationCreateOrEditPage,
    TireRotationDetailPage,

    InspectionsListPage,
    InspectionCreateOrEditPage,
    InspectionDetailPage,

    OtherEntriesListPage,
    OtherEntryCreateOrEditPage,
    OtherEntryDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    CarsListPage,
    CarCreateOrEditPage,
    CarDetailPage,

    OilChangesListPage,
    OilChangeCreateOrEditPage,
    OilChangeDetailPage,

    TireRotationsListPage,
    TireRotationCreateOrEditPage,
    TireRotationDetailPage,

    InspectionsListPage,
    InspectionCreateOrEditPage,
    InspectionDetailPage,

    OtherEntriesListPage,
    OtherEntryCreateOrEditPage,
    OtherEntryDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CarService,
    OilChangeService,
    ToastService,
    TireRotationService,
    OtherEntryService,
    InspectionService,
    ApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
