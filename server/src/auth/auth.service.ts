import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schema/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { name, email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: any } | null> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    const payload = { username: user.name, sub: user._id };
    const token = this.jwtService.sign(payload);

    return { token, user: user.name };
  }

  async validateUser(payload: any): Promise<any> {
    const user = await this.userModel.findById(payload.sub).exec();
    if (!user) {
      return null;
    }
    return { userId: user._id, username: user.name };
  }

  async getUserById(userId: object): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }
}
