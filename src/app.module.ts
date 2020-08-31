import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ColumnModule } from "./columns/columns.module";
import { CardsModule } from "./cards/cards.module";
import { LoggerMiddleware } from "./middlewares/logger/logger.middleware";
import { AuthGuard } from "./guards/auth/auth.guard";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD } from "@nestjs/core";
import mongoURI from "./keys";

@Module({
  imports: [ColumnModule, CardsModule, MongooseModule.forRoot(mongoURI)],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("");
  }
}
