import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/http.exception.filter";
import { LoggerInterceptor } from "./logger/logger.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // abortOnError: false,
  });
  const config = new DocumentBuilder()
    .setTitle("Netology Nest websockets")
    .setDescription("Netology 16 homework")
    .setVersion("3.2")
    .addTag("ndse")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  await app.listen(process.env.PORT);
}
bootstrap();
