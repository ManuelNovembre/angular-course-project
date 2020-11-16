export class Recipe {
  public name : string;
  public description : string;
  public imagePath : string;
  constructor(public _name : string, public _description : string, public _imagePath : string) {
    this.name = _name;
    this.description = _description;
    this.imagePath = _imagePath;
  }
}
