import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from "./students/students.module"
import { UniversitiesModule } from "./universities/universities.module"
import { ExamModule } from './exam/exam.module';
@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/nestjs"), StudentsModule, UniversitiesModule, ExamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
