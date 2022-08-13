import type { NextPage } from "next";
import CourseForAdmin from "../components/CourseExternal/CourseForAdmin";
import CourseForStudent from "../components/CourseExternal/CourseForStudent";
import CourseForInstructor from "../components/CourseExternal/CourseForInstructor";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TagName from "../components/TagName";
import InstructorApplication from "../components/InstructorApplication";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-start flex-col w-full">
      <Header />
      {/* <SearchBar /> */}
      <TagName
        tagName="Bruhflkvmvmck"
        runOnClick={() => {
          return;
        }}
      />
      <CourseForStudent
        title="Test"
        thumbnail="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
        tag="lkvmfv"
        instructorName="lkvfkdlv"
        shortenedDescription="l;fmdklvmfdklkcmsdfdsmlkvdmskkmlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmlvmsdklvdsmklvmkll"
      />
      <CourseForInstructor
        title="Test"
        thumbnail="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
        shortenedDescription="l;fmdklvmfdklkcmsdfdsmlkvdmskkmlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmlvmsdklvdsmklvmkll"
        status="verified"
        peopleEnrolled={56}
      />
      <CourseForAdmin
        title="Test"
        thumbnail="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
        shortenedDescription="l;fmdklvmfdklkcmsdfdsmlkvdmskkmlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmlvmsdklvdsmklvmkll"
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
  );
};

export default Home;
