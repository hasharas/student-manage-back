import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {
      constructor(private readonly userService: UserService) {}

      @Post()
      async create(@Body() createUserDto: CreateUserDto) {
        try{
            const newUser = await this.userService.create(createUserDto);
            return {
                  success:true,
                  message: 'User create successfully',
                  data:newUser
            };
        }catch(error){
            throw new HttpException(
                  {
                        success: false,
                        message: 'Failed to create user',
                        error: error.message,
                  },
                  HttpStatus.BAD_REQUEST,
            );
        }
      }

      @Get()
      async findAll() {
            try {
                  const users = await this.userService.findAll();
                  return {
                    success: true,
                    message: 'Users retrieved successfully',
                    data: users,
                  };
                } catch (error) {
                  throw new HttpException(
                    {
                      success: false,
                      message: 'Failed to retrieve users',
                      error: error.message,
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR,
                  );
                }
      }

      @Get(':id')
      async findOne(@Param('id') id: string) {
            try {
                  const user = await this.userService.findOne(id);
                  if (!user) {
                    throw new HttpException(
                      {
                        success: false,
                        message: `User with ID ${id} not found`,
                      },
                      HttpStatus.NOT_FOUND,
                    );
                  }
                  return {
                    success: true,
                    message: 'User retrieved successfully',
                    data: user,
                  };
                } catch (error) {
                  throw new HttpException(
                    {
                      success: false,
                      message: 'Failed to retrieve user',
                      error: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                  );
                }
      }

      @Patch(':id')
      async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
            try {
              const updatedUser = await this.userService.update(id, updateUserDto);
              if (!updatedUser) {
                throw new HttpException(
                  {
                    success: false,
                    message: `User with ID ${id} not found`,
                  },
                  HttpStatus.NOT_FOUND,
                );
              }
              return {
                success: true,
                message: 'User updated successfully',
                data: updatedUser,
              };
            } catch (error) {
              throw new HttpException(
                {
                  success: false,
                  message: 'Failed to update user',
                  error: error.message,
                },
                HttpStatus.BAD_REQUEST,
              );
            }
          }

      @Delete(':id')
      async remove(@Param('id') id: string) {
            try {
                  const deletedUser = await this.userService.remove(id);
                  if (!deletedUser) {
                    throw new HttpException(
                      {
                        success: false,
                        message: `User with ID ${id} not found`,
                      },
                      HttpStatus.NOT_FOUND,
                    );
                  }
                  return {
                    success: true,
                    message: 'User deleted successfully',
                    data: deletedUser,
                  };
                } catch (error) {
                  throw new HttpException(
                    {
                      success: false,
                      message: 'Failed to delete user',
                      error: error.message,
                    },
                    HttpStatus.BAD_REQUEST,
                  );
                }
              }
      }

