import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificaService } from '../../classifica';
import { Squadra } from '../../../../core/models/squadra.model';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { BackgroundService } from '../../../../core/services/background.service';

@Component({
  selector: 'app-classifica-list',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './classifica-list.html',
  styleUrl: './classifica-list.css',
})
export class ClassificaList implements OnInit {
  squadre: any[] = [];
  loading = true;
  error = '';

  constructor(
    private classificaService: ClassificaService,
    private cdr: ChangeDetectorRef,
    private backgroundService: BackgroundService
  ) {}

  ngOnInit(): void {
    this.backgroundService.setActivePage('classifica');
    this.loadClassifica();
  }

  loadClassifica(): void {
    this.loading = true;
    this.classificaService.getClassifica().subscribe({
      next: (data) => {
        this.squadre = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Si è verificato un errore nel caricamento della classifica.';
        this.loading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.cdr.detectChanges();
      }
    });
  }
}
