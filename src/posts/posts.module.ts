import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Profile } from 'src/patients/entities/profile.entity';
import { PatientsModule } from 'src/patients/patients.module';

@Module({  imports:[
  ConfigModule,
  TypeOrmModule.forFeature([Post]), PatientsModule
],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
