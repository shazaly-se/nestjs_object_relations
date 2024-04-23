import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Post } from 'src/post/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Profile,Post])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
