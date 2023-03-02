import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Model, Table, Column } from 'sequelize-typescript';
@Table({
  tableName: 'User',
  timestamps: true,
})
export class UserModel extends Model<UserModel> {
  @IsNumber()
  @IsNotEmpty()
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  user_id: number;

  @IsString()
  @IsNotEmpty()
  @Column
  user_name: string;
}
