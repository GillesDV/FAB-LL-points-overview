import { Component, Input } from '@angular/core';

import { Hero } from '../../domain/models/hero.model';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrl: './hero-table.component.css',
})
export class HeroTableComponent {
  @Input() heroes: readonly Hero[] | null = [];

  protected getInitials(hero: Hero): string {
    return hero.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  }

  protected getLivingLegendPointsPerEvent(basePoints: number, releaseDate: Date): number {
    let multiplier = this.getMultiplier(releaseDate);

    return basePoints * multiplier;
  }

  private getMultiplier(date: Date): number {
    const now = new Date();

    const yearsDifference =
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    if (yearsDifference < 1) {
      return 0.5;
    }

    if (yearsDifference < 2) {
      return 1.0;
    }

    return 1.5;
  }

  getRemainingEventsToComplete(livingLegendPoints: number, basePoints: number, releaseDate: Date) {
    const pointsPerEvent = this.getLivingLegendPointsPerEvent(basePoints, releaseDate);

    //TODO do I want decimals or not? idk
    const remainingEvents = Math.ceil((1000 - livingLegendPoints) / pointsPerEvent); //.toFixed(2); 

    return remainingEvents;
  }

}
