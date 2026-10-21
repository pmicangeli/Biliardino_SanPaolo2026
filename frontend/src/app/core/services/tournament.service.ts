import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partita } from '../models/partita.model';
import { Squadra } from '../models/squadra.model';
import { Risultato } from '../models/risultato.model';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface PartitaCompleta {
  id: number;
  data: string;
  orario: string;
  squadraCasa: Squadra;
  squadraOspite: Squadra;
  risultatoCasa?: number;
  risultatoOspite?: number;
  giocata: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSquadre(): Observable<Squadra[]> {
    return this.http.get<Squadra[]>(`${this.apiUrl}/squadre`);
  }

  getCalendario(): Observable<PartitaCompleta[]> {
    return this.http.get<PartitaCompleta[]>(`${this.apiUrl}/partite`);
  }

  // Metodo per ottenere i risultati di tutte the partite
  getRisultati(): Observable<Risultato[]> {
    return this.http.get<Risultato[]>(`${this.apiUrl}/risultati`);
  }
}
