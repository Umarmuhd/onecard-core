import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';
import { IsString, ValidateIf } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.MONGODB_URI)
  @IsString()
  MONGODB_URI: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    mongodb_uri: process.env.MONGODB_URI,
  };
});
