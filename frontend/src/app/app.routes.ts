import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SquadreList } from './features/squadre/pages/squadre-list/squadre-list';
import { GiocatoriList } from './features/giocatori/pages/giocatori-list/giocatori-list';
import { CalendarioPartite } from './features/partite/pages/calendario-partite/calendario-partite';
import { RisultatiList } from './features/risultati/pages/risultati-list/risultati-list';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'squadre', component: SquadreList },
  { path: 'giocatori', component: GiocatoriList },
  { path: 'partite', component: CalendarioPartite },
  { path: 'risultati', component: RisultatiList },
  { path: '**', redirectTo: '' },
];
