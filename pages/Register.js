import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { check } from 'prettier'
import { createHashPassword, isPasswordCorrect } from './query/handleHash'
import toast, { Toaster } from 'react-hot-toast'

let g_setData, g_setAllUser

const registerUser = async (e) => {
  e.preventDefault()
  const errors = await validate(
    e.target.email.value,
    e.target.username.value,
    e.target.password.value
  )
  if (Object.keys(errors).length === 0) {
    const hashPassword = createHashPassword(64, 10000, 64, 'sha512')
    const hashedPassword = await hashPassword('abc')
    const value =
      e.target.username.value +
      ', ' +
      e.target.email.value +
      ', ' +
      hashedPassword.salt +
      ', ' +
      hashedPassword.hash +
      ', ' +
      hashedPassword.finalHash +
      ', 0'
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'InsertData',
        Table: 'TABLE_USER',
        Columns: 'username, email, SALT, SH, HMAC, Balance',
        Conditions: null,
        Values: value,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        g_setData(data)
      })
    toast.success('Register successfully!')
  } else {
    if (errors.email) toast.error(errors.email)
    if (errors.username) toast.error(errors.username)
    if (errors.password) toast.error(errors.password)
    if (errors.duplicate) toast.error(errors.duplicate)
  }
}

const validate = async (email, username, password) => {
  const condition = "username = '" + username + "'"
  const errors = {}
  var obj
  async function fetchData() {
    await fetch('https://comp3334pj.dsgshk.com/API/function.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Process: 'GetData',
        Table: 'TABLE_USER',
        Columns: 'username',
        Conditions: condition,
        Values: null,
        Orderby: null,
        Ordersort: null,
        Extra: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => (obj = data))
      .then(() => console.log(obj))
  }

  if (!email) {
    errors.email = 'Email is required'
  } else {
    if (!email.includes('@')) {
      errors.email = 'Wrong email format'
    }
  }
  if (!username) {
    errors.username = 'Username is required'
  }
  if (!password) {
    errors.password = 'Password is required'
  }

  await fetchData()

  if (obj.Message == 'Record(s) found') {
    errors.duplicate = 'Username already exists'
  }

  return errors
}

const Register = () => {
  const style = {
    background: `bg-gradient-to-br from-[#42275a] to-[#734b6d] min-h-screen`,
    title: `text-white text-4xl font-uber font-bold pb-5`,
    wrapper: `flex flex-col items-center justify-center min-h-screen`,
    infoContainer: `w-full max-w-xs md:max-w-lg`,
    form: `mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md`,
    usernameContainer: `mb-4`,
    passwordContainer: `mb-6`,
  }

  const [data, setData] = useState()
  const [allusers, setAllUsers] = useState()
  useEffect(async () => {
    g_setData = setData
    g_setAllUser = setAllUsers
  }, [])

  if (
    data &&
    data.Message == 'The New Record has been insert to marketplaceuser'
  ) {
    return (
      <>
        <Header />

        <div className={style.background}>
          <div className={style.wrapper}>
            <h2 className={style.title}>Register Successful !</h2>
            <a className="text-indigo-500 underline" href="./Signin">
              Sign in
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <Toaster />
      <div className={style.background}>
        <div className={style.wrapper}>
          <h2 className={style.title}>Register your account here</h2>
          <div class={style.infoContainer}>
            <form class={style.form} onSubmit={registerUser}>
              <div class={style.usernameContainer}>
                <label
                  class="text-md mb-2 block font-bold text-gray-700"
                  for="email"
                >
                  Email Address
                </label>
                <input
                  class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-2 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                  id="email"
                  type="text"
                  placeholder="xxx@xxxxxxx"
                />
              </div>

              <div class={style.usernameContainer}>
                <label
                  class="text-md mb-2 block font-bold text-gray-700"
                  for="username"
                >
                  Username
                </label>
                <input
                  class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-2 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>

              <div class={style.passwordContainer}>
                <label
                  class="text-md mb-2 block font-bold text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-2 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                  id="password"
                  type="password"
                  placeholder="************"
                />
                {/* <p class="text-xs italic text-red-500">
                  Please choose a password.
                </p> */}
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register
