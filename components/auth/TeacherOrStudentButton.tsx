import { PossiblyCreatedRole } from "@/appTypes/typesForUs";

interface TeacherOrStudentButtonProps {
  role: PossiblyCreatedRole;
  setRole: (a: PossiblyCreatedRole) => void;
}

export default function TeacherOrStudentButton({
  role,
  setRole,
}: TeacherOrStudentButtonProps) {
  return (
    <div className='flex space-x-4'>
      <div className='relative basis-1/2 w-full'>
        <button
          onClick={() => setRole("TEACHER")}
          className='border-2 rounded-lg overflow-hidden'
        >
          <img src='https://static.vecteezy.com/system/resources/previews/003/241/285/original/business-instructor-and-tutor-vector.jpg' />
          <h1>Teacher</h1>
          <img
            className={`absolute ${role === "TEACHER" ? "" : "hidden"}`}
            style={{ bottom: "-7px", right: "-6px", height: 40 }}
            src='https://cdn-icons-png.flaticon.com/512/190/190411.png'
          />
        </button>
      </div>
      <div className='relative basis-1/2 w-full'>
        <button
          onClick={() => setRole("STUDENT")}
          className='border-2 rounded-lg overflow-hidden'
        >
          <img src='https://cdn.pixabay.com/photo/2019/05/21/22/21/boy-4220282__340.png' />
          <h1>Student</h1>
          <img
            className={`absolute ${role === "STUDENT" ? "" : "hidden"}`}
            style={{ bottom: "-7px", right: "-6px", height: 40 }}
            src='https://cdn-icons-png.flaticon.com/512/190/190411.png'
          />
        </button>
      </div>
    </div>
  );
}
