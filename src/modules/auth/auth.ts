import { NullableType } from 'src/utils/types/nullable.type';
import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { LoginResponseType } from './types/login-response.type';
import { UserDocument } from '../user/user.model';

export interface IAuthService {
  validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseType>;
  registerUser(registerDto: AuthRegisterDto): Promise<void>;
  status(userJwtPayload: JwtPayloadType): Promise<NullableType<UserDocument>>;
  confirmEmail(hash: string): Promise<void>;
}
