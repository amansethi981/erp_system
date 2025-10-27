import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';

export const Connection = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username:  'root',
  password: '12321',
  database:  'erp_db',
  autoLoadEntities: true,
  synchronize: true,
  entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
});
  