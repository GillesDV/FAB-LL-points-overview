import { Release } from '@flesh-and-blood/types';

export class ReleaseDateHelper {
  private static readonly releaseDates = new Map<Release, string>([
    [Release.WelcomeToRathe, '2019-10-11'],
    [Release.ArcaneRising, '2020-03-27'],
    [Release.CrucibleOfWar, '2020-08-28'],
    [Release.Monarch, '2021-05-07'],
    [Release.TalesOfAria, '2021-09-24'],
    [Release.Everfest, '2022-02-04'],
    [Release.Uprising, '2022-06-24'],
    [Release.Dynasty, '2022-11-11'],
    [Release.Outsiders, '2023-03-24'],
    [Release.DuskTillDawn, '2023-07-14'],
    [Release.BrightLights, '2023-10-06'],
    [Release.HeavyHitters, '2024-02-02'],
    [Release.PartTheMistveil, '2024-05-31'],
    [Release.Rosetta, '2024-09-20'],
    [Release.TheHunted, '2025-01-31'],
    [Release.HighSeas, '2025-06-06'],
    [Release.SuperSlam, '2026-02-13'],
    [Release.OmensOfTheThirdAge, '2026-05-05'],
    [Release.ArmoryDeckOriginsJarl, '2024-11-29'],
    [Release.ArmoryDeckIra, '2025-06-11'],
    [Release.ArmoryDeckOriginsHala, '2026-04-17'],
    [Release.MasteryPackGuardian, '2026-08-07'],
  ]);

  private constructor() { }

  static getReleaseDate(sets: readonly Release[]): Date {
    const releaseDate = sets
      .map((release) => this.releaseDates.get(release))
      .filter((date): date is string => date !== undefined)
      .sort()[0];

    return releaseDate === undefined
      ? new Date()
      : new Date(releaseDate);
  }
}
