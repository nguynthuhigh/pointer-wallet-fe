import { useState,useEffect } from "react"
import partnerAPI from '../../api/partner.api'
import { useNavigate } from "react-router-dom"
import Header from '../header/header_login'
export default function UpdateProFile(){
    const navigate = useNavigate()
    const [infoUser,setInfoUser] = useState({ name: '', description: '' });
    const [errorResponse, setErrorResponse] = useState({email:null,password:null})
    const [partner, setPartner] = useState('')
    useEffect(() => {
        const fetchData = async () => {
          try {
            const partnerProfile = await partnerAPI.getProfilePartner();
            setPartner(partnerProfile.data.data);
            if(partnerProfile.data.data.partner?.name !== undefined){
                navigate('/update-profile')
            }
          } catch (error) {
            console.log(error)
            navigate('/sign-in')
          }
        };
        fetchData(); 
      },[]);
    const handleChange = (e) => {
        setInfoUser({
          ...infoUser,
          [e.target.name]: e.target.value,
        });
        setErrorResponse({password:null,email:null})
      };
    const handleUpdateProfile =async (e)=>{
        e.preventDefault();
        try {
            console.log(infoUser)
            const response =await partnerAPI.updateProfilePartner(infoUser)
            console.log(response)
            if(response.status === 200){
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return( <>
        <Header/>
    <section class='bg-gray-50 dark:bg-gray-900'>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Cập nhật thông tin 
                    </h1>
                    <form class="space-y-1 md:space-y-3" onSubmit={handleUpdateProfile}>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input disabled value={partner.partner?.email}
                                 onChange={handleChange} type="email" name="email" id="email" className={!errorResponse.email ? 'bg-gray-50 border border-black text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ':
                                    'bg-gray-50 border border-red-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                                 } placeholder="name@company.com" required=""/>
                            <p className='text-[12px] text-red-500'>{errorResponse.email}</p>

                        </div>
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên doanh nghiệp</label>
                            <input value={infoUser.password}
                                 onChange={handleChange} type="text" name="name" id="name" placeholder="example: pressPay Company" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div className='mt-0'>
                            <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả ngắn về doanh nghiệp của bạn</label>
                            <input value={infoUser.confirm_password}
                                 onChange={handleChange} type="text" name="description" id="description" placeholder="example: we are the best" className={!errorResponse.password ? 'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                                 : "bg-gray-50 border border-red-500 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} required=""/>
                        <p className='text-[12px] text-red-500'>{errorResponse.password}</p>
                        <div class="flex items-center justify-center w-full">
                            <label for="dropzone-file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logo của doanh nghiệp</label>
                            <label for="dropzone-file" class="flex mt-2 flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" />
                            </label>
                        </div> 
                        </div>
                        <button  type="submit" class="w-full text-white bg-color-default hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Cập nhật</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
        </>)
}