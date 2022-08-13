import type { NextPage } from "next";
import CourseForAdmin from "../components/CourseExternal/CourseForAdmin";
import CourseForStudent from "../components/CourseExternal/CourseForStudent";
import CourseForInstructor from "../components/CourseExternal/CourseForInstructor";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TagName from "../components/TagName";
import InstructorApplication from "../components/InstructorApplication";
import BaseLayout from "../layout/BaseLayout";

const Home: NextPage = () => {
  return (
    <BaseLayout showBackButton={false}>
      <div className="flex justify-start items-center flex-col w-full">
        <TagName
          name="Bruhflkvmvmck"
          runOnClick={() => {
            return;
          }}
        />
        <CourseForStudent
          id={5}
          name="Test"
          thumbnail="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
          tags={[{ name: "lkvmfv", id: 5 }]}
          instructorName="lkvfkdlv"
          description="l;fmdklvmfdklkcmsdfdsmlkvdmskkmlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmlvmsdklvdsmklvmkll"
        />
        <CourseForInstructor
          id={5}
          name="Test"
          thumbnail="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
          description="l;fmdklvmfdklkcmsdfdsmlkvdmskkmlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmlvmsdklvdsmklvmkll"
          status="verified"
          peopleEnrolled={56}
        />
        <CourseForAdmin
          id={5}
          name="Test"
          thumbnail="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
          description="l;fmdklvmfdklkcmsdfdsmlkvdmskkmlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmlvmsdklvdsmklvmkll"
          instructor="lkmvkd"
          selected={true}
          runOnApprove={() => {
            return;
          }}
          runOnReject={() => {
            return;
          }}
          runOnDeselect={() => {
            return;
          }}
          runOnSelect={() => {
            return;
          }}
        />
        <InstructorApplication
          id={5}
          username="Test"
          email="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
          selected={true}
          runOnApprove={() => {
            return;
          }}
          runOnReject={() => {
            return;
          }}
          runOnDeselect={() => {
            return;
          }}
          runOnSelect={() => {
            return;
          }}
        />
      </div>
    </BaseLayout>
  );
};

export default Home;
