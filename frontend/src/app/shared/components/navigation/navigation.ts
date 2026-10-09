import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcherComponent],
  template: `
    <nav class="nav-container">
      <div class="logo">
        <a routerLink="/" class="brand">Biliardino San Paolo 2026</a>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/squadre" routerLinkActive="active">{{ 'NAV.squadre' | translate }}</a></li>
        <li><a routerLink="/giocatori" routerLinkActive="active">{{ 'NAV.giocatori' | translate }}</a></li>
        <li><a routerLink="/partite" routerLinkActive="active">{{ 'NAV.partite' | translate }}</a></li>
        <li><a routerLink="/risultati" routerLinkActive="active">{{ 'NAV.risultati' | translate }}</a></li>
        <li><app-language-switcher></app-language-switcher></li>
      </ul>
    </nav>
  `,
  styles: [`
    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5%;
      background-color: #2c3e50;
      color: white;
      height: 70px;
      box-sizing: border-box;
      width: 100%;
    }
    .logo .brand {
      font-size: 1.4rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      list-style: none;
      gap: 20px;
      margin: 0;
      padding: 0;
      align-items: center;
    }
    .nav-links a {
      color: #ecf0f1;
      text-decoration: none;
      font-size: 1rem;
      transition: color 0.3s;
    }
    .nav-links a:hover, .nav-links a.active {
      color: #3498db;
    }
    .nav-links a.active {
      border-bottom: 2px solid #3498db;
    }
    @media (max-width: 768px) {
      .nav-container {
        flex-direction: column;
        height: auto;
        padding: 1rem 0;
        gap: 15px;
      }
      .nav-links {
        gap: 15px;
        justify-content: center;
      }
      .nav-links a {
        font-size: 0.9rem;
      }
    }
  `]
})
export class NavigationComponent {}
