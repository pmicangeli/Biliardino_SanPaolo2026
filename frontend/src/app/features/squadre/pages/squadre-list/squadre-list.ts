import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquadreService } from '../../squadre';
import { Squadra } from '../../../../core/models/squadra.model';

@Component({
  selector: 'app-squadre-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './squadre-list.html',
  styleUrl: './squadre-list.css',
})
export class SquadreList implements OnInit {
  squadre: Squadra[] = [];
  loading = true;
  error = '';

  constructor(
    private squadreService: SquadreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
}
