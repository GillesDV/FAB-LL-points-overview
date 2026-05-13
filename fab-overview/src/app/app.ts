import { Component } from '@angular/core';

import { HeroOverviewComponent } from './presentation/hero-overview/hero-overview.component';

@Component({
  selector: 'app-root',
  imports: [HeroOverviewComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
