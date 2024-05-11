import {
  BadGatewayException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { POST_MODEL, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/user/users.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreatePostDTO } from './dto/create-post.dto';
import {
  SAVED_POST_MODEL,
  SavedPostDocument,
} from 'src/saved/schema/saved.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(POST_MODEL) private readonly postModel: Model<PostDocument>,
    @InjectModel(SAVED_POST_MODEL)
    private readonly savedPostModel: Model<SavedPostDocument>,
    private readonly userService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async allPosts() {
    try {
      return await this.postModel.find();
    } catch (error) {
      throw new BadGatewayException();
    }
  }
  async createPost(file: { buffer: Buffer }, formData: CreatePostDTO) {
    try {
      const uploadPromise = await this.cloudinaryService.uploadFile(file);
      const owner = await this.userService.findOne(formData.userId);
      if (owner) {
        return await this.postModel.create({
          ...formData,
          owner: owner.toObject(),
          imageUrl: (await uploadPromise).secure_url,
        });
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      return error;
    }
  }

  async like(userId: string, id: string) {
    try {
      const post = await this.postModel.findById(id);
      const user = await this.userService.findOne(userId);
      post.likesCount++;
      post.likedBy.push(user);
      return await post.save();
    } catch (error) {
      throw new BadGatewayException();
    }
  }
  async comment(userId: string, id: string, comment: string) {
    try {
      const post = await this.postModel.findById(id);
      const user = await this.userService.findOne(userId);
      if (comment) {
        post.commentsCount++;
        post.commentBy.push(user);
        post.comments.push(comment);
        return await post.save();
      } else {
        return { error: 'Comment is required' };
      }
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  async savePost(postId: string, userId: string) {
    try {
      const user = await this.userService.findOne(userId);
      const post = await this.postModel.findById(postId);
      const savedPosts = await this.savedPostModel.findOne({
        user: user._id,
      });
      post.savedBy.push(user.id);
      if (savedPosts) {
        savedPosts.mySavedPosts.push(post);
        return await savedPosts.save();
      } else {
        return await this.savedPostModel.create({
          user: user._id,
          mySavedPosts: [post],
        });
      }
    } catch (error) {
      throw new BadGatewayException();
    }
  }
}
