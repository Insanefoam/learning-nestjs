import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { Comment } from "./schemas/comment.schema";
import { CommentsService } from "./comments.service";
import { ParseDtoPipe } from "src/pipes/parse-dto/parse-dto.pipe";
import { CreateCommentDTO } from "./dto/create-comment-dto";
import { CommentSchema } from "src/schemas/joi/CommentSchema";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAll(): Promise<Comment[]> {
    return this.commentsService.getAll();
  }

  @Get(":id")
  getById(@Param("id") id: string): Promise<Comment> {
    return this.commentsService.getById(id);
  }

  @Post()
  addNew(
    @Body(new ParseDtoPipe(CommentSchema)) comment: CreateCommentDTO,
  ): Promise<Comment> {
    return this.commentsService.addNew(comment);
  }

  @Put(":id")
  updateById(
    @Param("id") id: string,
    @Body(new ParseDtoPipe(CommentSchema)) comment: CreateCommentDTO,
  ): Promise<number> {
    return this.commentsService.updateById(id, comment);
  }

  @Delete(":id")
  deleteById(@Param("id") id: string) {
    return this.commentsService.deleteById(id);
  }
}
