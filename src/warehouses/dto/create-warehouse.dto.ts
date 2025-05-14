import { IsString, IsInt, IsOptional, MaxLength } from 'class-validator';
export class CreateWarehouseDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsInt()
  phone: number;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsInt()
  psc: number;

  @IsString()
  @MaxLength(255)
  city: string;

  @IsInt()
  companyId: number;
}
