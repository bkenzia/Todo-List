import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo } from 'src/app/mocks/taches.mock';

@Component({
  selector: 'app-historique-page',
  templateUrl: './historique-page.component.html',
  styleUrls: ['./historique-page.component.css'],
})
export class HistoriquePageComponent {
  listTacheHistorique: ITodo[] = [];
  constructor(private router: Router) {}
  ngOnInit() {
    this.getValidateTaches();
  }
  getValidateTaches() {
    this.listTacheHistorique = [];
    // console.log('valeur number localstorage', localStorage.getItem('number'));
    let taches = localStorage.getItem('taches');
    if (taches) {
      const listTaches = JSON.parse(taches);

      listTaches.forEach((element: ITodo) => {
        if (element.doneDate != null) {
          this.listTacheHistorique.push(element);
        }
      });
      if (this.listTacheHistorique.length == 0) {
        this.router.navigate(['creation-tache']);
      }
    }
  }
  private createTaches() {
    const newTaches: [] = [];
    const stringifyTaches = JSON.stringify(newTaches);
    localStorage.setItem('taches', stringifyTaches);
  }
  private savetaches(listTaches: ITodo[]) {
    localStorage.setItem('taches', JSON.stringify(listTaches));
  }
  public getTaches(): ITodo[] {
    const listTaches = localStorage.getItem('taches');

    if (listTaches) {
      return JSON.parse(listTaches);
    } else {
      this.createTaches();
      return this.getTaches();
    }
  }
  jinvalideTache(tache: ITodo) {
    const taches = this.getTaches();
    taches.forEach((element) => {
      if (tache.id == element.id) {
        element.doneDate = null;
      }
    });
    this.savetaches(taches);
  }
}
