import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  IsDateString,
  ValidateNested,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MovementProductDto } from './movement-product.dto';

export class CreateMovementDto {
  @IsDateString()
  date: string;

  @IsInt()
  storageId: number;

  @IsOptional()
  @IsInt()
  supplierId?: number;

  @IsInt()
  typeId: number;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsInt()
  invoiceNumber?: number;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MovementProductDto)
  products: MovementProductDto[];
}