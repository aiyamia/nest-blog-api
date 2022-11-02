import { Module } from '@nestjs/common';
import { KindagooseModule } from 'kindagoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    KindagooseModule.forRoot('mongodb://127.0.0.1/nest-blog-api'),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
