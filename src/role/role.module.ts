import { Module } from '@nestjs/common';
import { Role } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';

@Module({
     imports: [
        TypeOrmModule.forFeature([Role])
      ],
      controllers: [RoleController],
})
export class RoleModule {
   
}
