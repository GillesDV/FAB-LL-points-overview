import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService],
    });

    service = TestBed.inject(HeroService);
  });

  it('should return classic constructed adult heroes from the card data', () => {
    const heroes = service.getAll();
    const dorinthea = heroes.find((hero) => hero.name === 'Dorinthea Ironsong');

    expect(heroes.length).toBeGreaterThan(0);
    expect(heroes[0].cardIdentifier).toBeTruthy();
    expect(heroes[0].name).toBeTruthy();
    expect(heroes[0].releaseDate).toBeInstanceOf(Date);
    expect(dorinthea?.livingLegendPoints).toBe(743);
  });
});
