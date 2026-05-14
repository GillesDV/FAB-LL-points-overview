import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { cards } from '@flesh-and-blood/cards';
import { Format, Type } from '@flesh-and-blood/types';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private readonly heroLivingLegendPointsUrl = '/data/heroLivingLegendPoints.json';

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<readonly Hero[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([] as readonly Hero[]);
    }

    return this.http
      .get<readonly HeroLivingLegendPointsDto[]>(this.heroLivingLegendPointsUrl)
      .pipe(map((heroLivingLegendPoints) => this.mergeWithCardData(heroLivingLegendPoints)));
  }

  private mergeWithCardData(heroLivingLegendPoints: readonly HeroLivingLegendPointsDto[]): readonly Hero[] {
    const livingLegendPointsByHeroName = new Map(
      heroLivingLegendPoints.map((hero) => [hero.name, hero.livingLegendPoints] as const),
    );
    const allHeroes: Hero[] = [];

    cards.forEach((card) => {
      if (card.types.includes(Type.Hero) && !card.young &&
        card.legalFormats.includes(Format.ClassicConstructed)) {

        allHeroes.push({
          cardIdentifier: card.cardIdentifier,
          name: card.name,
          livingLegendPoints: livingLegendPointsByHeroName.get(card.name) ?? 0,
          releaseDate: ReleaseDateHelper.getReleaseDate(card.sets),
        });
      }
    });

    return allHeroes;
  }
}
