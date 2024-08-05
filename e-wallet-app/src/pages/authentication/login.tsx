import AuthImg from '../../assets/png/auth_img.png'
import User from '../../assets/svg/user.svg'
import Password from '../../assets/svg/password.svg'
const Login = () => {
  return (
    <div class={`bg-white p-4`}>
        <img class={`mx-auto`} src={AuthImg}></img>
        <h1 class={`text-center font-semibold text-2xl my-5`}>Thông tin đăng nhập</h1>
        <form>
            <div class={`flex focus:shadow-xl px-4 py-3 rounded-3xl border-blue-default border-[2px]`}>
                <img class={`w-7`} src={User}></img>
                <input placeholder={`Nhập email`} class={`pl-2 text-lg w-full border-0 focus:outline-none `}></input>
            </div>
        </form>
    </div>
  )
}

export default Login