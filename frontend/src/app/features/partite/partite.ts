import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Partita } from '../../core/models/partita.model';

@Injectable({
  providedIn: 'root',
})
export class PartiteService {
  private apiUrl = `${environment.apiUrl}/partite`;

  constructor(private http: HttpClient) {}

  getPartite(data?: string): Observable<Partita[]> {
    const params: any = {};
    if (data) params['data'] = data;
    return this.http.get<Partita[]>(this.apiUrl, { params });
  }

  getPartita(id: number): Observable<Partita> {
    return this.http.get<Partita>(`${this.apiUrl}/${id}`);
  }

  createPartita(partita: Partial<Partita>): Observable<Partita> {
    return this.http.post<Partita>(this.apiUrl, partita);
  }

  updatePartita(id: number, partita: Partial<Partita>): Observable<Partita> {
    return this.http.put<Partita>(`${this.apiUrl}/${id}`, partita);
  }

  deletePartita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
