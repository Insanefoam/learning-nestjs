import { Module } from "@nestjs/common";
import { CardsController } from "./cards.controller";
import { CardsService } from "./cards.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Card, CardSchema } from "./schemas/card.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}
