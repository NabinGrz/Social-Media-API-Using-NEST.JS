import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { POST_MODEL, PostSchema } from 'src/post/schema/post.schema';
import {
  SAVED_POST_MODEL,
  SavedPostSchema,
} from 'src/saved/schema/saved.schema';
import { USER_MODEL, UserSchema } from 'src/user/schema/user.schema';

const MODELS = [
  { name: USER_MODEL, schema: UserSchema },
  { name: POST_MODEL, schema: PostSchema },
  { name: SAVED_POST_MODEL, schema: SavedPostSchema },
];
@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelModule {}
