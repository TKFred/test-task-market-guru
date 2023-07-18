import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidateInputPipe());

    // TODO надо сделать декораторы для Сваггера, не успел :(
    const config = new DocumentBuilder()
        .setTitle('Test task Market Guru')
        .setDescription('Market Guru API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();