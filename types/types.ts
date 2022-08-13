export type CourseStatus = "verified" | "rejected" | "waiting"

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
  