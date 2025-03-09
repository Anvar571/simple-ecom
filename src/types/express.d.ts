import { UserEntity } from 'src/modules/user/entity/user.entity';

declare module 'express' {
  export interface Request {
    user: UserEntity;
  }
}
