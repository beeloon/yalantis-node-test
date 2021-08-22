import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.appService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    if (!photo) {
      throw new BadRequestException('Empty or invalid photo field.');
    }

    const userId = this.appService.create(createUserDto, photo);

    return userId;
  }
}
