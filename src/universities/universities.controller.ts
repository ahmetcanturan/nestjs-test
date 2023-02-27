import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { University } from './schemas/university.schema';
import { UniversitiesService } from './universities.service';
import { AxiosService } from '../services/axios.services';
import { ObjectId } from "mongoose";

@Controller('universities')
export class UniversitiesController {

    constructor(private readonly universitiesService: UniversitiesService) { }

    @Get(':id/students')
    async getStudentsByUniversityId(@Param('id') id: ObjectId): Promise<University> {
        return this.universitiesService.getStudentsByUniversityId(id);
    }
    @Get()
    async getUniversities(): Promise<University[]> {
        return this.universitiesService.getUniversities()
    }
    @Delete()
    async deleteUniversities(): Promise<any> {
        return this.universitiesService.deleteManyUniversities();
    }

}