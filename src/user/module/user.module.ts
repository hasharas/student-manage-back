import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserRepository } from '../repository/user.repository';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name, schema:UserSchema}])],
  providers: [UserService,UserRepository],
  controllers: [UserController]
})
export class UserModule {}
