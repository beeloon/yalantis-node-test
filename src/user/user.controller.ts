import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { User } from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<{ statusCode: HttpStatus; users: User[] }> {
    const users = await this.userService.findAll();

    return { statusCode: HttpStatus.OK, users };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ statusCode: HttpStatus; user: User }> {
    const user = await this.userService.findOne(id);

    return { statusCode: HttpStatus.OK, user };
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<{ statusCode: HttpStatus; userId: string }> {
    if (!photo) {
      throw new BadRequestException('Empty or invalid photo field.');
    }

    const userId = await this.userService.create(createUserDto, photo);

    return { statusCode: HttpStatus.OK, userId };
  }

  @Delete()
  async removeAll(): Promise<{ statusCode: HttpStatus }> {
    await this.userService.removeAll();

    return { statusCode: HttpStatus.OK };
  }
}
