import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SquadreList } from './features/squadre/pages/squadre-list/squadre-list';
import { CalendarioPartite } from './features/partite/pages/calendario-partite/calendario-partite';
import { ClassificaList } from './features/classifica/pages/classifica-list/classifica-list';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'squadre', component: SquadreList },
  { path: 'partite', component: CalendarioPartite },
  { path: 'classifica', component: ClassificaList },
  { path: '**', redirectTo: '' },
];
