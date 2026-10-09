import { Partita } from './partita.model';
import { Squadra } from './squadra.model';

export interface Risultato {
  id_partita: number;
  id_squadra: number;
  casa: boolean;
  giocata: boolean;
  gol: number;
  vittoria: boolean;
  partita?: Partita;
  squadra?: Squadra;
}
