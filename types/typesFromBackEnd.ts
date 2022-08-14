export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";
export const possibleCourseStatus = ["REJECTED" , "VERIFYING" , "VERIFIED"] as const;
export type CourseStatus = typeof possibleCourseStatus[number];

export interface UniqueObject  {
    id : number
}

export interface Category extends UniqueObject{
  name : string
}

export type Teacher = {
  user_id : number,
  course_id : number,
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
  teacher : Teacher[],
  thumbnail_url : string,

}

export type User = {
  id : number,
  username : string,
  email : string,
  role : UserRole,
}

export type CourseStatusInCourse = {
  id : number,
  course_id : number,
  status : CourseStatus,
  description : string
}
