import { Injectable } from "@nestjs/common";
import { CardsService } from "src/cards/cards.service";
import { Card } from "src/cards/schemas/card.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Column } from "./schemas/column.schema";
import { Model } from "mongoose";
import { CreateColumnDto } from "./dto/create-column.dto";

@Injectable()
export class ColumnsService {
  constructor(
    private readonly cardsService: CardsService,
    @InjectModel(Column.name) private columnModel: Model<Column>,
  ) {}

  async getAll(): Promise<Column[]> {
    return await this.columnModel.find().exec();
  }

  async getById(id: string): Promise<Column> {
    return this.columnModel.findById(id).exec();
  }

  async addColumn(column: CreateColumnDto): Promise<Column> {
    const newColumn = new this.columnModel(column);
    return await newColumn.save();
  }

  async deleteById(id: string): Promise<number> {
    return this.columnModel
      .remove({ _id: id })
      .exec()
      .then(res => res.ok);
  }

  async updateById(id: string, newColumn: CreateColumnDto) {
    return this.columnModel.updateOne({ _id: id }, { $set: newColumn });
  }

  async getCardsForColumn(columnId: string): Promise<Card[]> {
    return this.cardsService.getColumnCards(columnId);
  }
}
