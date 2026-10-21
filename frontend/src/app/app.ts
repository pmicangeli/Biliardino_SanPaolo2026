import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './shared/components/navigation/navigation';
import { CommonModule } from '@angular/common';
import { BackgroundService } from './core/services/background.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, CommonModule],
  template: `
    <div class="app-wrapper">
      <div class="bg-layer" [class.active]="activePage() === 'squadre'" style="background-image: url('/assets/immagini/home/sfondo.jpg');"></div>
      <div class="bg-layer" [class.active]="activePage() === 'partite'" style="background-image: url('/assets/immagini/home/sfondo.jpg'); filter: hue-rotate(45deg);"></div>
      <div class="bg-layer" [class.active]="activePage() === 'classifica'" style="background-image: url('/assets///immagini/home/sfondo.jpg'); filter: hue-rotate(90deg);"></div>
      <div class="global-overlay"></div>
      <div class="main-content">
        <app-navigation></app-navigation>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .app-wrapper {
      position: relative;
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
    }
    .bg-layer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      transition: opacity 0.8s ease-in-out;
      opacity: 0;
      z-index: -2;
    }
    .bg-layer.active {
      opacity: 1;
    }
    .global-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
      z-index: -1;
      pointer-events: none;
    }
    .main-content {
      position: relative;
      z-//index: 1;
    }
  `]
})
export class App {
  protected readonly title = signal('frontend');
  activePage = signal('home');

  constructor(private backgroundService: BackgroundService) {
    this.backgroundService.activePage$.subscribe(page => {
      this.activePage.set(page);
    });
  }
}