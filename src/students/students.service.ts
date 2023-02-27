import { Injectable } from "@nestjs/common";
import { Student, StudentDocument } from "./schemas/student.schema";
import { StudentsRepository } from "./students.repository";
import { ObjectId } from "mongoose";

@Injectable()
export class StudentsService {
    constructor(private readonly studentsRepository: StudentsRepository) { }

    async getStudentById(id: ObjectId): Promise<StudentDocument> {
        return this.studentsRepository.findById(id)
    }

    async getStudents(): Promise<StudentDocument[]> {
        return this.studentsRepository.find({})
    }

    async createStudent(student: Student): Promise<StudentDocument> {
        return this.studentsRepository.create(student)
    }

    async createManyStudents(students: Student[]): Promise<StudentDocument[]> {
        return this.studentsRepository.createMany(students);
    }
    async updateByIdToUniversity(id: ObjectId, data: { university: string, examPoint: number }): Promise<StudentDocument> {
        return this.studentsRepository.findByIdAndUpdateUniversity(id, data);
    }
    async deleteStudents(): Promise<any> {
        return this.studentsRepository.deleteMany({});
    }
}