import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Card } from "./schemas/card.schema";
import { Model } from "mongoose";
import { CreateCardDto } from "./dto/create-card.dto";

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

  async getAll(): Promise<Card[]> {
    return await this.cardModel.find().exec();
  }

  async getById(id: string): Promise<Card> {
    return await this.cardModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<number> {
    return await this.cardModel
      .deleteOne({ _id: id })
      .exec()
      .then(res => res.ok);
  }

  async updateById(id: string, newCard: CreateCardDto) {
    return await this.cardModel.updateOne({ _id: id }, newCard).exec();
  }

  async addCard(card: CreateCardDto): Promise<Card> {
    const newCard = new this.cardModel(card);
    return await newCard.save();
  }

  async getColumnCards(id: string): Promise<Card[]> {
    return this.cardModel.find({ columnId: id }).exec();
  }

  async addCommentForCard(cardId: string, commentId: string) {
    return await this.cardModel.updateOne(
      { _id: cardId },
      { $push: { commentsIds: commentId } },
    );
  }

  async deleteCommentFromCard(cardId: string, commentId: string) {
    return await this.cardModel.updateOne(
      { _id: cardId },
      { $pull: { commentsIds: commentId } },
    );
  }
}
