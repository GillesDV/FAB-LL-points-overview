import { Component, Input } from '@angular/core';

import { Hero } from '../../domain/models/hero.model';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrl: './hero-table.component.css',
})
export class HeroTableComponent {
  @Input() heroes: readonly Hero[] | null = [];

  protected get sortedHeroes(): readonly Hero[] {
    return [...(this.heroes ?? [])]
      .sort((first, second) => second.livingLegendPoints - first.livingLegendPoints);
  }

  protected getAvatarUrl(hero: Hero): string {
    return `data/avatars/${this.toAvatarFileName(hero.name)}.webp`;
  }

  private toAvatarFileName(name: string): string {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ð/g, 'd')
      .replace(/Ð/g, 'd')
      .toLowerCase()
      .replace(/[!/'’‘`]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
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
