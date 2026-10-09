import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Risultato } from '../../core/models/risultato.model';

@Injectable({
  providedIn: 'root',
})
export class RisultatiService {
  private apiUrl = `${environment.apiUrl}/risultati`;

  constructor(private http: HttpClient) {}

  getRisultati(): Observable<Risultato[]> {
    return this.http.get<Risultato[]>(this.apiUrl);
  }

  getRisultato(idPartita: number, idSquadra: number): Observable<Risultato> {
    // I risultati hanno una chiave composta, l'endpoint potrebbe variare.
    // Assumendo un endpoint che accetti parametri di query per la ricerca.
    return this.http.get<Risultato>(`${this.apiUrl}`, {
      params: { id_partita: idPartita.toString(), id_squadra: idSquadra.toString() }
    });
  }

  createRisultato(risultato: Partial<Risultato>): Observable<Risultato> {
    return this.http.post<Risultato>(this.apiUrl, risultato);
  }

  updateRisultato(risultato: Partial<Risultato>): Observable<Risultato> {
    // Poiché la chiave è composta, l'update potrebbe essere un PUT su un endpoint specifico o un POST.
    return this.http.put<Risultato>(this.apiUrl, risultato);
  }

  deleteRisultato(idPartita: number, idSquadra: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}`, {
      params: { id_partita: idPartita.toString(), id_squadra: idSquadra.toString() }
    });
  }
}
