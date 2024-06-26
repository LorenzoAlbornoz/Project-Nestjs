import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PatientsService } from 'src/patients/patients.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private patientService: PatientsService
  ) { }

  async create(createPostDto: CreatePostDto) {
    const userFound = await this.patientService.findOne(createPostDto.authorId)
    if (!userFound) return new HttpException('User not found', HttpStatus.NOT_FOUND)
  
    const newPost = this.postsRepository.create(createPostDto)
    return this.postsRepository.save(newPost)
  }

  findAll() {
    return this.postsRepository.find({
      relations: ['author']
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
