import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ id: true })
export class User extends Document {

      @Prop({required:true,unique:true})
      id:string;

      @Prop({required: true})
      firstName:string;

      @Prop({required: true})
      lastName:string;

      @Prop({required: true})
      contactNo:string;

      @Prop({required: true})
      dob:Date;

}
export const UserSchema = SchemaFactory.createForClass(User);