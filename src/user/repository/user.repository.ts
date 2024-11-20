import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";


@Injectable()
export class UserRepository {
      constructor(@InjectModel(User.name) private userModel:Model<User>){}

      async create(user: Partial<User>): Promise<User> {
            const newUser = new this.userModel(user);
            return newUser.save();
          }
        
          async findAll(): Promise<User[]> {
            return this.userModel.find().exec();
          }
        
          async findOne(id: string): Promise<User> {
            return this.userModel.findOne({ id }).exec();
          }
        
          async update(id: string, user: Partial<User>): Promise<User> {
            return this.userModel.findOneAndUpdate({ id }, user, { new: true }).exec();
          }
        
          async delete(id: string): Promise<User> {
            return this.userModel.findOneAndDelete({ id }).exec();
          }
}