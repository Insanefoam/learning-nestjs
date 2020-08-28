import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ColumnModule } from "./columns/columns.module";
import { CardsModule } from "./cards/cards.module";
import { LoggerMiddleware } from "./middlewares/logger/logger.middleware";

@Module({
  imports: [ColumnModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("");
  }
}
