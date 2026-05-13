export interface Hero {
  cardIdentifier: string;
  name: string;
  livingLegendPoints: number;
  releaseDate: Date;
  //TODO add property for link-to-avatar-image? Can probably use cardIdentifier for that though
}
