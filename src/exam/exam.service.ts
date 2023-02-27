import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { AxiosService } from "../services/axios.services";
import { Student, StudentDocument } from "../students/schemas/student.schema";
import { University, UniversityDocument } from "../universities/schemas/university.schema";
import { UniversitiesService } from '../universities/universities.service';
import { StudentsService } from '../students/students.service';
interface startExamResult {
    id: ObjectId, fullname: string, examPoint: number
}

@Injectable()

export class ExamService {
    constructor(private readonly universitiesService: UniversitiesService, private readonly studentsService: StudentsService) { }
    async startExam(articles: { article: string }[], students: StudentDocument[]): Promise<startExamResult[]> {
        let examResult: startExamResult[] = []
        for (const student of students) {
            const fullname = student.name.first.toUpperCase() + student.name.last.toUpperCase()
            const parsedFullname = new Set()
            for (const char of fullname) {
                parsedFullname.add(char)
            }
            let point = 0
            for (const article of articles) {
                let parsedArticles = new Set()
                for (const art of article.article) {
                    parsedArticles.add(art.toLocaleUpperCase())
                }
                for (const char of parsedFullname) {
                    parsedArticles.has(char) && point++
                }
            }
            examResult.push({ id: student._id, fullname: student.name.first + " " + student.name.last, examPoint: point })
        }
        return examResult.sort((a, b) => { return b.examPoint - a.examPoint })
    }
    async placesToUniversity(examResult: startExamResult[], universities: UniversityDocument[], students: StudentDocument[]) {
        const obj: Object = {}
        let j: number = 0
        let studentList: Object[] = []
        const unable: object[] = []
        for (let index = 0; index < examResult.length; index++) {
            studentList.push(examResult[index])
            if (universities.length <= j) {
                unable.push(examResult[index])
                await this.studentsService.updateByIdToUniversity(examResult[index].id, { university: "failed to get into university", examPoint: examResult[index].examPoint })
            }
            else {
                await this.studentsService.updateByIdToUniversity(examResult[index].id, { university: universities[j].name, examPoint: examResult[index].examPoint })
            }
            if (studentList.length == 5 && universities.length > j) {
                obj[universities[j].name] = [...studentList]
                universities[j].students = studentList.map((student: any) => student.id)
                await this.universitiesService.updateById(universities[j]._id, universities[j])
                studentList = []
                j++
            }
        }
        return { Universities: obj, Unable: unable }
    }
}