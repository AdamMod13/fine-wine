import {WineColorEnum} from "./wine-color-enum";

export const WineColorRecord: Record<number, string> = {
  1: WineColorEnum.RED,
  2: WineColorEnum.WHITE,
  3: WineColorEnum.SPARKLING,
  4: WineColorEnum.ROSE,
  7: WineColorEnum.DESSERT,
  24: WineColorEnum.FORTIFIED,
};

export const WineColorToCodeRecord: Record<string, string> = {
  [WineColorEnum.RED.toLowerCase()]: "1",
  [WineColorEnum.WHITE.toLowerCase()]: "2",
  [WineColorEnum.SPARKLING.toLowerCase()]: "3",
  [WineColorEnum.ROSE.toLowerCase()]: "4",
  [WineColorEnum.DESSERT.toLowerCase()]: "7",
  [WineColorEnum.FORTIFIED.toLowerCase()]: "24",
};

export function mapColorsToCodes(wineColor: string): string {
  return WineColorToCodeRecord[wineColor.toLowerCase()];
}

