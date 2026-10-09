import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <div class="home-container">
      <div class="overlay"></div>
      <div class="hero-section">
        <h1 class="title">{{ 'HOME.title' | translate }}</h1>
        <p class="subtitle">{{ 'HOME.subtitle' | translate }}</p>

        <div class="cta-group">
          <a routerLink="/squadre" class="btn-primary">{{ 'HOME.btn_squadre' | translate }}</a>
          <a routerLink="/partite" class="btn-secondary">{{ 'HOME.btn_partite' | translate }}</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 70px);
      text-align: center;
      font-family: 'Inter', sans-serif;
      padding: 20px;
      box-sizing: border-box;

      background-image: url('../../../assets/immagini/home/sfondo.jpg');
      background-size: cover;
      background-position: 25% center;
      background-repeat: no-repeat;
      background-attachment: scroll;
      position: relative;
      overflow: hidden;
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.7) 100%
      );
      z-index: 1;
    }
    .hero-section {
      width: 100%;
      max-width: 800px;
      position: relative;
      z-index: 2;
      color: white;
    }
    .title {
      font-size: clamp(2rem, 6vw, 3.5rem);
      color: white;
      margin-bottom: 1.5rem;
      line-height: 1.2;
      text-shadow: 0 4px 10px rgba(0,0,0,0.8);
    }
    .subtitle {
      font-size: clamp(1.1rem, 2.5vw, 1.4rem);
      color: #ecf0f1;
      margin-bottom: 2.5rem;
      text-shadow: 0 2px 5px rgba(0,0,0,0.8);
    }
    .cta-group {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-primary, .btn-secondary {
      padding: 1rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
      min-width: 200px;
    }
    .btn-primary {
      background-color: #3498db;
      color: white;
      border: none;
      box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
    }
    .btn-primary:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
    }
    .btn-secondary {
      background-color: rgba(255, 255, 255, 0.15);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
    }
    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }
    @media (max-width: 600px) {
      .home-container {
        background-image: url('../../../assets/immagini/home/sfondo_verticale.jpeg');
        background-position: center center;
      }
      .cta-group {
        flex-direction: column;
        align-items: center;
      }
      .btn-primary, .btn-secondary {
        width: 100%;
        max-width: 300px;
        text-align: center;
      }
    }
  `]
})
export class HomeComponent {}
