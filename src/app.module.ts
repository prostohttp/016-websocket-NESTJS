import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import "dotenv/config";
import { BooksModule } from "./books/books.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtStrategy } from "./auth/jwt.strategy";

@Module({
  imports: [
    BooksModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
