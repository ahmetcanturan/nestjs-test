import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { ObjectId } from "mongoose";

import { University, UniversityDocument } from "./schemas/university.schema";
@Injectable()
export class UniversitiesRepository {
    constructor(@InjectModel(University.name) private universityModel: Model<UniversityDocument>) { }

    async findStudentsByUniversityId(universityFilterQuery: FilterQuery<University>): Promise<any> {
        return this.universityModel.findById(universityFilterQuery).populate('students');
    }
    async find(universityFilterQuery: FilterQuery<University>): Promise<UniversityDocument[]> {
        return this.universityModel.find(universityFilterQuery)
    }
    async create(university: University): Promise<UniversityDocument> {
        const newUniversity = new this.universityModel(university);
        return newUniversity.save()
    }
    async createMany(universities: University[]): Promise<UniversityDocument[]> {
        return this.universityModel.insertMany(universities);
    }
    async findByIdAndUpdate(id: ObjectId, data: UniversityDocument): Promise<UniversityDocument> {
        return this.universityModel.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteMany(universityFilterQuery: FilterQuery<University>): Promise<any> {
        return this.universityModel.deleteMany(universityFilterQuery);
    }
}