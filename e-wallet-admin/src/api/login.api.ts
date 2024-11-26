import axiosInstance from "./axiosInstance";

export async function loginAdmin({email,password}: {email:string,password:string}) {
    const response = await axiosInstance.post('/api/v1/admin/auth/sign-in',{
        email: email,
        password: password
    })
    return response.data
}