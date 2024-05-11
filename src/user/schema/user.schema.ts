import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  profileUrl: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  // @Prop({ type: [{ type: Types.ObjectId, ref: SAVED_POST_MODEL }] })
  // savedPosts: Types.Array<SavedPost>;
  // @Prop({ type: Types.ObjectId, ref: SAVED_POST_MODEL, required: true })
  // post: Post[];
}

export const USER_MODEL = User.name;
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
