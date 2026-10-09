import { Squadra } from './squadra.model';

export interface Giocatore {
  id: number;
  nome: string;
  cognome: string;
  nazionalita?: string;
  telefono?: string;
  telefono_confermato: boolean;
  squadra_id?: number;
  squadra?: Squadra;
}
