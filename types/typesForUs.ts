import { Category, Course, CourseStatus, Lecture, possibleCourseStatus, Quiz, UniqueObject } from "./typesFromBackEnd";

const possiblyCreatedRole = ["TEACHER", "STUDENT"] as const;
export type PossiblyCreatedRole = typeof possiblyCreatedRole[number];

export const possibleCourseAction = ["approve", "reject", "select"] as const;
export type CourseAction = typeof possibleCourseAction[number];

export interface CourseColorAndText {
    color : string,
    text: string,
    textColor : string
}

export const possibleCourseContentElement = ["quiz", "lecture"] as const;

export type CourseContentElementType = typeof possibleCourseContentElement[number];

export interface CourseContentElementProps {
    type : CourseContentElementType,
    title : string,
    runOnEdit : () => void,
    runOnDelete : () => void,
    runOnClick : () => void
    isTeacher : boolean

}

export interface ApprovalButtonProperty {
    color: string;
    onClick: () => void;
    content: JSX.Element | JSX.Element[];
}


export type CourseProps = {
    title : string;
    thumbnail: string;
    description: string;
    useDropdownDescription?: boolean;
    absoluteContent?: JSX.Element;
    centerContent: JSX.Element;
    bottomContent?: JSX.Element;
    goToCoursePage : () => void;
  };
  

  export interface ApprovalButtonFunction {
    runOnReject: () => void;
    runOnApprove: () => void;
    runOnSelect: () => void;
    // runOnDeselect: () => void;
  }

export type CourseForAdminProps =  ApprovalButtonFunction & UniqueObject & {
    title: string;
    teacher: string;
    description: string;
    // Link to the image, not an actual image
    thumbnail: string;
    // The logic for saving what course is selected is left to its parent. It is assumed that the parent will have a state containing an array and the selected props will be given by using array .includes
    selected: boolean;
  };

export type CourseForTeacherProps = UniqueObject & {
    title: string;
    description: string;
    status: CourseStatus;
    peopleEnrolled?: number;
    // Link to the image, not an actual image
    thumbnail: string;
  };


export type CourseForStudentProps = UniqueObject & {
    title: string;
    teacherName: string;
    tags: Category[];
    description: string;
    // Link to the image, not an actual image
    thumbnail: string;
  };
  
  export interface ApprovalButtonsProps extends ApprovalButtonFunction  {
    selected: boolean;
    vertical: boolean;
  };

  export type HeaderProps = {
    showBackButton: boolean;
    showLogoutButton : boolean
  };

  export type TeacherApplicationProps = UniqueObject & ApprovalButtonFunction & {
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

  export type LectureTitlePost = {
    title: string,
    course_id: string
  }

  export type LectureTitlePatch = {
    title: string
  }
  
  export type ResourcePost = {
    name: string,
    type: string,
    url: string,
    lecture_id: any
}

export type QuizPost = {
  title: string,
  course_id: string
}

export type QuizPatch = {
  title: string
}


export type SingleFormType = {
  placeholder: string,
  callback: any,
  id:string,
  defaultValue:any
}

export type QuestionStatement = {
  statement: string,
  quiz_id: string
}

export type OptionType = {
  id: number,
  content: string,
  question_id: string
}

export type QuestionType = {

  id: string,
  statement: string,
  quiz_id: number,
  options: OptionType[]

}

export type UseMeDataStatus = "authorized" | "unauthorized" | "serverError" | "fetching"

export type CoursesProps = {
    // listOfCourse : Course[]  
};

export const possibleSeenCourse = [...possibleCourseStatus, "ALL"] as const;
export type SeenCourse = typeof possibleSeenCourse[number];

export const possibleQuizOrLecture = ["quiz", "lecture"] as const;
export type QuizOrLecture = typeof possibleQuizOrLecture[number];

export type RejectOrApproveInput = {
  id: string;
  isCourse: boolean;
  reject: boolean;
};

export type CollectiveActionButtonProps = Omit<Omit<ApprovalButtonFunction, "runOnSelect">, "runOnDeselect">;

export type OverlayType = "loading" | "error" | "plain";

export type CreateCourseInput = {
  title : string,
  description : string,
  categories : string,
  thumbnail : FileList
}

export type CategoryInput = {
  name : string
}

export type CourseContentProps = {
  fetcherFunction: () => Promise<Lecture[] | Quiz[]>;
  queryName: string;
  type: CourseContentElementType;
  isTeacher: boolean;
  courseID : string;
};

export type CourseContentContainerProps = {
  courseID: string;
  isTeacher?: boolean;
};

export type CourseHeaderProps = {
  courseID: string;
};

export type LoadingScreenProps = {
  displayedText: string;
  overlayType?: OverlayType;
};

export type CourseContentElementInput = {
  title : string;
}

export type CourseNewElementProps = {
  runToAdd: (title: string) => Promise<{ result: any; error: unknown }>;
  runToInvalidate: () => Promise<void>;
  contentType: CourseContentElementType;
  visible: boolean;
};