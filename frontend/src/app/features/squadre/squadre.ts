import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Squadra } from '../../core/models/squadra.model';

@Injectable({
  providedIn: 'root',
})
export class SquadreService {
  private apiUrl = `${environment.apiUrl}/squadre`;

  constructor(private http: HttpClient) {}

  // Recupera tutte le squadre
  getSquadre(): Observable<Squadra[]> {
    return this.http.get<Squadra[]>(this.apiUrl);
  }

  // Recupera una singola squadra per ID
  getSquadra(id: number): Observable<Squadra> {
    return this.http.get<Squadra>(`${this.apiUrl}/${id}`);
  }

  // Crea una nuova squadra
  createSquadra(squadra: Partial<Squadra>): Observable<Squadra> {
    return this.http.post<Squadra>(this.apiUrl, squadra);
  }

  // Aggiorna una squadra esistente
  updateSquadra(id: number, squadra: Partial<Squadra>): Observable<Squadra> {
    return this.http.put<Squadra>(`${this.apiUrl}/${id}`, squadra);
  }

  // Elimina una squadra
  deleteSquadra(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
