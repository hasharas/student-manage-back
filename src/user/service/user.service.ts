import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
      constructor(private readonly userRepository: UserRepository){ }

      create(createUserDto: CreateUserDto) {
            const userId = createUserDto.id || this.generateCustomId();
            return this.userRepository.create({ ...createUserDto, id: userId });
          }

          findAll() {
            return this.userRepository.findAll();
          }

          findOne(id: string) {
            return this.userRepository.findOne(id);
          }

          update(id: string, updateUserDto: UpdateUserDto) {
            return this.userRepository.update(id, updateUserDto);
          }

          remove(id: string) {
            return this.userRepository.delete(id);
          }

          private generateCustomId(): string {
            // custom ID generat
            return `user-${Math.floor(Math.random() * 100)}`;
          }
}
