import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) {

  }
  async create(createPatientDto: CreatePatientDto) {
    const userFount = await this.patientRepository.findOne({
      where: {
        username: createPatientDto.username
      }
    })

    if (userFount) {
      return new HttpException('User already exists', HttpStatus.CONFLICT)
    }

    const newpacientes = this.patientRepository.create(createPatientDto)
    await this.patientRepository.save(newpacientes)
    return newpacientes
  }

  async findAll() {
    return await this.patientRepository.find({
      relations: ['posts', 'profile']
    })
  }

  async findOne(id: number) {
    const userFound = await this.patientRepository.findOne({
      where: {
        id,
      },
      relations: ['posts', 'profile']
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return userFound
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const userFound = await this.patientRepository.findOne({
      where: {
        id
      }
    })

    if (!userFound) new HttpException('User not found', HttpStatus.NOT_FOUND);

    const updateUser = Object.assign(userFound, updatePatientDto);
    return this.patientRepository.save(updateUser);
  }

  async remove(id: number) {
    const result = await this.patientRepository.delete({ id })

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async createProfile(id: number, createProfileDto: CreateProfileDto) {
    const userFound = await this.patientRepository.findOne({
      where: {
        id,
      }
    })
    if (!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const newProfile = this.profileRepository.create(createProfileDto)

    const saveProfile = await this.profileRepository.save(newProfile)

    userFound.profile = saveProfile

    return this.patientRepository.save(userFound)
  }
}
