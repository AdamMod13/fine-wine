import {Wine} from "./wine.model";

export class WinePage {
  public content: Wine[];
  public empty: boolean;
  public first: boolean;
  public last: boolean;
  public number: number;
  public numberOfElements: number;
  public size: number;
  public totalElements: number;
  public totalPages: number;

  constructor(content: Wine[], empty: boolean, first: boolean, last: boolean, number: number, numberOfElements: number, size: number, totalElements: number, totalPages: number) {
    this.content = content;
    this.empty = empty;
    this.first = first;
    this.last = last;
    this.number = number;
    this.numberOfElements = numberOfElements;
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
  }
}
