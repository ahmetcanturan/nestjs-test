import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from "./students/students.module"
import { UniversitiesModule } from "./universities/universities.module"
import { ExamModule } from './exam/exam.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://cluster0.v5mvuw0.mongodb.net/nestjs" --apiVersion 1 --username ahmtcntrn74'), StudentsModule, UniversitiesModule, ExamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
