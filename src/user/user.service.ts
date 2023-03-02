import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { user_name } = createUserDto;
      const hasExist = await this.findbyName(user_name);
      if (hasExist)
        throw new HttpException(`User_name has exist`, HttpStatus.BAD_REQUEST);
      return await this.userModel.create(createUserDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findbyName(name: string) {
    try {
      const result = await this.userModel.findOne({
        where: {
          user_name: name,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const result = await this.userModel.findAll({
        include: { all: true, nested: true },
      });
      if (result.length < 1) {
        throw new HttpException(`has no records`, HttpStatus.NOT_FOUND);
      }
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.userModel.findByPk(id);
      if (!result)
        throw new HttpException(
          `User Id not found or not exist`,
          HttpStatus.NOT_FOUND,
        );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(id);
      const { user_name } = updateUserDto;
      const hasExist = await this.findbyName(user_name);
      if (hasExist)
        throw new HttpException(`User_name has exist`, HttpStatus.BAD_REQUEST);
      return await this.userModel.update(updateUserDto, {
        where: {
          user_id: id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.userModel.destroy({ where: { user_id: id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
