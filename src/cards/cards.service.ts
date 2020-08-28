import { Injectable, HttpException } from "@nestjs/common";
import Card from "./interfaces/card.interface";

@Injectable()
export class CardsService {
  private cards: Card[] = [
    { id: "0", title: "Card 0 title", columnId: "0", commentsIds: [] },
    { id: "1", title: "Card 1 title", columnId: "1", commentsIds: [] },
    { id: "2", title: "Card 2 title", columnId: "1", commentsIds: [] },
  ];

  getAll(): Card[] {
    return this.cards;
  }

  getById(id: string): Card {
    return this.cards.find(card => card.id === id);
  }

  deleteById(id: string): Card[] {
    return (this.cards = this.cards.filter(card => card.id !== id));
  }

  updateById(newCard: Card): Card[] {
    return (this.cards = this.cards.map(card =>
      card.id === newCard.id ? { ...card, ...newCard } : card,
    ));
  }

  addCard(card: Card): Card[] {
    if (this.cards.find(el => el.id === card.id)) {
      throw new HttpException("Card with that ID already exists", 402);
    } else {
      return (this.cards = [...this.cards, card]);
    }
  }
}
