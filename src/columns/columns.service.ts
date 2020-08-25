import { Injectable } from "@nestjs/common";
import { Column } from "./interfaces/column.interface";

@Injectable()
export class ColumnsService {
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
    return (this.columns = [...this.columns, column]);
  }

  deleteById(id: string): Column[] {
    return (this.columns = this.columns.filter(column => column.id !== id));
  }
}
