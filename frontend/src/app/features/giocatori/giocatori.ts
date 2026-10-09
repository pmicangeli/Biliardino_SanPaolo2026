import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Giocatore } from '../../core/models/giocatore.model';

@Injectable({
  providedIn: 'root',
})
export class GiocatoriService {
  private apiUrl = `${environment.apiUrl}/giocatori`;

  constructor(private http: HttpClient) {}

  getGiocatori(squadraNome?: string, nazionalita?: string): Observable<Giocatore[]> {
    let url = this.apiUrl;
    const params: any = {};

    if (squadraNome) params['squadra_nome'] = squadraNome;
    if (nazionalita) params['nazionalita'] = nazionalita;

    // Nota: In un'app reale useremmo HttpParams, ma per semplicità qui costruiamo la query string
    // o lasciamo che HttpClient gestisca l'oggetto params.
    return this.http.get<Giocatore[]>(this.apiUrl, { params });
  }

  getGiocatore(id: number): Observable<Giocatore> {
    return this.http.get<Giocatore>(`${this.apiUrl}/${id}`);
  }

  createGiocatore(giocatore: Partial<Giocatore>): Observable<Giocatore> {
    return this.http.post<Giocatore>(this.apiUrl, giocatore);
  }

  updateGiocatore(id: number, giocatore: Partial<Giocatore>): Observable<Giocatore> {
    return this.http.put<Giocatore>(`${this.apiUrl}/${id}`, giocatore);
  }

  deleteGiocatore(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
