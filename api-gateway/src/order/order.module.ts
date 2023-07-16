import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from './order.pb';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from 'src/product/product.pb';

@Module({
  imports: [
    AuthModule,
    ProductModule,
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: ORDER_PACKAGE_NAME,
          protoPath: 'node_modules/microservice-protos/proto/order.proto',
        },
      },
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: PRODUCT_PACKAGE_NAME,
          protoPath: 'node_modules/microservice-protos/proto/product.proto',
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}