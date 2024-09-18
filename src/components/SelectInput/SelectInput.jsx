import React from "react";

function SelectInput(props) {
  return (
    <div className="mb-4">
      <select
        {...props}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>{option.text}</option>
        ))}
      </select>
      {props.error && (
        <p className="text-red-500 text-sm mt-1">{props.errorMessage}</p>
      )}
    </div>
  );
}

export default SelectInput;
