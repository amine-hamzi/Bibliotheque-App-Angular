import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClientsComponent } from './clients/clients.component';
import {HttpClientModule} from "@angular/common/http";
import { LivresComponent } from './livres/livres.component';
import { PostClientComponent } from './post-client/post-client.component';
import { PostLivreComponent } from './post-livre/post-livre.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PutLivreComponent } from './put-livre/put-livre.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PutClientComponent } from './put-client/put-client.component';
import { PretsComponent } from './prets/prets.component';
import { PostPretComponent } from './post-pret/post-pret.component';
import { PutPretComponent } from './put-pret/put-pret.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { SendMailComponent } from './send-mail/send-mail.component';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import { CategoriesComponent } from './categories/categories.component';
import { PutCategorieComponent } from './put-categorie/put-categorie.component';
import { PostCategorieComponent } from './post-categorie/post-categorie.component';
import {ToastModule} from "primeng/toast";
import { ReservationsComponent } from './reservations/reservations.component';
import { PutReservationComponent } from './put-reservation/put-reservation.component';
import { PostReservationComponent } from './post-reservation/post-reservation.component';




@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    LivresComponent,
    PostClientComponent,
    PostLivreComponent,
    PutLivreComponent,
    PutClientComponent,
    PretsComponent,
    PostPretComponent,
    PutPretComponent,
    TestComponent,
    HomeComponent,
    LoginComponent,
    SendMailComponent,
    CategoriesComponent,
    PutCategorieComponent,
    PostCategorieComponent,
    ReservationsComponent,
    PutReservationComponent,
    PostReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DialogsModule,
    BrowserAnimationsModule,
    ScrollViewModule,
    ButtonModule,
    DialogModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
