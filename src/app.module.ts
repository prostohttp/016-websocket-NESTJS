import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import "dotenv/config";
import { BooksModule } from "./books/books.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtStrategy } from "./auth/jwt.strategy";
import { BookCommentsModule } from "./comments/book.comments.module";
import { AppGateway } from "./gateway/app.gateway";

@Module({
  imports: [
    BooksModule,
    AuthModule,
    UserModule,
    BookCommentsModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, AppGateway],
})
export class AppModule {}
