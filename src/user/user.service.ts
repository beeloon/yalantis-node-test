import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      console.log(err);
    }
  }

  public async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);

      return user;
    } catch (err) {
      console.log(err);
    }
  }

  public async create(): Promise<string> {
    try {
      return '';
    } catch (err) {
      console.log(err);
    }
  }
}
