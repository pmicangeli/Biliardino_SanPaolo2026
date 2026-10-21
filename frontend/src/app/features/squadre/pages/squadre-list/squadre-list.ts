import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquadreService } from '../../squadre';
import { Squadra } from '../../../../core/models/squadra.model';
import { Giocatore } from '../../../../core/models/giocatore.model';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { BackgroundService } from '../../../../core/services/background.service';

@Component({
  selector: 'app-squadre-list',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './squadre-list.html',
  styleUrl: './squadre-list.css',
})
export class SquadreList implements OnInit {
  squadre: Squadra[] = [];
  loading = true;
  error = '';

  // Stato per il pannello dei giocatori
  selectedSquadra: Squadra | null = null;
  giocatori: Giocatore[] = [];
  loadingGiocatori = false;

  constructor(
    private squadreService: SquadreService,
    private cdr: ChangeDetectorRef,
    private backgroundService: BackgroundService
  ) {}

  ngOnInit(): void {
    this.backgroundService.setActivePage('squadre');
    this.loadSquadre();
  }

  loadSquadre(): void {
    this.loading = true;

    this.squadreService.getSquadre().subscribe({
      next: (data) => {
        this.squadre = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Si è verificato un errore nel caricamento delle squadre.';
        this.loading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.cdr.detectChanges();
      }
    });
  }

  openGiocatori(squadra: Squadra): void {
    this.selectedSquadra = squadra;
    this.giocatori = [];
    this.loadingGiocatori = true;

    this.squadreService.getGiocatoriBySquadra(squadra.nome).subscribe({
      next: (data) => {
        this.giocatori = data;
        this.loadingGiocatori = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore caricamento giocatori', err);
        this.loadingGiocatori = false;
        this.cdr.detectChanges();
      }
    });
  }

  closeGiocatori(): void {
    this.selectedSquadra = null;
    this.giocatori = [];
  }
}
