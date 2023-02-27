import { Injectable } from "@nestjs/common";
import { University, UniversityDocument } from "./schemas/university.schema";
import { UniversitiesRepository } from "./universities.repository";
import { ObjectId } from "mongoose";
import { AxiosService } from '../services/axios.services';
@Injectable()
export class UniversitiesService {
    constructor(private readonly universitiesRepository: UniversitiesRepository) { }

    async getStudentsByUniversityId(id: ObjectId): Promise<any> {
        return this.universitiesRepository.findStudentsByUniversityId(id)
    }
    async getUniversities(): Promise<UniversityDocument[]> {
        let universities = (await this.universitiesRepository.find({})).sort((a, b) => a.name.localeCompare(b.name))
        if (universities.length == 0) {
            //database boşsa ve apiden aynı isimli üniversite birkaç defa geliyorsa birini kayıt ediyoruz.
            const axiosService = new AxiosService();
            let _universities = await axiosService.getUniversities()
            _universities = _universities.filter((uni, index, self) =>
                index === self.findIndex((t) => (
                    t.name === uni.name
                ))
            )
            await this.createManyUniversities(_universities)
            return _universities
        }
        return universities
    }
    async createManyUniversities(universities: University[]): Promise<UniversityDocument[]> {
        return this.universitiesRepository.createMany(universities)
    }
    async updateById(id: ObjectId, data: UniversityDocument): Promise<UniversityDocument> {
        return this.universitiesRepository.findByIdAndUpdate(id, data);
    }
    async deleteManyUniversities(): Promise<any> {
        return this.universitiesRepository.deleteMany({});
    }

}