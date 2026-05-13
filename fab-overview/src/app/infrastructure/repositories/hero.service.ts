import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Hero } from '../../domain/models/hero.model';

interface HeroDto {
  cardIdentifier: string;
  name: string;
  livingLegendPoints: number;
  releaseDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly allHeroesUrl = '/data/allHeroes.json';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<readonly Hero[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }

    return this.http
      .get<readonly HeroDto[]>(this.allHeroesUrl)
      .pipe(map((heroes) => heroes.map((hero) => this.toHero(hero))));
  }

  private toHero(hero: HeroDto): Hero {
    return {
      ...hero,
      releaseDate: new Date(hero.releaseDate),
    };
  }
}
