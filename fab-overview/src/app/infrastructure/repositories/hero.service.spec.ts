import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { HeroService } from './hero.service';

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

  it('should return classic constructed adult heroes from the card data', () => {
    service.getAll().subscribe((heroes) => {
      const dorinthea = heroes.find((hero) => hero.name === 'Dorinthea Ironsong');

      expect(heroes.length).toBeGreaterThan(0);
      expect(heroes[0].cardIdentifier).toBeTruthy();
      expect(heroes[0].name).toBeTruthy();
      expect(heroes[0].releaseDate).toBeInstanceOf(Date);
      expect(dorinthea?.livingLegendPoints).toBe(743);
    });

    const request = httpTesting.expectOne('/data/heroLivingLegendPoints.json');

    expect(request.request.method).toBe('GET');

    request.flush([
      {
        name: 'Dorinthea Ironsong',
        livingLegendPoints: 743,
      },
    ]);
  });
});
