import React from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchBarProps } from "@/appTypes/typesForUs";

const SearchBar = ({ value, setValue, runOnSearch }: SearchBarProps) => {
  return (
    <div className='flex justify-center items-center rounded-2xl p-3 bg-gray-600 gap-2'>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type='text'
        className='outline-0 bg-transparent'
        placeholder='Search Course...'
      />
      <button
        onClick={() => {
          runOnSearch(value);
        }}
      ></button>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </div>
  );
};

export default SearchBar;
