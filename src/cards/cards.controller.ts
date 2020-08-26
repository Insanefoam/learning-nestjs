import { Controller, Get, Param, Post, Delete, Put } from "@nestjs/common";
import Card from "./interfaces/card.interface";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";

@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get("")
  getAll(): Card[] {
    return this.cardsService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string): Card {
    return this.cardsService.getById(id);
  }

  @Post()
  addCard(@Param() card: CreateCardDto): Card[] {
    return this.cardsService.addCard(card);
  }

  @Delete(":id")
  deleteById(@Param("id") id: string): Card[] {
    return this.cardsService.deleteById(id);
  }

  @Put()
  updateById(@Param() card: CreateCardDto): Card[] {
    return this.cardsService.updateById(card);
  }
}
