export class CreateUserDto {
      readonly id: string;
      readonly firstName: string;
      readonly lastName: string;
      readonly contactNo: string;
      readonly dob: Date;
      readonly imagePath?: string; // Optional field for storing the uploaded image URL
    }
    