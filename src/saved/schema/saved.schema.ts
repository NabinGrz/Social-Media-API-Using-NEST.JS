import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { PostDocument } from 'src/post/schema/post.schema';
import { USER_MODEL, User } from 'src/user/schema/user.schema';

@Schema({ timestamps: true })
export class SavedPost {
  @Prop({ type: Types.ObjectId, ref: USER_MODEL, required: true })
  user: Types.ObjectId | User;

  @Prop({ default: [] })
  mySavedPosts: PostDocument[];
}

export type SavedPostDocument = SavedPost & Document;
export const SAVED_POST_MODEL = SavedPost.name;
export const SavedPostSchema = SchemaFactory.createForClass(SavedPost);
