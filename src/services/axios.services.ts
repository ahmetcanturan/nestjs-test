import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Student } from '../students/schemas/student.schema';
import { University, UniversityDocument } from '../universities/schemas/university.schema';

interface StudentResponse {
    results: Student[];
}
interface ArticlesResponse {
    items: [{
        articles: {
            article: string,
            views: number,
            rank: number
        }[]
    }]
}

@Injectable()

export class AxiosService {
    async getStudents(): Promise<StudentResponse> {
        const response: AxiosResponse<StudentResponse> = await axios.get("https://randomuser.me/api/?nat=US,TR&results=1000")
        return response.data;
    }
    async getUniversities(): Promise<UniversityDocument[]> {
        const response: AxiosResponse<UniversityDocument[]> = await axios.get('http://universities.hipolabs.com/search?country=turkey')
        return response.data;
    }
    async getArticles(date: string): Promise<{ article: string }[]> {
        try {
            const response: AxiosResponse<ArticlesResponse> = await axios.get(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/tr.wikipedia/all-access/${date}`)
            return response.data.items[0].articles

        } catch (error) {
            return [{ article: "There is no article for this date" }]
        }
    }
}