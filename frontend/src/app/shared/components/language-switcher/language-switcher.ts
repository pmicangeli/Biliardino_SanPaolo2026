import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="switcher-wrapper">
      <button class="lang-button" (click)="toggleDropdown()">
        <img [src]="currentFlag" class="flag-icon" alt="flag">
        <span class="lang-text">{{ currentLangName }}</span>
        <span class="arrow" [class.open]="isOpen">▼</span>
      </button>

      <div class="dropdown-menu" *ngIf="isOpen">
        <div class="lang-option" (click)="selectLanguage('it')">
          <img src="https://flagcdn.com/w20/it.png" class="flag-icon" alt="Italy">
          <span>Italiano</span>
        </div>
        <div class="lang-option" (click)="selectLanguage('en')">
          <img src="https://flagcdn.com/w20/us.png" class="flag-icon" alt="USA">
          <span>English</span>
        </div>
        <div class="lang-option" (click)="selectLanguage('es')">
          <img src="https://flagcdn.com/w20/es.png" class="flag-icon" alt="Spain">
          <span>Español</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .switcher-wrapper {
      position: relative;
      display: inline-block;
      font-family: 'Inter', sans-serif;
    }
    .lang-button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 12px;
      border-radius: 6px;
      background-color: white;
      color: #2c3e50;
      border: 2px solid #3498db;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.2s ease;
      outline: none;
    }
    .lang-button:hover {
      background-color: #f8f9fa;
      border-color: #2980b9;
    }
    .flag-icon {
      width: 20px;
      height: auto;
      display: block;
      border-radius: 2px;
    }
    .arrow {
      font-size: 0.6rem;
      transition: transform 0.3s ease;
      margin-left: 5px;
      color: #7f8c8d;
    }
    .arrow.open {
      transform: rotate(180deg);
    }
    .dropdown-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      border: 1px solid #eee;
      z-index: 1000;
      min-width: 150px;
      overflow: hidden;
      animation: fadeIn 0.2s ease-out;
    }
    .lang-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 15px;
      cursor: pointer;
      transition: background 0.2s ease;
      color: #2c3e50;
      font-size: 0.9rem;
    }
    .lang-option:hover {
      background-color: #f0f7ff;
      color: #3498db;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LanguageSwitcherComponent {
  isOpen = false;
  currentLang = 'it';
  currentLangName = 'Italiano';
  currentFlag = 'https://flagcdn.com/w20/it.png';

  private langMap: any = {
    it: { name: 'Italiano', flag: 'https://flagcdn.com/w20/it.png' },
    en: { name: 'English', flag: 'https://flagcdn.com/w20/us.png' },
    es: { name: 'Español', flag: 'https://flagcdn.com/w20/es.png' }
  };

  constructor(private translationService: TranslationService) {
    this.currentLang = this.translationService.getLanguage();
    this.updateDisplay();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: 'it' | 'en' | 'es') {
    this.translationService.setLanguage(lang);
    this.currentLang = lang;
    this.updateDisplay();
    this.isOpen = false;
  }

  private updateDisplay() {
    const data = this.langMap[this.currentLang];
    if (data) {
      this.currentLangName = data.name;
      this.currentFlag = data.flag;
    }
  }
}
