import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Risultato } from '../../core/models/risultato.model';

@Injectable({
  providedIn: 'root',
})
export class ClassificaService {
  private apiPartite = `${environment.apiUrl}/partite`;
  private apiRisultati = `${environment.apiUrl}/risultati`;

  constructor(private http: HttpClient) {}

  getClassifica(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPartite}/classifica`);
  }

  getRisultati(): Observable<Risultato[]> {
    return this.http.get<Risultato[]>(this.apiRisultati);
  }

  getRisultato(idPartita: number, idSquadra: number): Observable<Risultato> {
    return this.http.get<Risultato>(this.apiRisultati, {
      params: { id_partita: idPartita.toString(), id_squadra: idSquadra.toString() }
    });
  }

  createRisultato(risultato: Partial<Risultato>): Observable<Risultato> {
    return this.http.post<Risultato>(this.apiRisultati, risultato);
  }

  updateRisultato(risultato: Partial<Risultato>): Observable<Risultato> {
    return this.http.put<Risultato>(this.apiRisultati, risultato);
  }

  deleteRisultato(idPartita: number, idSquadra: number): Observable<void> {
    return this.http.delete<void>(this.apiRisultati, {
      params: { id_partita: idPartita.toString(), id_squadra: idSquadra.toString() }
    });
  }
}
