import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { University, UniversitySchema } from "./schemas/university.schema";
import { UniversitiesController } from "./universities.controller";
import { UniversitiesService } from "./universities.service";
import { UniversitiesRepository } from "./universities.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: University.name, schema: UniversitySchema }])],
    controllers: [UniversitiesController],
    providers: [UniversitiesService, UniversitiesRepository]
})
export class UniversitiesModule { }