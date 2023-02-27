import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as _schema } from 'mongoose';
export type UniversityDocument = University & Document;

@Schema()
export class University {
    @Prop({ required: true })
    name: string;
    @Prop([{ type: _schema.Types.ObjectId, ref: 'Student' }])
    students: _schema.Types.ObjectId[]
}

export const UniversitySchema = SchemaFactory.createForClass(University);
