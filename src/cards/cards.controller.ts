import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import Card from "./interfaces/card.interface";
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { HttpfilterFilter } from "src/filters/httpfilter/httpfilter.filter";
import { ParseDtoPipe } from "src/pipes/parse-card-dto/parse-dto.pipe";
import { CardSchema } from "src/schemas/joi/CardSchema";
import { AuthGuard } from "src/guards/auth/auth.guard";

@Controller("cards")
@UseGuards(AuthGuard)
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
  @UseFilters(HttpfilterFilter)
  addCard(@Body(new ParseDtoPipe(CardSchema)) card: CreateCardDto): Card[] {
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
