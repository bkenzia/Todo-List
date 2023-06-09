import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HommePageComponent } from './pages/homme-page/homme-page.component';
import { AjouterLaTacheComponent } from './pages/ajouter-la-tache/ajouter-la-tache.component';
import { FormsModule } from '@angular/forms';
import { ListTachesComponent } from './pages/list-taches/list-taches.component';
import { HistoriquePageComponent } from './pages/historique-page/historique-page.component';
import { CreationTacheComponent } from './components/creation-tache/creation-tache.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HommePageComponent,
    AjouterLaTacheComponent,
    ListTachesComponent,
    HistoriquePageComponent,
    CreationTacheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
