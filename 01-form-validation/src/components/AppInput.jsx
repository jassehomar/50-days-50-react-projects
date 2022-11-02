import React from "react"

export const AppInput = ({
  className,
  hasError,
  isValid,
  type = "text",
  ...otherProps
}) => {
  return (
    <input
      type={type}
      className={`block w-full rounded mt-1 py-2 px-3 border-2  placeholder:font-light focus:border focus:outline-none focus:ring-gray-600 focus:border-gray-600 active:border-gray-600  placeholder:text-gray-400 ${
        hasError
          ? "border-red-500"
          : isValid
          ? "border-green-500"
          : "border-gray-200"
      } ${className}`}
      {...otherProps}
    />
  )
}
