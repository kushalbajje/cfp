import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerModule,
} from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModules } from './AppMaterialModules';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BookingsComponent } from './bookings/bookings.component';
import { ManagefleetComponent } from './manage-fleet/managefleet.component';
import { PaymentsComponent } from './payments/payments.component';
import { ManagebusinessComponent } from './manage-business/managebusiness.component';
import { ManagesubvendorsComponent } from './manage-subvendors/managesubvendors.component';
import { LoginComponent } from './login/login.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { UnassignedComponent } from './bookings/unassigned/unassigned.component';
import { AssignedComponent } from './bookings/assigned/assigned.component';
import { OngoingComponent } from './bookings/ongoing/ongoing.component';
import { CancelledComponent } from './bookings/cancelled/cancelled.component';
import { CompletedComponent } from './bookings/completed/completed.component';
import { ForgotpasswordComponent } from './forgot-password/forgotpassword.component';
import { AddbookingComponent } from './bookings/add-booking/addbooking.component';
import { BulkuploadbookingComponent, BulkBookingPreview } from './bookings/bulk-upload-booking/bulkuploadbooking.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ManagevehiclesComponent } from './manage-fleet/owned-fleet/manage-vehicles/managevehicles.component';
import { ManagedriversComponent } from './manage-fleet/owned-fleet/manage-drivers/managedrivers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendaceComponent, ChunkPipe } from './manage-fleet/owned-fleet/manage-drivers/attendace/attendace.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { BusinesspaymentsComponent } from './payments/business-payments/businesspayments.component';
import { SubvendorpaymentComponent } from './payments/subvendor-payment/subvendorpayment.component';
import { DriverpaymentComponent } from './payments/driver-payment/driverpayment.component';
import { OwnedfleetComponent } from './manage-fleet/owned-fleet/ownedfleet.component';
import { LeasedfleetComponent } from './manage-fleet/leased-fleet/leasedfleet.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { HttpClientModule } from '@angular/common/http';
import { HttpServices } from '../app/services/apiservice';
import { AddvehicleComponent } from './manage-fleet/owned-fleet/manage-vehicles/add-vehicle/addvehicle.component';
import { AdddriverComponent } from './manage-fleet/owned-fleet/manage-drivers/add-driver/adddriver.component';
import { AddleaseddriverComponent } from './manage-fleet/leased-fleet/add-leased-driver/addleaseddriver.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import {  NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
// import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';


/** Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LY_THEME_GLOBAL_VARIABLES,
  LyHammerGestureConfig,
} from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { color } from '@alyle/ui/color';
import { CommonModule } from '@angular/common';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { LySliderModule } from '@alyle/ui/slider';
import { CropperComponentComponent } from './cropper-component/cropper-component.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddBusinessComponent } from './manage-business/add-business/add-business.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddSubvendorComponent } from './manage-subvendors/add-subvendor/add-subvendor.component';
import { GetLocationComponent } from './get-location/get-location.component';




export class GlobalVariables {
  testVal = color(0x00bcd4);
  Quepal = {
    default: `linear-gradient(135deg,#11998e 0%,#38ef7d 100%)`,
    contrast: color(0xffffff),
    shadow: color(0x11998e),
  };
  SublimeLight = {
    default: `linear-gradient(135deg,#FC5C7D 0%,#6A82FB 100%)`,
    contrast: color(0xffffff),
    shadow: color(0xb36fbc),
  };
  Amber = {
    default: color(0xffc107),
    contrast: color(0, 0, 0, 0.87),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    BookingsComponent,
    ManagefleetComponent,
    PaymentsComponent,
    ManagebusinessComponent,
    ManagesubvendorsComponent,
    LoginComponent,
    UnassignedComponent,
    AssignedComponent,
    OngoingComponent,
    CancelledComponent,
    CompletedComponent,
    ForgotpasswordComponent,
    AddbookingComponent,
    BulkuploadbookingComponent,
    ManagevehiclesComponent,
    ManagedriversComponent,
    AttendaceComponent,
    ChunkPipe,
    BusinesspaymentsComponent,
    SubvendorpaymentComponent,
    DriverpaymentComponent,
    OwnedfleetComponent,
    LeasedfleetComponent,
    AddvehicleComponent,
    AdddriverComponent,
    AddleaseddriverComponent,
    CropperComponentComponent,
    BottomSheetComponent,
    AddBusinessComponent,
    ResetPasswordComponent,
    AddSubvendorComponent,
    GetLocationComponent,
    BulkBookingPreview
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    IvyCarouselModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartsModule,
    ImageCropperModule,
    HttpClientModule,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    HammerModule,
    CommonModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [
    HttpServices,
    [LyTheme2],
    [StyleRenderer],
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    {
      provide: LY_THEME,
      useClass: MinimaLight,
      multi: true,
    },
    {
      provide: LY_THEME,
      useClass: MinimaDark,
      multi: true,
    },
    {
      provide: LY_THEME_GLOBAL_VARIABLES,
      useClass: GlobalVariables,
    }, // global variables
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
    MatBottomSheet
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
