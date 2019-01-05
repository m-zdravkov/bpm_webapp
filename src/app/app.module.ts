import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService, AuthServiceInstance } from './auth/services/AuthService';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { RegisterFormComponent } from './register/register-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login/LoginFormComponent';
import { NavbarComponent } from './navbar/navbar.component';
import { FlexModule } from '@angular/flex-layout';
import { LocalStorageService } from './utils/LocalStorageService';
import { ToastrModule } from 'ngx-toastr';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ResourceServiceInstance, ResourceService } from './resource.service';
import { LobbyServiceInstance } from './lobby/services/LobbyService';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    LoginFormComponent,
    NavbarComponent,
    CreateLobbyComponent,
    LobbyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FlexModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right-custom',
    }),
  ],
  providers: [
    AuthServiceInstance,
    AuthGuardService,
    LocalStorageService,
    ResourceServiceInstance,
    LobbyServiceInstance
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
