import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
export class CreatePositionDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsInt()
  storageId?: number;
}
