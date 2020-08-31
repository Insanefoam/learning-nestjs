import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Card } from "./schemas/card.schema";
import { Model } from "mongoose";
import { CreateCardDto } from "./dto/create-card.dto";

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<Card>) {}

  getAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  getById(id: string): Promise<Card> {
    return this.cardModel.findById(id).exec();
  }

  deleteById(id: string): Promise<number> {
    return this.cardModel
      .deleteOne({ _id: id })
      .exec()
      .then(res => res.ok);
  }

  updateById(newCard: CreateCardDto) {
    return this.cardModel.updateOne({ title: newCard.title }, newCard).exec();
  }

  addCard(card: CreateCardDto): Promise<Card> {
    const newCard = new this.cardModel(card);
    return newCard.save();
  }
}
