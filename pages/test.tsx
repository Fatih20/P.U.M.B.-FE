import AddDropDownButton from "@/components/Lecture/addDropDownButton";
import axios from "axios";
import { configExternal } from "../utils/api/lecture";
import { useEffect } from "react";

export default function Test() {
  const testButton = () => {};

  useEffect(() => {
    axios
      .get(`/lectures/1`, configExternal())
      .then((data) => {
        console.log(data);
      })
      .catch(console.log);
  });

  return (
    <>
      <div className='min-h-full flex items-center justify-center bg-blue-300 py-12 px-6 md:px-48'>
        <AddDropDownButton />
      </div>
      <button onClick={testButton}>This is test button</button>
    </>
  );
}
