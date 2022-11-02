import React from "react"

const SuccessAlert = ({ className }) => {
  return (
    <div className={`rounded-md bg-green-50 p-4 ${className}`}>
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">
            Congrats! You have been successfully registered.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SuccessAlert
