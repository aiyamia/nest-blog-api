import { Post as PostSchema } from './post.model';
import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from "Kindagoose";
import { ModelType } from '@typegoose/typegoose/lib/types';

class CreatePostDto {//Data trans obj数据传输对象
  @ApiProperty({description: '帖子标题', example:'帖子标题1'})
  @IsNotEmpty({message:'请填写标题'})
  title:string
  @ApiProperty({description: '帖子内容', example:'帖子内容1'})
  content: string
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {

  constructor(
    @InjectModel(PostSchema) private readonly postModel:ModelType<PostSchema>
  ){}


  @Get()
  @ApiOperation({summary:"显示博客列表"})
  async index(){
    return await this.postModel.find()
  }

  @Post()
  @ApiOperation({summary:"创建帖子"})
  async create(@Body()  createPostDto:CreatePostDto){//接口上的类型约束
    await this.postModel.create(createPostDto)//与框架无关
    return {
      success:true
    }
  }

  @Get(':id')
  @ApiOperation({summary:"博客详情"})
  async detail(@Param('id') id:string){
    return await this.postModel.findById(id)
  }

  @Put(':id')
  @ApiOperation({summary:"编辑帖子"})
  async update(@Param('id') id:string,@Body() updatePostDto:CreatePostDto){
    await this.postModel.findByIdAndUpdate(id, updatePostDto)
    return {
      success:true
    }
  }

  @Delete(':id')
  @ApiOperation({summary:"删除帖子"})
  async remove(@Param('id') id:string){//尽量别用关键字delete
    await this.postModel.findByIdAndRemove(id)
    return {
      success:true
    }
  }
}
