import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from '../../domain/models/hero.model';

describe('HeroService', () => {
  let service: HeroService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(HeroService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should fetch all heroes from the static data source', () => {
    const expectedHeroes: readonly Hero[] = [
      {
        cardIdentifier: 'hero-001',
        name: 'Dummy Hero One',
        livingLegendPoints: 450,
        releaseDate: new Date('2026-01-01'),
      },
      {
        cardIdentifier: 'hero-002',
        name: 'Dummy Hero Two',
        livingLegendPoints: 320,
        releaseDate: new Date('2026-02-01'),
      },
    ];

    service.getAll().subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
    });

    const request = httpTesting.expectOne('/data/allHeroes.json');

    expect(request.request.method).toBe('GET');

    request.flush([
      {
        cardIdentifier: 'hero-001',
        name: 'Dummy Hero One',
        livingLegendPoints: 450,
        releaseDate: '2026-01-01',
      },
      {
        cardIdentifier: 'hero-002',
        name: 'Dummy Hero Two',
        livingLegendPoints: 320,
        releaseDate: '2026-02-01',
      },
    ]);
  });
});
