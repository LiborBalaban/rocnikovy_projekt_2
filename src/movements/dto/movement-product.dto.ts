import { IsInt, IsOptional } from 'class-validator';

export class MovementProductDto {
  @IsInt()
  id: number;

  @IsInt()
  quantity: number;

  @IsInt()
  price: number;

  @IsOptional()
  @IsInt()
  positionId?: number;
}