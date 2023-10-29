import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthRegisterDto } from './dtos/auth-register.dto';
import { AuthEmailLoginDto } from './dtos/auth-email-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { Services } from 'src/utils/constants';
import { UserDocument, UserStatus } from '../user/user.model';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';
import { SessionDocument } from '../session/session.model';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import crypto from 'crypto';

import * as randomstring from 'randomstring';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { IUsersService } from '../user/user';
import { ISessionService } from '../session/session';
import { IAuthService } from './auth';
import { HelperHashService } from 'src/helper/services/hash.service';

@Injectable({})
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly usersService: IUsersService,
    @Inject(Services.SESSION) private readonly sessionService: ISessionService,

    private readonly configService: ConfigService<AllConfigType>,
    private readonly jwtService: JwtService,
    private readonly helperHashService: HelperHashService,
  ) {}
  async registerUser(registerDto: AuthRegisterDto): Promise<void> {
    const hash = crypto
      .createHash('sha256')
      .update(randomstring.generate())
      .digest('hex');

    const salt = this.helperHashService.randomSalt(10);

    const password = await this.helperHashService.bcrypt(
      registerDto.password,
      salt,
    );

    await this.usersService.createUser({
      ...registerDto,
      email: registerDto.email,
      status: UserStatus.Inactive,
      hash,
      password,
    });

    //Send email
  }

  async validateLogin(loginDto: AuthEmailLoginDto): Promise<LoginResponseType> {
    const user = await this.usersService.findOneUser({
      email: loginDto.email,
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid login credentials!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    console.log('Validating password');

    const isValidPassword = this.helperHashService.bcryptCompare(
      loginDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid login credentials!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const session = await this.sessionService.create({
      user: user._id.toString(),
      isValid: true,
    });

    const { token, refreshToken, tokenExpires } = await this.getTokensData({
      id: user._id,
      sessionId: session._id,
    });

    return {
      refreshToken,
      token,
      tokenExpires: tokenExpires,
      user,
    };
  }

  async confirmEmail(hash: string): Promise<void> {
    const user = await this.usersService.findOneUser({
      hash,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `notFound`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const update = {
      hash: null,
      status: UserStatus.Active,
    };

    await this.usersService.updateUser(user._id.toString(), update);
  }

  async status(
    userJwtPayload: JwtPayloadType,
  ): Promise<NullableType<UserDocument>> {
    return await this.usersService.findOneUser({
      _id: userJwtPayload._id,
    });
  }

  // async forgotPassword(email: string): Promise<void> {}

  // async resetPassword(hash: string, password: string): Promise<void> {}

  private async getTokensData(data: {
    id: UserDocument['_id'];
    sessionId: SessionDocument['_id'];
  }) {
    const tokenExpiresIn = this.configService.getOrThrow<string>(
      'auth.expires',
      {
        infer: true,
      },
    );

    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow<string>('auth.secret', {
            infer: true,
          }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow<string>('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow<string>(
            'auth.refreshExpires',
            {
              infer: true,
            },
          ),
        },
      ),
    ]);

    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
}

