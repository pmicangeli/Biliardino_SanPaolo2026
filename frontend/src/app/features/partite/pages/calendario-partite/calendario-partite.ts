import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Squadra } from '../../../../core/models/squadra.model';
import { TranslationService } from '../../../../core/services/translation.service';
import { TournamentService, PartitaCompleta } from '../../../../core/services/tournament.service';
import { BackgroundService } from '../../../../core/services/background.service';

@Component({
  selector: 'app-calendario-partite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendario-partite.html',
  styleUrl: './calendario-partite.css',
})
export class CalendarioPartite implements OnInit {
  @ViewChild('firstFutureMatch') firstFutureMatch!: ElementRef;

  partite: PartitaCompleta[] = [];
  squadre: Squadra[] = [];

  filterSquadraId: number | null = null;

  constructor(
    private translationService: TranslationService,
    private tournamentService: TournamentService,
    private cdr: ChangeDetectorRef,
    private backgroundService: BackgroundService
  ) {}

  ngOnInit(): void {
    this.backgroundService.setActivePage('partite');
    this.loadData();
  }

  loadData(): void {
    this.tournamentService.getSquadre().subscribe({
      next: (squadre) => {
        this.squadre = squadre;
        this.loadMatches();
      },
      error: (err) => console.error('Errore caricamento squadre', err)
    });
  }

  loadMatches(): void {
    this.tournamentService.getCalendario().subscribe({
      next: (partite) => {
        this.partite = partite;
        // Ordinamento più robusto per data e orario
        this.partite.sort((a, b) => {
          if (a.data !== b.data) return a.data.localeCompare(b.data);
          return a.orario.localeCompare(b.orario);
        });

        this.cdr.detectChanges();
        setTimeout(() => this.scrollToFirstFutureMatch(), 100);
      },
      error: (err) => console.error('Errore caricamento partite', err)
    });
  }

  scrollToFirstFutureMatch(): void {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    // 1. Cerca la prima partita futura non giocata
    const firstFuture = this.partite.find(p => p.data >= todayStr && !p.giocata);

    if (firstFuture) {
      const element = document.getElementById(`match-${firstFuture.id}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (this.partite.length > 0) {
      // 2. Se non ci sono partite future, scrolla verso l'ultima partita della lista
      const lastMatch = this.partite[this.partite.length - 1];
      const element = document.getElementById(`match-${lastMatch.id}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  get filteredPartite() {
    if (this.filterSquadraId === null) {
      return this.partite;
    }
    return this.partite.filter(p =>
      p.squadraCasa.id === this.filterSquadraId ||
      p.squadraOspite.id === this.filterSquadraId
    );
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
