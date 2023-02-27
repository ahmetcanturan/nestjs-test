import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop()
    gender: string;
    @Prop({
        type: {
            title: String,
            first: String,
            last: String,
        },
    })
    name: { title: string, first: string, last: string };
    @Prop({ default: 0 })
    examPoint: Number
    @Prop({ default: "" })
    university: string;
    @Prop()
    email: string;
    dob: { date: string, age: number };
    @Prop()
    phone: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
