import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'Company',
  timestamps: true,
})
export class CompanyModel extends Model<CompanyModel> {
  @IsNumber()
  @IsNotEmpty()
  @Column({ primaryKey: true, autoIncrement: true })
  company_id: number;

  @IsString()
  @IsNotEmpty()
  @Column
  company_name: string;
}
