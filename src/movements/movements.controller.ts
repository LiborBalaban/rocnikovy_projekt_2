import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { MovementService} from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';


@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementService) {}
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createMovementDto: CreateMovementDto, @Request() req) {
    const userId = req.user.sub;
    const storageId = req.user.storageId;
    return this.movementsService.createMovement(createMovementDto, userId, storageId);
  }

  @UseGuards(AdminGuard)
  @Get('company')
  findAllByCompany(@Request() req) {
    const companyId = req.user.companyId;
    return this.movementsService.findAllByCompany(companyId);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  findAllByUser(@Request() req) {
    const userId = req.user.sub;
    return this.movementsService.findAllByUser(userId);
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementsService.getProductStock(+id);
  }
  
  @UseGuards(AuthGuard)
  @Get(':id/storage/:storageId')
  findProductMovmementsByStorage(@Param('id') id: string, @Param('storageId') storagId: string) {
    return this.movementsService.getProductStockStorage(+id, +storagId);
  }
}
