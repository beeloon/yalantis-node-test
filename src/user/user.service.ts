import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './interfaces/user.interface';
import { User, UserDocument } from './schemas/user.schema';

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
      const userDto = { ...createUserDto, photo: photo.path };
      const user = await this.userModel.create(userDto);

      return user._id;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
