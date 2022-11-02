import React from "react"

const FormControlErrorMessage = ({ text = null, children, ...otherProps }) => {
  if (!text) return null
  return (
    <span className="text-red-500 text-sm" {...otherProps}>
      {text ? text : children}
    </span>
  )
}

export default FormControlErrorMessage
