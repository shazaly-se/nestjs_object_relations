import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from 'src/profile/entities/profile.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private  userRepository:Repository<User>,
        @InjectRepository(Profile) private profileRepository:Repository<Profile>,
        @InjectRepository(Post) private  postRepository:Repository<Post>
        ){ }

    getUsers(){
        return this.userRepository.find({relations:['profile','posts']})
    }
    createUser(createUserDto:CreateUserDto){
        const newUser = this.userRepository.create({...createUserDto,createdAt:new Date()})
        return this.userRepository.save(newUser)
    }

    async createProfile(id:number,createProfileDto:CreateProfileDto){
        const user = await this.userRepository.findOneBy({id})
        if(!user)  throw new HttpException('not found',HttpStatus.BAD_REQUEST)
        const newProfile = this.profileRepository.create(createProfileDto)
    const savedProfile = await this.profileRepository.save(newProfile)
    user.profile = savedProfile
    return this.userRepository.save(user)

    }
    async createPost(id:number,createPostDto:CreatePostDto){
        const user = await this.userRepository.findOneBy({id})
        if(!user) throw new HttpException('not found',HttpStatus.BAD_REQUEST)
        const newPost = this.postRepository.create({...createPostDto,user})
         return await this.postRepository.save(newPost)
   

    }
    async getAllPosts(){
      return  await this.postRepository.find({relations:['user']});
    }
}
