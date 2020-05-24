import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './login.guard';
import { AuthService } from './auth.service';
import { UsersmanagementComponent } from './usersmanagement/usersmanagement.component';
import { StsmanagementComponent } from './stsmanagement/stsmanagement.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const mgtChildrenRoutes: Routes = [
  { path: 'users', component: UsersmanagementComponent },
  { path: 'students', component: StsmanagementComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' }
];

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'usersmanagement', component: UsersmanagementComponent },
  // { path: 'stsmanagement', component: StsmanagementComponent },
  {
    path: 'management',
    component: ManagementComponent,
    children: mgtChildrenRoutes,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    ManagementComponent,
    UsersmanagementComponent,
    StsmanagementComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [LoginGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
