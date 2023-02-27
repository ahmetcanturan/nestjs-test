import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { Student } from './schemas/student.schema';
import { StudentsService } from './students.service';
import { AxiosService } from '../services/axios.services';
import { ObjectId } from "mongoose";

@Controller('students')
export class StudentsController {

    constructor(private readonly studentsService: StudentsService) { }

    @Get(':id')
    async getStudentById(@Param('id') id: ObjectId): Promise<Student> {
        return this.studentsService.getStudentById(id);
    }

    @Get()
    async getStudents(): Promise<Student[]> {
        return this.studentsService.getStudents()
    }

    @Post()
    async createManyStudents(): Promise<Student[]> {
        const axiosService = new AxiosService();
        const students = await axiosService.getStudents();
        return this.studentsService.createManyStudents(students.results);
    }

    @Delete()
    async deleteStudents(): Promise<any> {
        return this.studentsService.deleteStudents();
    }

}