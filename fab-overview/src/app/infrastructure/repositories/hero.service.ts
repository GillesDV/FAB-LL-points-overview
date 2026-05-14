import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { cards } from '@flesh-and-blood/cards';
import { Format, Type } from '@flesh-and-blood/types';
import heroLivingLegendPoints from '../../../../public/data/heroLivingLegendPoints.json';
import { Hero } from '../../domain/models/hero.model';
import { ReleaseDateHelper } from '../../shared/helpers/release-date.helper';

interface HeroLivingLegendPointsDto {
  name: string;
  livingLegendPoints: number;
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly livingLegendPointsByHeroName = new Map(
    (heroLivingLegendPoints as readonly HeroLivingLegendPointsDto[])
      .map((hero) => [hero.name, hero.livingLegendPoints] as const),
  );

  getAll(): readonly Hero[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }

    const allHeroes: Hero[] = [];

    cards.forEach((card) => {
      if (card.types.includes(Type.Hero) && !card.young &&
        card.legalFormats.includes(Format.ClassicConstructed)) {

        allHeroes.push({
          cardIdentifier: card.cardIdentifier,
          name: card.name,
          livingLegendPoints: this.livingLegendPointsByHeroName.get(card.name) ?? 0,
          releaseDate: ReleaseDateHelper.getReleaseDate(card.sets),
        });
      }
    });

    return allHeroes;
  }
}
