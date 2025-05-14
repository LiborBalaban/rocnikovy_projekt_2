// movement.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MovementRepository } from './movements.repository';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateStockDto } from './dto/update.stock.dto';
import { CreateStockTransactionDto } from './dto/create-transaction';
import { Prisma, Stock, StockMovement, StockTransaction } from '@prisma/client';

@Injectable()
export class MovementService {
  constructor(private readonly movementRepository: MovementRepository) {}

  async findAllByCompany(companyId: number){
     try {
        const movements = await this.movementRepository.findAllByCompany(companyId);
    
        if(movements){
          return {
            documents:movements,
            message:"Pohyby byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async findAllByUser(userId: number) {
    try {
        const movements = await this.movementRepository.findAllByUser(userId);
    
        if(movements){
          return {
            documents:movements,
            message:"Pohyby byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async getProductStock(productId: number) {
    
    try {
        const stocks = await this.movementRepository.getProductStock(productId);
    
        if(stocks){
          return {
            documents:stocks,
            message:"Pohyby byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async getProductStockStorage(productId: number, storageId: number) {
   
     try {
        const stocks = await this.movementRepository.getProductStockStorage(productId, storageId);
    
        if(stocks){
          return {
            documents:stocks,
            message:"Stocks byly získáný správně"
          }
        }
        } catch (error) {
          console.error('Chyba při hledání pohybů:', error);
            throw new InternalServerErrorException(
            'Bohužel došlo k chybě při hledání pohybů.',
          );
        }
  }

  async createMovement(dto: CreateMovementDto, userId: number, defaultStorageId: number) {
  const storageId = dto.storageId || defaultStorageId;
  const movement = await this.movementRepository.createStocking({
    user:{connect: {id:userId}},
    storage:{connect: {id:storageId}},
    type:{connect: {id:dto.typeId}},
    date: new Date(),
    supplier:{connect: {id:dto.supplierId}},
    description: dto.description,
    invoiceNumber: dto.invoiceNumber,
  });

  const promises = dto.products.map(async (product) => {

    await this.movementRepository.createStockTransaction({
      movement: {connect: {id:movement.id}},
      product: {connect: {id:product.id}},
      quantity: product.quantity,
      price: product.price,
      storage:{connect: {id:storageId}},
      position: {connect: {id:product.positionId}}
    });

    const existingStock = await this.movementRepository.findStock(product.id, storageId);
    if (existingStock.length) {
      await this.movementRepository.updateStock(existingStock[0].id, dto.typeId === 2 ? -product.quantity : product.quantity);
    } else {
      await this.movementRepository.createStock({
        products: {connect: {id:product.id}},
        storageId:storageId,
        quantity: dto.typeId === 2 ? -product.quantity : product.quantity,
      });
    }

    if (product.positionId) {
      await this.movementRepository.createPositionProduct({
        product: {connect:{id:product.id}},
        position: {connect: {id:product.positionId}},
        quantity:product.quantity
      });
    }
  });

  await Promise.all(promises);
}
}