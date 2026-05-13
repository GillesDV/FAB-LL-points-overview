import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private readonly allHeroesUrl = '/data/allHeroes.json';

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<readonly Hero[]> {
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
