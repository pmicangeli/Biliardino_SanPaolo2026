import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ActivePage = 'squadre' | 'partite' | 'classifica' | 'home';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private activePageSubject = new BehaviorSubject<ActivePage>('home');
  activePage$ = this.activePageSubject.asObservable();

  setActivePage(page: ActivePage): void {
    this.activePageSubject.next(page);
  }

  getActivePage(): ActivePage {
    return this.activePageSubject.getValue();
  }
}