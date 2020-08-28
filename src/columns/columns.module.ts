import { Module } from "@nestjs/common";
import { ColumnsController } from "./columns.controller";
import { ColumnsService } from "./columns.service";
import { CardsService } from "src/cards/cards.service";

@Module({
  imports: [],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnModule {}
