import { Module } from "@nestjs/common";
import { ColumnsController } from "./columns.controller";
import { ColumnsService } from "./columns.service";
import { CardsModule } from "src/cards/cards.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Column, ColumnSchema } from "./schemas/column.schema";

@Module({
  imports: [
    CardsModule,
    MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }]),
  ],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnModule {}
