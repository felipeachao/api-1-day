import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CompanyModel } from './model/company.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyModel)
    private companyModel: typeof CompanyModel,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const { company_name } = createCompanyDto;
      const hasExist = await this.findByName(company_name);
      if (hasExist)
        throw new HttpException(`Company has exist`, HttpStatus.BAD_REQUEST);
      return await this.companyModel.create(createCompanyDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const result = await this.companyModel.findAll({
        include: { all: true, nested: true },
      });
      if (result.length < 1)
        throw new HttpException(`has no records`, HttpStatus.NOT_FOUND);
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findByName(name: string) {
    try {
      return await this.companyModel.findOne({
        where: {
          company_name: name,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.companyModel.findByPk(id);
      if (!result)
        throw new HttpException(
          `Company id not found or not exist`,
          HttpStatus.NOT_FOUND,
        );
      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      await this.findOne(id);
      const { company_name } = updateCompanyDto;
      const hasExist = await this.findByName(company_name);
      if (hasExist)
        throw new HttpException(`Company has exist`, HttpStatus.BAD_REQUEST);
      return await this.companyModel.update(updateCompanyDto, {
        where: {
          company_id: id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.companyModel.destroy({
        where: {
          company_id: id,
        },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
