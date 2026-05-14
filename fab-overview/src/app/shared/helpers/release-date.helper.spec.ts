import { Release } from '@flesh-and-blood/types';
import { ReleaseDateHelper } from './release-date.helper';

describe('ReleaseDateHelper', () => {
  it('returns the release date for a known release', () => {
    const releaseDate = ReleaseDateHelper.getReleaseDate([Release.WelcomeToRathe]);

    expect(releaseDate).toEqual(new Date('2019-10-11'));
  });

  it('returns the earliest release date when multiple releases are provided', () => {
    const releaseDate = ReleaseDateHelper.getReleaseDate([
      Release.OmensOfTheThirdAge,
      Release.ArmoryDeckOriginsJarl,
      Release.TheHunted,
    ]);

    expect(releaseDate).toEqual(new Date('2024-11-29'));
  });

  it('does not depend on the order of the provided releases', () => {
    const firstOrder = ReleaseDateHelper.getReleaseDate([
      Release.HighSeas,
      Release.PartTheMistveil,
    ]);
    const secondOrder = ReleaseDateHelper.getReleaseDate([
      Release.PartTheMistveil,
      Release.HighSeas,
    ]);

    expect(firstOrder).toEqual(new Date('2024-05-31'));
    expect(secondOrder).toEqual(new Date('2024-05-31'));
  });
});
