import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
// import { User } from '../repository/user.repository';


@Injectable()
export class UserService {
  private s3Client: S3Client;

  constructor(private readonly userRepository:UserRepository) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const userId = createUserDto.id || this.generateCustomId();

    // Upload file to S3
    const imageUrl = await this.uploadFileToS3(file, `User1/${userId}`);

    // Add image URL to user data
    const userWithImage = { ...createUserDto, id: userId, imageUrl };

    return this.userRepository.create(userWithImage);
  }

  async uploadFileToS3(file: Express.Multer.File, filePath: string): Promise<string> {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${filePath}/${uuid()}${fileExtension}`;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
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
    return `user-${Math.floor(Math.random() * 100)}`;
  }
}
