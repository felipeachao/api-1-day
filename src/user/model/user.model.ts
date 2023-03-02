import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CompanyModel } from 'src/company/model/company.model';
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

  @IsNumber()
  @IsNotEmpty()
  @ForeignKey(() => CompanyModel)
  @Column
  company_id: number;

  @BelongsTo(() => CompanyModel)
  company: CompanyModel;
}
