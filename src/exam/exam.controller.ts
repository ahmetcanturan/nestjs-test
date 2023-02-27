import { Body, Controller, Get, Query } from '@nestjs/common';
import { ExamService } from './exam.service';
import { StudentsService } from '../students/students.service';
import { UniversitiesService } from 'src/universities/universities.service';
import { AxiosService } from '../services/axios.services';
import { ObjectId } from "mongoose";

@Controller('')
export class ExamController {
    constructor(private readonly examService: ExamService, private readonly studentService: StudentsService
        , private readonly universitiesService: UniversitiesService) { }

    @Get("startExam")
    async starExam(@Query() query): Promise<Object[] | Object> {
        const axiosService = new AxiosService();
        const articles = await axiosService.getArticles(query?.examDate)
        if (articles.length == 1) {
            return { articles: articles[0].article, message: "Try This Date : 2022/01/01" }
        }
        const students = await this.studentService.getStudents()
        const universities = await this.universitiesService.getUniversities()
        const exam_result = await this.examService.startExam(articles, students)
        const res = await this.examService.placesToUniversity(exam_result, universities, students)
        if (Object.keys(res.Unable).length == 0) {
            return { message: "There is no student in the database , create students please" }
        }
        return res

    };
}

