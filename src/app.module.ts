import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { BooksModule } from "./books/books.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtStrategy } from "./auth/jwt.strategy";
import { BookCommentsModule } from "./comments/book.comments.module";
import { AppGateway } from "./gateway/app.gateway";
import mongoose from "mongoose";

mongoose.set("toJSON", {
  versionKey: false,
});

@Module({
  imports: [
    BooksModule,
    AuthModule,
    UserModule,
    BookCommentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, AppGateway],
})
export class AppModule {}
