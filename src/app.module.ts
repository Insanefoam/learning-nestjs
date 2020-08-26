import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ColumnModule } from "./columns/columns.module";
import { CardsController } from './cards/cards.controller';

@Module({
  imports: [ColumnModule],
  controllers: [AppController, CardsController],
  providers: [AppService],
})
export class AppModule {}
