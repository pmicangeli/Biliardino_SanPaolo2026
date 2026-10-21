import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Squadra } from '../../../../core/models/squadra.model';
import { TranslationService } from '../../../../core/services/translation.service';
import { TournamentService, PartitaCompleta } from '../../../../core/services/tournament.service';

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

  filterCasaId: number | null = null;
  filterOspiteId: number | null = null;

  constructor(
    private translationService: TranslationService,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
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
        // Ordinamento per data e orario
        this.partite.sort((a, b) => (a.data + a.orario).localeCompare(b.data + b.orario));

        setTimeout(() => this.scrollToFirstFutureMatch(), 100);
      },
      error: (err) => console.error('Errore caricamento partite', err)
    });
  }

  scrollToFirstFutureMatch(): void {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    const firstFuture = this.partite.find(p => p.data >= todayStr && !p.giocata);
    if (firstFuture) {
      const element = document.getElementById(`match-${firstFuture.id}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  get filteredPartite() {
    return this.partite.filter(p => {
      const matchCasa = this.filterCasaId === null || p.squadraCasa.id === this.filterCasaId;
      const matchOspite = this.filterOspiteId === null || p.squadraOspite.id === this.filterOspiteId;
      return matchCasa && matchOspite;
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
