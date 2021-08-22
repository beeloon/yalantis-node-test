import { resolve } from 'path';
import * as sharp from 'sharp';
import { Model } from 'mongoose';
import {
  Injectable,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();

      return users;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  public async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);

      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public async create(
    createUserDto: CreateUserDto,
    photo: Express.Multer.File,
  ): Promise<string> {
    try {
      this.changePhotoPath(photo);

      const userDto = { ...createUserDto, photo: photo.path };
      const user = await this.userModel.create(userDto);

      this.resizeAndSave(photo);

      return user._id;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  private changePhotoPath(photo: Express.Multer.File): void {
    const photoName = photo.originalname.split('.')[0];
    const photoExt = photo.originalname.split('.')[1];
    const uniquePhotoname = `${photoName}_${randomUUID()}.${photoExt}`;

    photo.path = resolve(process.env.NODE_PATH, 'uploads', uniquePhotoname);
  }

  private async resizeAndSave(photo: Express.Multer.File) {
    await sharp(photo.buffer)
      .resize({ width: 200, height: 200, position: 'center' })
      .toFile(photo.path, (err) => {
        if (err) {
          throw new InternalServerErrorException(err.message);
        }
      });
  }
}
