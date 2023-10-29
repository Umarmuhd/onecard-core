import { FilterQuery } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDocument } from './user.model';
import { NullableType } from 'src/utils/types/nullable.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';

export interface IUsersService {
  createUser(createUserDto: CreateUserDto): Promise<UserDocument>;
  findOneUser(
    options: FilterQuery<UserDocument>,
  ): Promise<NullableType<UserDocument>>;
  updateUser(
    _id: string,
    payload: Partial<UserDocument>,
  ): Promise<UserDocument>;
  findUsersWithPagination(
    paginationOptions: IPaginationOptions,
  ): Promise<UserDocument[]>;
}
