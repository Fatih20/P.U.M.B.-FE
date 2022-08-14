import { Category, Course, CourseStatus, possibleCourseStatus, UniqueObject } from "./typesFromBackEnd";

export const possibleCourseAction = ["approve", "reject", "select"] as const;
export type CourseAction = typeof possibleCourseAction[number];

export interface CourseColorAndText {
    color : string,
    text: string
}

export const possibleCourseContentElement = ["quiz", "lecture"] as const;

export type CourseContentElementType = typeof possibleCourseContentElement[number];

export interface CourseContentElementProps {
    type : CourseContentElementType,
    title : string,
    runOnEdit : () => void,
    runOnDelete : () => void

}

export interface ApprovalButtonProperty {
    color: string;
    onClick: () => void;
    content: JSX.Element | JSX.Element[];
}


export type CourseProps = {
    id : number
    title : string;
    thumbnail: string;
    description: string;
    useDropdownDescription?: Boolean;
    absoluteContent?: JSX.Element;
    centerContent: JSX.Element;
    bottomContent?: JSX.Element;
  };
  

  export interface ApprovalButtonFunction {
    runOnReject: () => void;
    runOnApprove: () => void;
    runOnSelect: () => void;
    runOnDeselect: () => void;
  }

export type CourseForAdminProps =  ApprovalButtonFunction & UniqueObject & {
    title: string;
    instructor: string;
    description: string;
    // Link to the image, not an actual image
    thumbnail: string;
    // The logic for saving what course is selected is left to its parent. It is assumed that the parent will have a state containing an array and the selected props will be given by using array .includes
    selected: Boolean;
  };

export type CourseForInstructorProps = UniqueObject & {
    title: string;
    description: string;
    status: CourseStatus;
    peopleEnrolled?: number;
    // Link to the image, not an actual image
    thumbnail: string;
  };


export type CourseForStudentProps = UniqueObject & {
    title: string;
    instructorName: string;
    tags: Category[];
    description: string;
    // Link to the image, not an actual image
    thumbnail: string;
  };
  
  export interface ApprovalButtonsProps extends ApprovalButtonFunction  {
    selected: Boolean;
    vertical: Boolean;
  };

  export type HeaderProps = {
    showBackButton: Boolean;
    showLogoutButton : Boolean
  };

  export type InstructorApplicationProps = UniqueObject & ApprovalButtonFunction & {
    username : string;
    email : string;
    selected : boolean;
  }

export type SearchBarProps = {
    value: string;
    setValue: (newValue: string) => void;
    runOnSearch: (searchedValue: string) => void;
  };
  
  export type TagProps = {
    name: string;
    // It is assumed that the function triggered here has the tagName built-in
    runOnClick: () => void;
  };

  export type LoginInputs = {
    username: string;
    password: string;
  };

  export type RegisterInputs = {
    role: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
  };

export type UseMeDataStatus = "authorized" | "unauthorized" | "serverError" | "fetching"

export type CoursesProps = {
    listOfCourse : Course[]  
};

export const possibleSeenCourse = [...possibleCourseStatus, "ALL"] as const;
export type SeenCourse = typeof possibleSeenCourse[number];