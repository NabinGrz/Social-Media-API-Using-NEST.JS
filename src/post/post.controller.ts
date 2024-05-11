import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

interface CommentRequestBody {
  comment: string;
}

@Controller('post')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async allPosts() {
    return this.postService.allPosts();
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() formData: CreatePostDTO,
  ) {
    const uploadResults = await this.postService.createPost(
      { buffer: file.buffer },
      formData,
    );
    return uploadResults;
  }

  @Put('like/:postId/:userId')
  async likePost(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return await this.postService.like(userId, postId);
  }

  @Put('comment/:postId/:userId')
  async commentPost(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
    @Body() body: CommentRequestBody,
  ) {
    return await this.postService.comment(userId, postId, body.comment);
  }

  @Post('save/:postId/:userId')
  async save(@Param('postId') postId: string, @Param('userId') userId: string) {
    return await this.postService.savePost(postId, userId);
  }
}
