import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  UseFilters,
  UseInterceptors,
} from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { HttpFilter } from "src/filters/http/http.filter";
import { ParseDtoPipe } from "src/pipes/parse-card-dto/parse-dto.pipe";
import { CardSchema } from "src/schemas/joi/CardSchema";
import { TokenInterceptor } from "src/interceptors/token/token.interceptor";
import { Card } from "./schemas/card.schema";

@Controller("cards")
@UseInterceptors(TokenInterceptor)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get("/")
  getAll(): Promise<Card[]> {
    return this.cardsService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string): Promise<Card> {
    return this.cardsService.getById(id);
  }

  @Post()
  @UseFilters(HttpFilter)
  addCard(
    @Body(new ParseDtoPipe(CardSchema)) card: CreateCardDto,
  ): Promise<Card> {
    return this.cardsService.addCard(card);
  }

  @Delete(":id")
  deleteById(@Param("id") id: string): Promise<number> {
    return this.cardsService.deleteById(id);
  }

  @Put()
  updateById(@Param() card: CreateCardDto): Promise<Card[]> {
    return this.cardsService.updateById(card);
  }
}
