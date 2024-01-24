import {z} from 'zod';
export default async function StudentDataValidate(data){

    const schema = z.object({
        first_name: z.string({
            message: "First name must be a string",
        }).min(3, {
            message: "First name must be at least 3 characters long",
        }).max(20, {
            message: "First name must be at most 20 characters long",
        }),
        last_name: z.string({
            message: "Last name must be a string",
        }).min(3, {
            message: "Last name must be at least 3 characters long",
        }).max(20, {
            message: "Last name must be at most 20 characters long",
        }),
        age: z.number({
            message: "Age must be a number",
        }).min(1, {
            message: "Age must be at least 1",
        }).max(100, {
            message: "Age must be at most 100",
        }),
        grade: z.string({
            message: "Grade must be a string",
        }).min(1, {
            message: "Grade must be at least 1 characters long",
        }).max(3, {
            message: "Grade must be at most 3 characters long",
        }),
        courses: z.string({
            message: "Courses must be a string",
        }).min(1, {
            message: "Courses must be at least 1 characters long",
        }).max(20, {
            message: "Courses must be at most 20 characters long",
        }),
    });
    try {
        schema.parse(data);
        return null;
    } catch (error) {
        return error.errors;
    }
}