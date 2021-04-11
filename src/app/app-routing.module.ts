import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddbookingComponent } from './bookings/add-booking/addbooking.component';
import { AddBusinessComponent } from './manage-business/add-business/add-business.component';
import { AdddriverComponent } from './manage-fleet/owned-fleet/manage-drivers/add-driver/adddriver.component';
import { AddleaseddriverComponent } from './manage-fleet/leased-fleet/add-leased-driver/addleaseddriver.component';
import { AddSubvendorComponent } from './manage-subvendors/add-subvendor/add-subvendor.component';
import { AddvehicleComponent } from './manage-fleet/owned-fleet/manage-vehicles/add-vehicle/addvehicle.component';
import { AssignedComponent } from './bookings/assigned/assigned.component';
import { AttendaceComponent } from './manage-fleet/owned-fleet/manage-drivers/attendace/attendace.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BulkuploadbookingComponent } from './bookings/bulk-upload-booking/bulkuploadbooking.component';
import { BusinesspaymentsComponent } from './payments/business-payments/businesspayments.component';
import { CancelledComponent } from './bookings/cancelled/cancelled.component';
import { CompletedComponent } from './bookings/completed/completed.component';
import { DriverpaymentComponent } from './payments/driver-payment/driverpayment.component';
import { ForgotpasswordComponent } from './forgot-password/forgotpassword.component';
import { LeasedfleetComponent } from './manage-fleet/leased-fleet/leasedfleet.component';
import { LoginComponent } from './login/login.component';
import { ManagebusinessComponent } from './manage-business/managebusiness.component';
import { ManagedriversComponent } from './manage-fleet/owned-fleet/manage-drivers/managedrivers.component';
import { ManagefleetComponent } from './manage-fleet/managefleet.component';
import { ManagesubvendorsComponent } from './manage-subvendors/managesubvendors.component';
import { ManagevehiclesComponent } from './manage-fleet/owned-fleet/manage-vehicles/managevehicles.component';
import { OngoingComponent } from './bookings/ongoing/ongoing.component';
import { OwnedfleetComponent } from './manage-fleet/owned-fleet/ownedfleet.component';
import { PaymentsComponent } from './payments/payments.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SubvendorpaymentComponent } from './payments/subvendor-payment/subvendorpayment.component';
import { UnassignedComponent } from './bookings/unassigned/unassigned.component';

const routes: Routes = [
  {
    path: 'sidenav',
    component: SideNavComponent,
    children: [
      {
        path: 'bookings',
        component: BookingsComponent,
        children: [
          { path: '', redirectTo: 'unassigned', pathMatch: 'full' },
          { path: 'unassigned', component: UnassignedComponent },
          { path: 'assigned', component: AssignedComponent },
          { path: 'ongoing', component: OngoingComponent },
          { path: 'cancelled', component: CancelledComponent },
          { path: 'completed', component: CompletedComponent },
          {
            path: 'addbooking',
            component: AddbookingComponent,
            outlet: 'addbooking'
          },
          {
            path: 'bulkuploadbooking',
            component: BulkuploadbookingComponent,
            outlet: 'addbooking'
          },
        ],
      },
      {
        path: 'managefleet',
        component: ManagefleetComponent,
        children: [
          {
            path: 'ownedfleet',
            component: OwnedfleetComponent,
            children: [
              {
                path: 'managevehicles',
                component: ManagevehiclesComponent,
                children: [
                  {
                    path: 'addvehicle',
                    component: AddvehicleComponent,
                  },
                ],
              },
              {
                path: 'managedrivers',
                component: ManagedriversComponent,
                children: [
                  {
                    path: 'adddriver',
                    component: AdddriverComponent,
                  },
                  {
                    path: 'attendance',
                    component: AttendaceComponent,
                  },
                ],
              },
            ],
          },
          {
            path: 'leasedfleet',
            component: LeasedfleetComponent,
            children: [
              {
                path: 'addleaseddriver',
                component: AddleaseddriverComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'payment',
        component: PaymentsComponent,
      },
      {
        path: 'managebusiness',
        component: ManagebusinessComponent,
        children: [
          {
            path: 'addbusiness',
            component: AddBusinessComponent,
          },
        ],
      },
      {
        path: 'managesubvendors',
        component: ManagesubvendorsComponent,
        children: [
          {
            path: 'addsubvendor',
            component: AddSubvendorComponent,
          },
        ],
      },

      {
        path: 'businesspayments',
        component: BusinesspaymentsComponent,
      },
      {
        path: 'subvendorpayment',
        component: SubvendorpaymentComponent,
      },
      {
        path: 'driverpayment',
        component: DriverpaymentComponent,
      },
    ],
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
