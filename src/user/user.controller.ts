import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Get()
   async getUsers(){
const users = await this.userService.getUsers()
return users
    }
    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
       return this.userService.createUser(createUserDto)
    }

    @Post(':id/profiles')
    createUserProfile(@Param('id') id:number, @Body() createProfileDto:CreateProfileDto){
        return this.userService.createProfile(id,createProfileDto);

    }

    @Post(':id/posts')
    createPost(@Param('id') id:number, @Body() createPostDto:CreatePostDto){
        return this.userService.createPost(id,createPostDto)
    }

    @Get("posts")
    getAllPosts(){
        return this.userService.getAllPosts();
    }
}
