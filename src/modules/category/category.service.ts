import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  create(data: CreateCategoryDto) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({ relations: ['parent', 'children'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async update(id: number, data: UpdateCategoryDto) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
