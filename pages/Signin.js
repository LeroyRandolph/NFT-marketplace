import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Signin = () => {
  const style = {
    background: `bg-gradient-to-br from-[#42275a] to-[#734b6d] min-h-screen`,
    title: `text-white text-4xl font-uber font-bold pb-5`,
    wrapper: `flex flex-col items-center justify-center min-h-screen`,
    infoContainer: `w-full max-w-xs md:max-w-lg`,
    form: `mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md`,
  }
  return (
    <>
      <Header />
      <div className={style.background}>
        <div className={style.wrapper}>
          <h2 className={style.title}>Sign in to your account</h2>
          <div class={style.infoContainer}>
            <form class={style.form}>
              <div className='mb-4'>
                <label
                  class="text-md mb-2 block font-bold text-gray-700"
                  for="Username"
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

              <div className='mb-4'>
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
                  placeholder="********"
                />
              </div>

              <div className='mb-6'>
                <label
                  class="text-md mb-2 block font-bold text-gray-700"
                  for="password"
                >
                  One-Time-Password (OTP)
                </label>
                <input
                  class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:border-2 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                  id="otp"
                  type="otp"
                  placeholder="********"
                />
              </div>

              <div class="flex items-center justify-between">
                <button
                  class="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  type="button"
                >
                  Sign In
                </button>
                <div>
                <a
                  className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800 p-2"
                  href="#"
                >
                  Forgot Password?
                </a>
                <a
                  className="inline-block align-baseline text-sm font-bold text-[#7A0BC0] hover:text-[#602f6b]"
                  href="/Register"
                >
                  Register
                </a>
                </div>
                
                
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Signin
