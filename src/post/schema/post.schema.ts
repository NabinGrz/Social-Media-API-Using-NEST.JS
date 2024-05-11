import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { USER_MODEL, User, UserDocument } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  owner: User;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ required: true })
  caption: string;

  @Prop({ default: 0 })
  likesCount: number;

  @Prop({ default: 0 })
  commentsCount: number;

  @Prop({ default: [] })
  likedBy: UserDocument[];

  @Prop({ default: [] })
  commentBy: UserDocument[];

  @Prop({ default: [] })
  comments: string[];

  @Prop({ default: [] })
  savedBy: string[];
}

export type PostDocument = Post & Document;
export const POST_MODEL = Post.name;
export const PostSchema = SchemaFactory.createForClass(Post);
