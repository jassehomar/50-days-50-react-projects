import { useState } from "react"
import { AppInput } from "./components/AppInput"
import AppLabel from "./components/AppLabel"
import ErrorMessage from "./components/ErrorMessage"
import SuccessAlert from "./components/SuccessAlert"

function App() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState(null)
  const [formState, setFormState] = useState("idle")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const isValidForm =
    errors &&
    Object.values(errors).some((error) => !error) &&
    Object.values(form).every(Boolean)

  const handleOnChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const validateUsername = (e) => {
    resetErrors("username")

    const input = e.target

    if (isEmpty(input.value)) {
      return setErrors({
        ...errors,
        username: "The Username is required",
      })
    }

    if (lessThan(input.value, 3)) {
      return setErrors({
        ...errors,
        username: "The Username must be at least 3 characters",
      })
    }
  }

  const validateEmail = (e) => {
    resetErrors("email")

    const input = e.target

    if (isEmpty(input.value)) {
      return setErrors({
        ...errors,
        email: "The Email is required",
      })
    }

    if (isInvalidEmail(input.value)) {
      return setErrors({
        ...errors,
        email: "The Email is not valid",
      })
    }
  }

  const validatePassword = (e) => {
    resetErrors("password")
    const input = e.target

    if (isEmpty(input.value)) {
      return setErrors({
        ...errors,
        password: "The Password is required",
      })
    }

    if (lessThan(input.value, 6)) {
      return setErrors({
        ...errors,
        password: "The Password must be at least 6 characters",
      })
    }

    if (
      !isEmpty(form.confirmPassword) &&
      areNotEqual(input.value, form.confirmPassword)
    ) {
      return setErrors({
        ...errors,
        confirmPassword: "The Passwords do not match",
      })
    }
  }

  const validateConfirmPassword = (e) => {
    resetErrors("confirmPassword")

    const input = e.target

    if (isEmpty(input.value)) {
      return setErrors({
        ...errors,
        confirmPassword: "The Confirm Password is required",
      })
    }

    if (areNotEqual(input.value, form.password)) {
      return setErrors({
        ...errors,
        confirmPassword: "The Passwords do not match",
      })
    }
  }

  const isEmpty = (value) => {
    return !value.trim().length
  }

  const lessThan = (value, min) => {
    return value.trim().length < min
  }

  const isInvalidEmail = (value) => {
    const validEmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return !validEmailReg.test(value.trim())
  }

  const areNotEqual = (value1, value2) => {
    return value1.trim() !== value2.trim()
  }

  const resetErrors = (field) => {
    if (!field) {
      return setErrors(null)
    }

    setErrors({ ...errors, [field]: null })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormState("processing")

    setTimeout(() => {
      setFormState("success")

      resetForm()

      setShowSuccessAlert(true)

      hideSuccessAlert()
    }, 2000)
  }

  const hideSuccessAlert = () => {
    setTimeout(() => {
      setShowSuccessAlert(false)
    }, 3500)
  }

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    resetErrors()

    setFormState("idle")
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-5 md:px-6 py-6 md:py-8 lg:px-4 lg:py-6">
      <div className="lg:max-w-[30rem] max-w-md mx-auto w-full">
        {showSuccessAlert && <SuccessAlert className="mb-4" />}
        <div className="shadow-lg pt-8 pb-10 px-10 w-full rounded-md bg-white">
          <h2 className="capitalize font-semibold text-2xl text-center text-gray-800">
            Register Your Details
          </h2>

          <form action="#" onSubmit={handleSubmit} className="mt-6">
            <div className="space-y-7">
              <div>
                <AppLabel htmlFor="username">Username</AppLabel>
                <AppInput
                  id="username"
                  placeholder="Enter Username"
                  value={form.username}
                  onChange={handleOnChange}
                  onBlur={validateUsername}
                  hasError={errors?.username}
                  isValid={form.username && !errors?.username}
                />
                <ErrorMessage text={errors?.username} />
              </div>
              <div>
                <AppLabel htmlFor="email">Email</AppLabel>
                <AppInput
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  value={form.email}
                  onChange={handleOnChange}
                  onBlur={validateEmail}
                  hasError={errors?.email}
                  isValid={form.email && !errors?.email}
                />
                <ErrorMessage text={errors?.email} />
              </div>
              <div>
                <AppLabel htmlFor="password">Password</AppLabel>
                <AppInput
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleOnChange}
                  onBlur={validatePassword}
                  hasError={errors?.password}
                  isValid={form.password && !errors?.password}
                />
                <ErrorMessage text={errors?.password} />
              </div>
              <div>
                <AppLabel htmlFor="confirmPassword">Confirm Password</AppLabel>
                <AppInput
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleOnChange}
                  onBlur={validateConfirmPassword}
                  hasError={errors?.confirmPassword}
                  isValid={form.confirmPassword && !errors?.confirmPassword}
                />
                <ErrorMessage text={errors?.confirmPassword} />
              </div>
            </div>

            <div className="mt-12">
              <button
                className={`py-2.5 font-semibold rounded px-4 border-0 text-center bg-sky-600 text-white w-full ${
                  !isValidForm ? "cursor-not-allowed" : ""
                }
                  ${
                    formState == "processing"
                      ? " cursor-not-allowed opacity-50"
                      : ""
                  }`}
                disabled={!isValidForm || formState == "processing"}
                title={!isValidForm ? "Please fill out the form" : ""}
              >
                {formState === "processing" ? "Submiting.." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="mt-8 lg:mt-12 font-normal text-sm text-gray-500 text-center">
        <p>
          Part of{" "}
          <strong className="font-semibold text-gray-600">
            #50Days50ReactProjects
          </strong>
          . Developed by{" "}
          <a href="#" className="text-sky-700 font-semibold">
            Omar Jasseh
          </a>
          {"."}
        </p>

        <p className="mt-4 text-xs font-medium text-gray-600">
          For more content, follow me on{" "}
          <span>
            <a
              href="https://www.facebook.com/jassehomar/"
              target="_blank"
              className="text-sky-500"
            >
              Facebook
            </a>
            ,{" "}
            <a
              href="https://www.linkedin.com/in/jassehomar/"
              target="_blank"
              className="text-sky-500"
            >
              Linkedin
            </a>
            ,{" "}
            <a
              href="https://www.instagram.com/omarjasseh/"
              target="_blank"
              className="text-sky-500"
            >
              Instagram
            </a>
            ,{" "}
            <a
              href="https://twitter.com/jassehomar99"
              target="_blank"
              className="text-sky-500"
            >
              Twitter
            </a>
          </span>
        </p>
      </footer>
    </div>
  )
}

export default App
