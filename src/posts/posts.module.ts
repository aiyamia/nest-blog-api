import { Post } from './post.model';
import { KindagooseModule } from 'kindagoose';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';

@Module({
  imports:[
    KindagooseModule.forFeature([Post])
  ],
  controllers: [PostsController]
})
export class PostsModule {}
