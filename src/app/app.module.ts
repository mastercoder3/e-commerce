import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { AuthService } from './auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { BillingComponent } from './billing/billing.component';
import { DetailesComponent } from './detailes/detailes.component';
import { MakePaymentComponent } from './payments/make-payment/make-payment.component';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    BillingComponent,
    DetailesComponent,
    MakePaymentComponent

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      
      {path:'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path:'dashboard', component:DashboardComponent, children:[
        {path:'', redirectTo:'home', pathMatch: 'full'},
        {path: 'payments', component: MakePaymentComponent},
        {path:'home', component:HomeComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'billing', component: BillingComponent},
        {path: 'details', component: DetailesComponent},
        {path: 'details/:id', component: DetailesComponent}
      ], canActivate: [AuthGaurdService]}
    ])
  ],
  providers: [AuthGaurdService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
