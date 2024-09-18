import React from "react";

function TextInput(props) {
  return (
    <div className="mb-4">
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      />
      {props.error && (
        <p className="text-red-500 text-sm mt-1">{props.errormessage}</p>
      )}
    </div>
  );
}

export default TextInput;
