import type { NextPage } from "next";
import CourseAdmin from "../components/CourseAdmin";
import CourseInstructor from "../components/CourseInstructor";
import CourseStudent from "../components/CourseStudent";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TagName from "../components/TagName";

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
      <CourseStudent
        title="Test"
        thumbnail="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
        tag="lkvmfv"
        instructorName="lkvfkdlv"
        shortenedDescription="l;fmdklvmfdklkcmsdfdsmlkvdmskkmlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmlvmsdklvdsmklvmkll"
      />
      <CourseInstructor
        title="Test"
        thumbnail="https://www.manorhousestables.co.uk/wp-content/uploads/2015/03/placeholder_image_1000.jpg"
        shortenedDescription="l;fmdklvmfdklkcmsdfdsmlkvdmskkmlmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmlvmsdklvdsmklvmkll"
        status="verified"
        peopleEnrolled={56}
      />
      <CourseAdmin
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
    </div>
  );
};

export default Home;
