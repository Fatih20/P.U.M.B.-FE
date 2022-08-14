interface InstructorOrStudentButtonProps {
  role: string;
  setRole: (a: string) => void;
}

export default function InstructorOrStudentButton({
  role,
  setRole,
}: InstructorOrStudentButtonProps) {
  const setRoleValue = (value: string) => {
    setRole(value);
  };

  // Manage Green Check Visibility
  let instructorCheckClass = "absolute";
  let studentrCheckClass = "absolute";

  if (role != "INSTRUCTOR") {
    instructorCheckClass = "absolute hidden";
  } else {
    studentrCheckClass = "absolute hidden";
  }

  return (
    <div className="flex space-x-4">
      <div className="relative basis-1/2 w-full">
        <button
          onClick={() => setRoleValue("TEACHER")}
          className="border-2 rounded-lg overflow-hidden"
        >
          <img src="https://static.vecteezy.com/system/resources/previews/003/241/285/original/business-instructor-and-tutor-vector.jpg" />
          <h1>Instructor</h1>
          <img
            className={instructorCheckClass}
            style={{ bottom: "-7px", right: "-6px", height: 40 }}
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          />
        </button>
      </div>
      <div className="relative basis-1/2 w-full">
        <button
          onClick={() => setRoleValue("STUDENT")}
          className="border-2 rounded-lg overflow-hidden"
        >
          <img src="https://cdn.pixabay.com/photo/2019/05/21/22/21/boy-4220282__340.png" />
          <h1>Student</h1>
          <img
            className={studentrCheckClass}
            style={{ bottom: "-7px", right: "-6px", height: 40 }}
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
          />
        </button>
      </div>
    </div>
  );
}
