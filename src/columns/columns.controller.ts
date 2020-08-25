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
} from "@nestjs/common";
import { Request } from "express";
import { CreateColumnDto } from "./dto/create-column.dto";
import { ColumnsService } from "./columns.service";
import { Column } from "./interfaces/column.interface";

@Controller("columns")
export class ColumnsController {
  constructor(private readonly columnsServices: ColumnsService) {}

  @Get("/google")
  @Redirect("https://www.google.com/")
  redirectToGoogle(): string {
    return "Redirected";
  }

  @Get("")
  getAll(): Column[] {
    return this.columnsServices.getAll();
  }

  @Header("my-header", "oh-my-header")
  @Get(":id")
  getById(@Req() request: Request, @Param("id") id: string): Column {
    return this.columnsServices.getById(id);
  }

  @HttpCode(202)
  @Post("")
  addColumn(@Body() createColumnDto: CreateColumnDto): Column[] {
    return this.columnsServices.addColumn(createColumnDto);
  }

  @Delete(":id")
  deleteById(@Param("id") id: string): Column[] {
    return this.columnsServices.deleteById(id);
  }

  @Put(":id")
  updateById(
    @Param("id") id: string,
    @Body() updateColumnDto: CreateColumnDto,
  ): string {
    return `Update column #${id} to title ${updateColumnDto.title}`;
  }
}
