import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Comment } from "./schemas/comment.schema";
import { CreateCommentDTO } from "./dto/create-comment-dto";
import { InjectModel } from "@nestjs/mongoose";
import { CardsService } from "src/cards/cards.service";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentsModel: Model<Comment>,
    private readonly cardsService: CardsService,
  ) {}

  async getAll(): Promise<Comment[]> {
    return await this.commentsModel.find({}).exec();
  }

  async getById(id: string): Promise<Comment> {
    return await this.commentsModel.findById(id).exec();
  }

  async addNew(comment: CreateCommentDTO): Promise<Comment> {
    const newComment = new this.commentsModel(comment);
    newComment.created = new Date();
    const record = await newComment.save();
    this.cardsService.addCommentForCard(record.cardId, record._id);
    return record;
  }

  async updateById(id: string, comment: CreateCommentDTO): Promise<number> {
    return await this.commentsModel.updateOne({ _id: id }, { $set: comment });
  }

  async deleteById(id: string) {
    const comment = await this.getById(id);
    this.cardsService.deleteCommentFromCard(comment.cardId, comment._id);
    return await this.commentsModel.deleteOne({ _id: id }).exec();
  }
}
