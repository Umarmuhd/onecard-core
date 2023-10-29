import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './user.model';
import { FilterQuery } from 'mongoose';
import { UpdateUserDto } from './dtos/update-user.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { IUsersService } from './user';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.usersRepository.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const user = await this.usersRepository.create({
      ...createUserDto,
      phoneNumberVerified: false,
    });
    return user;
  }

  findOneUser(
    options: FilterQuery<UserDocument>,
  ): Promise<NullableType<UserDocument>> {
    return this.usersRepository.findOne(options);
  }

  findUsersWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<UserDocument[]> {
    return this.usersRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.findOneAndUpdate(
      { _id },
      { $set: updateUserDto },
    );
  }
}

