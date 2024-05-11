import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModelModule } from './mongoose/mongoose-model.module';
import { DatabaseModule } from './mongoose/database.module';
import { UsersModule } from './user/users.module';
import { UploadModule } from './upload/upload.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModelModule,
    DatabaseModule,
    UsersModule,
    UploadModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
