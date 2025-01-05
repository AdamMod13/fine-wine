export class Wine {
  public id: number;
  public variety: string;
  public wineColor: string;
  public winery: string;
  public country: string;
  public rating: number;
  public description: string;
  public price: string;
  public region: string;
  public name: string;

  constructor(id: number, variety: string, wineColor: string, winery: string, country: string, rating: number, description: string, price: string, region: string, name: string) {
    this.id = id;
    this.variety = variety;
    this.wineColor = wineColor;
    this.winery = winery;
    this.country = country;
    this.rating = rating;
    this.description = description;
    this.price = price;
    this.region = region;
    this.name = name;
  }
}
