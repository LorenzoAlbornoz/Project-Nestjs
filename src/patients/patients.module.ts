import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { ConfigModule } from '@nestjs/config';
import { Profile } from './entities/profile.entity';

@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Patient, Profile])
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService]
})
export class PatientsModule {}
