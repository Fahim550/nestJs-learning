import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string | Buffer): Promise<string> {
    // const bcrypt = await import('bcrypt');
    // const saltRounds = 10;
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(
    plianPassword: string | Buffer,
    hashedPassword: string | Buffer,
  ): Promise<boolean> {
    return await bcrypt.compare(
      plianPassword.toString(),
      hashedPassword.toString(),
    );
  }
}
