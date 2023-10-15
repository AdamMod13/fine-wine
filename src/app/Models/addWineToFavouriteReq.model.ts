import {Wine} from "./wine.model";

export class AddWineToFavouriteReq {
  public userId: string;
  public wine: Wine;
}
