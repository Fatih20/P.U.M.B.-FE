export interface UniqueObject  {
    id : number
}

export interface Category extends UniqueObject{
  name : string
}

export type Course = UniqueObject & {
  name : string,
  description : string,
  status : string,
  categories : Category[]
}

