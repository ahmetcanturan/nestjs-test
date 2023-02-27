
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "./schemas/student.schema";
import { StudentsController } from "./students.controller";
import { StudentsRepository } from "./students.repository";
import { StudentsService } from "./students.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }])],
    controllers: [StudentsController],
    providers: [StudentsService, StudentsRepository]
})
export class StudentsModule { }