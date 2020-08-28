import { Injectable, HttpException } from "@nestjs/common";
import { Column } from "./interfaces/column.interface";
import { CardsService } from "src/cards/cards.service";
import Card from "src/cards/interfaces/card.interface";

@Injectable()
export class ColumnsService {
  constructor(private readonly cardsService: CardsService) {}

  private columns: Column[] = [
    { id: "0", title: "Todo" },
    { id: "1", title: "In Progress" },
    { id: "2", title: "Done" },
  ];

  getAll(): Column[] {
    return this.columns;
  }

  getById(id: string): Column {
    return this.columns.find(column => column.id === id);
  }

  addColumn(column: Column): Column[] {
    if (this.columns.find(el => el.id === column.id)) {
      throw new HttpException("Column with that ID already exists", 402);
    } else {
      return (this.columns = [...this.columns, column]);
    }
  }

  deleteById(id: string): Column[] {
    return (this.columns = this.columns.filter(column => column.id !== id));
  }

  updateById(id: string, newColumn: Column) {
    return (this.columns = this.columns.map(column =>
      column.id === id ? { ...column, ...newColumn } : column,
    ));
  }

  getCardsForColumn(id: string): Card[] {
    return this.cardsService.getAll().filter(card => card.columnId === id);
  }
}
