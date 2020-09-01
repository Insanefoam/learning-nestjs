import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Redirect,
  Param,
  Body,
  Delete,
  Put,
  UseFilters,
} from "@nestjs/common";
import { Request } from "express";
import { CreateColumnDto } from "./dto/create-column.dto";
import { ColumnsService } from "./columns.service";
import { HttpFilter } from "src/filters/http/http.filter";
import { ParseDtoPipe } from "src/pipes/parse-dto/parse-dto.pipe";
import { ColumnSchema } from "src/schemas/joi/ColumnSchema";
import { Card } from "src/cards/schemas/card.schema";
import { Column } from "./schemas/column.schema";

@Controller("columns")
export class ColumnsController {
  constructor(private readonly columnsServices: ColumnsService) {}

  @Get("/google")
  @Redirect("https://www.google.com/")
  redirectToGoogle(): string {
    return "Redirected";
  }

  @Get("")
  getAll(): Promise<Column[]> {
    return this.columnsServices.getAll();
  }

  @Header("my-header", "oh-my-header")
  @Get(":id")
  getById(@Req() request: Request, @Param("id") id: string): Promise<Column> {
    return this.columnsServices.getById(id);
  }

  @HttpCode(202)
  @Post("")
  @UseFilters(HttpFilter)
  addColumn(
    @Body(new ParseDtoPipe(ColumnSchema)) createColumnDto: CreateColumnDto,
  ): Promise<Column> {
    return this.columnsServices.addColumn(createColumnDto);
  }

  @Delete(":id")
  deleteById(@Param("id") id: string): Promise<number> {
    return this.columnsServices.deleteById(id);
  }

  @Put(":id")
  updateById(
    @Param("id") id: string,
    @Body() updateColumnDto: CreateColumnDto,
  ) {
    return this.columnsServices.updateById(id, updateColumnDto);
  }

  @Get("/cards/:id")
  getCardsForColumn(@Param("id") id: string): Promise<Card[]> {
    return this.columnsServices.getCardsForColumn(id);
  }
}
