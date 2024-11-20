import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class User extends Document {
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