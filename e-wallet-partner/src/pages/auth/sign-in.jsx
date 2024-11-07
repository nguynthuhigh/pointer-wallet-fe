import logo from "../../assets/images/logo.png";
import Header from "../../components/header/header_login";
export default function SignIn() {
  return (
    <div>
      <Header></Header>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              <div class="px-6 sm:px-0 max-w-sm">
                <a
                  href="https://sso-pointer.vercel.app/authorize?clientId=672ce91373c676c1a7516090"
                  type="button"
                  class=" w-full border-[2px] border-[#4285F4]  text-lg text-[#4285F4]  focus:ring-4 focus:outline-none  font-medium rounded-lg  px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                >
                  <img
                    alt="pointer logo"
                    className={
                      "mr-2 -ml-1 w-6 h-6 border-white  border rounded-full"
                    }
                    src="https://i.imgur.com/5cYzRrm.png"
                  />
                  Sign in with Pointer<div></div>
                </a>
              </div>
            </div>
          </div>
          <img className="ml-10" alt="" src={logo}></img>
        </div>
      </section>
    </div>
  );
}
