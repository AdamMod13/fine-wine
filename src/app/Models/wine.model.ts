export class Wine {
  public id: number;
  public variety: string;
  public wineColor: string;
  public winery: string;
  public country: string;
  public points: number;
  public description: string;
  public price: string;
  public province: string;
  public wineName1: string;
  public region1: string;
  public region2: string;
  public wineName2: string;

  constructor(id: number, variety: string, wineColor: string, winery: string, country: string, points: number, description: string, price: string, province: string, wineName1: string, region1: string, region2: string, wineName2: string) {
    this.id = id;
    this.variety = variety;
    this.wineColor = wineColor;
    this.winery = winery;
    this.country = country;
    this.points = points;
    this.description = description;
    this.price = price;
    this.province = province;
    this.wineName1 = wineName1;
    this.region1 = region1;
    this.region2 = region2;
    this.wineName2 = wineName2;
  }
}
