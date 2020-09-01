import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Comment } from "./schemas/comment.schema";
import { CreateCommentDTO } from "./dto/create-comment-dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentsModel: Model<Comment>,
  ) {}

  async getAll(): Promise<Comment[]> {
    return this.commentsModel.find({}).exec();
  }

  async getById(id: string): Promise<Comment> {
    return this.commentsModel.findById(id).exec();
  }

  async addNew(comment: CreateCommentDTO): Promise<Comment> {
    const newComment = new this.commentsModel(comment);
    newComment.created = new Date();
    return newComment.save();
  }

  async updateById(id: string, comment: CreateCommentDTO): Promise<number> {
    return this.commentsModel.updateOne({ _id: id }, comment);
  }

  async deleteById(id: string) {
    return this.commentsModel.deleteOne({ _id: id }).exec();
  }
}
