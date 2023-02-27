
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { ObjectId } from "mongoose";
import { Student, StudentDocument } from "./schemas/student.schema";
@Injectable()
export class StudentsRepository {
    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    async findById(studentFilterQuery: FilterQuery<Student>): Promise<StudentDocument> {
        return this.studentModel.findById(studentFilterQuery);
    }
    async find(studentFilterQuery: FilterQuery<Student>): Promise<StudentDocument[]> {
        return this.studentModel.find(studentFilterQuery).sort({ examPoint: -1 })
    }
    async create(student: Student): Promise<StudentDocument> {
        const newStudent = new this.studentModel(student);
        return newStudent.save()
    }
    async createMany(students: Student[]): Promise<StudentDocument[]> {
        return this.studentModel.insertMany(students);
    }
    async findByIdAndUpdateUniversity(id: ObjectId, data: { university: string, examPoint: number }): Promise<StudentDocument> {
        const student = await this.studentModel.findById(id)
        student.university = data.university
        student.examPoint = data.examPoint
        return student.save()
    }
    async deleteMany(studentFilterQuery: FilterQuery<Student>): Promise<any> {
        return this.studentModel.deleteMany(studentFilterQuery);
    }
}