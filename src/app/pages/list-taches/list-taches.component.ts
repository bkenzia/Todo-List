import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITodo } from 'src/app/mocks/taches.mock';
import { LocaleStorageTachesService } from 'src/app/services/localeStorage-taches/locale-storage-taches.service';

@Component({
  selector: 'app-list-taches',
  templateUrl: './list-taches.component.html',
  styleUrls: ['./list-taches.component.css'],
})
export class ListTachesComponent {
  listTachesUrgent: ITodo[] = [];
  listTachesNoUrgent: ITodo[] = [];
  validateTaches: ITodo[] = [];

  constructor(
    private router: Router,
    private activatedRout: ActivatedRoute,
    private localeStorageTachesService: LocaleStorageTachesService
  ) {}
  ngOnInit() {
    this.activatedRout.params.subscribe((routeParams) => {
      this.getTaches();
    });
  }
  getTaches() {
    let taches = localStorage.getItem('taches');

    if (taches) {
      const listTaches = JSON.parse(taches);

      listTaches.forEach((element: ITodo) => {
        if (element.isUrgent == true && element.doneDate == null) {
          this.listTachesUrgent.push(element);
        } else if (element.doneDate == null) {
          this.listTachesNoUrgent.push(element);
        }
      });

      if (
        this.listTachesUrgent.length == 0 &&
        this.listTachesNoUrgent.length == 0
      ) {
        this.router.navigate(['']);
      }
    } else {
      this.router.navigate(['']);
    }
  }

  public getListTaches(): ITodo[] {
    const listTaches = localStorage.getItem('taches');

    if (listTaches) {
      return JSON.parse(listTaches);
    } else {
      this.localeStorageTachesService.createTaches();
      return this.getListTaches();
    }
  }

  validateTache(id: number) {
    let taches = localStorage.getItem('taches');
    if (taches) {
      const tacheFound = JSON.parse(taches).find(
        (tache: ITodo) => tache.id === id
      );

      tacheFound.doneDate = new Date().toLocaleDateString();
      console.log(tacheFound);
      this.validateTaches.push(tacheFound);
      const listTaches = this.getListTaches();
      listTaches.forEach((element) => {
        if (tacheFound?.id == element.id) {
          element.doneDate = tacheFound.doneDate;
        }
      });
      this.localeStorageTachesService.savetaches(listTaches);

      location.reload();
    }
  }
}
