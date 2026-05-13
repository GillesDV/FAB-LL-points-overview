import { Component, Input } from '@angular/core';

import { Hero } from '../../domain/models/hero.model';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrl: './hero-table.component.css',
})
export class HeroTableComponent {
  @Input() heroes: readonly Hero[] | null = [];

  protected readonly extraColumns = [
    'Week 1',
    'Week 2',
    'Week 3',
    'Week 4',
    'Week 5',
    'Week 6',
    'Week 7',
  ];

  protected getInitials(hero: Hero): string {
    return hero.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }
}
