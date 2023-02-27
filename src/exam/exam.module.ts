
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";
import { StudentsService } from '../students/students.service';
import { Student, StudentSchema } from "../students/schemas/student.schema";
import { StudentsRepository } from "../students/students.repository";
import { UniversitiesService } from 'src/universities/universities.service';
import { University, UniversitySchema } from "../universities/schemas/university.schema";
import { UniversitiesRepository } from "../universities/universities.repository";


@Module({
    imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema },]),
    MongooseModule.forFeature([{ name: University.name, schema: UniversitySchema }])],
    controllers: [ExamController],
    providers: [ExamService, StudentsService, StudentsRepository, UniversitiesService, UniversitiesRepository]
})
export class ExamModule { }