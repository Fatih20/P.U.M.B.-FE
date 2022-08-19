import { CategoryInput, CreateCourseInput } from "./typesForUs";

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";
export const possibleCourseStatus = ["REJECTED" , "VERIFYING" , "VERIFIED"] as const;
export type CourseStatus = typeof possibleCourseStatus[number];

export interface UniqueObject  {
    id : string
}

export interface Category extends UniqueObject{
  name : string
}

export type TeacherForStudent = {
  user_id : string,
  course_id : string,
  created_at : string,
  updated_at : string,
  user : {
    username : string,
    email : string
  }
}
export type Course = UniqueObject & {
  title : string,
  description : string,
  course_status : CourseStatusInCourse,
  categories : Category[],
  teacher : TeacherForStudent[],
  thumbnail_url : string,
  enrolled : boolean,
  _count : {
    followers : number
  }
}

export type User = UniqueObject & {
  username : string,
  email : string,
  role : UserRole,
}

export type TeacherForAdmin = User & {
  first_name : string,
  last_name : string,
  role : "TEACHER",

}

export type ObjectStatus = UniqueObject & {
  id : number,
  status : CourseStatus,
  description : string
}


export type CourseStatusInCourse = ObjectStatus & {
  course_id : string
}

export type TeacherStatus = ObjectStatus & {
  user_id : string
}
export type Lecture = UniqueObject & {
  title : string,
  course_id : string
}

export type Quiz = Lecture;

export type CourseStatusAdminModified = Exclude<CourseStatus, "VERIFYING">

export type CourseStatusModifier = {
  status : CourseStatusAdminModified,
  description : string
} & UniqueObject

export type CreateCourseInputBody = Omit<CreateCourseInput, "categories"> & {
  thumbnail_url : string,
  categories : CategoryInput[]
}