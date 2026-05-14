import { Component, inject } from '@angular/core';

import { HeroService } from '../../infrastructure/repositories/hero.service';
import { HeroTableComponent } from '../hero-table/hero-table.component';

@Component({
  selector: 'app-hero-overview',
  imports: [HeroTableComponent],
  templateUrl: './hero-overview.component.html',
  styleUrl: './hero-overview.component.css',
})
export class HeroOverviewComponent {
  private readonly heroService = inject(HeroService);

  protected readonly heroes = this.heroService.getAll();
}
