import { Module } from "@nestjs/common";
import { ColumnsController } from "./columns.controller";
import { ColumnsService } from "./columns.service";
import { CardsModule } from "src/cards/cards.module";

@Module({
  imports: [CardsModule],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnModule {}
