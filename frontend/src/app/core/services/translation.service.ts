import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'it' | 'en' | 'es';

const TRANSLATIONS: any = {
  it: {
    NAV: {
      squadre: 'Squadre',
      giocatori: 'Giocatori',
      partite: 'Partite',
      risultati: 'Risultati'
    },
    HOME: {
      title: 'Benvenuti al Torneo di Biliardino San Paolo 2026',
      subtitle: 'Tutta la gestione del torneo in un unico posto: iscrizioni, calendari e risultati.',
      btn_squadre: 'Visualizza Squadre',
      btn_partite: 'Calendario Partite'
    },
    SQUADRE: {
      title: 'Elenco Squadre',
      loading: 'Caricamento in corso...',
      error: 'Si è verificato un errore nel caricamento delle squadre.',
      active: 'Attiva',
      inactive: 'Non attiva'
    }
  },
  en: {
    NAV: {
      squadre: 'Teams',
      giocatori: 'Players',
      partite: 'Matches',
      risultati: 'Results'
    },
    HOME: {
      title: 'Welcome to the San Paolo Foosball Tournament 2026',
      subtitle: 'All tournament management in one place: registrations, schedules, and results.',
      btn_squadre: 'View Teams',
      btn_partite: 'Match Schedule'
    },
    SQUADRE: {
      title: 'Teams List',
      loading: 'Loading...',
      error: 'An error occurred while loading the teams.',
      active: 'Active',
      inactive: 'Inactive'
    }
  },
  es: {
    NAV: {
      squadre: 'Equipos',
      giocatori: 'Jugadores',
      partite: 'Partidos',
      risultati: 'Resultados'
    },
    HOME: {
      title: 'Bienvenidos al Torneo de Futbolín San Paolo 2026',
      subtitle: 'Toda la gestión del torneo en un solo lugar: inscripciones, calendarios y resultados.',
      btn_squadre: 'Ver Equipos',
      btn_partite: 'Calendario de Partidos'
    },
    SQUADRE: {
      title: 'Lista de Equipos',
      loading: 'Cargando...',
      error: 'Ocurrió un error al cargar los equipos.',
      active: 'Activo',
      inactive: 'Inactivo'
    }
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang$ = new BehaviorSubject<Language>('it');

  setLanguage(lang: Language) {
    this.currentLang$.next(lang);
  }

  getLanguage(): Language {
    return this.currentLang$.getValue();
  }

  translate(key: string): string {
    const lang = this.getLanguage();
    const keys = key.split('.');
    let value: any = TRANSLATIONS[lang];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  }
}
