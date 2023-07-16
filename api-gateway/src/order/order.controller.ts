import { Controller, Inject, Post, OnModuleInit, UseGuards, Body } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateOrderResponse, OrderServiceClient, ORDER_SERVICE_NAME, CreateOrderRequest } from './order.pb';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { FindOneResponse, PRODUCT_SERVICE_NAME, ProductServiceClient } from 'src/product/product.pb';
import { CreateOrderRequestDto } from './order.dto';

@Controller('order')
export class OrderController implements OnModuleInit {
  private svc: OrderServiceClient;
  private productSvc: ProductServiceClient;

  @Inject(ORDER_SERVICE_NAME)
  private readonly orderClient: ClientGrpc;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly productClient: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.orderClient.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
    this.productSvc = this.productClient.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createOrder(@Body() reqBody: CreateOrderRequestDto): Promise<Observable<CreateOrderResponse>> {
    
    this.productSvc.findOne({id: reqBody.productId});
    
    return this.svc.createOrder(reqBody);
  }
}