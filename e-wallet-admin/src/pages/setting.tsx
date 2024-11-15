import { HeaderComponent } from "@/components/header/header"
import { User } from "lucide-react"
import AdminAvatar from '../assets/png/Admin.jpg'
export const Setting = () => {
    return (
        <>
            <div className="flex-1">
                <HeaderComponent title="Setting" />
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <div className="bg-gray-800 backdrop-opacity-70 backdrop-blur-md px-5 py-6 rounded-[6px] ">
                        <div className="flex flex-col space-y-[20px]">
                            <div className="flex space-x-[10px]">
                                <User className="text-blue-500"/>
                                <p className="font-bold text-lg">Profile</p>
                            </div>
                            <div className="flex items-center space-x-[10px]">
                                <img src={AdminAvatar} className="rounded-full size-[70px]" />
                                <div>
                                    <p className="font-bold">Super Admin</p>
                                    <p className="text-blue-500">adminwallet@gmail.com</p>
                                </div>
                            </div>
                            <div className="bg-blue-500 text-white w-fit px-5 py-2 rounded-[6px] font-bold">
                                <button>Edit Profile</button>
                            </div>
                            <div className="bg-red-500 text-white w-fit px-5 py-2 rounded-[6px] font-bold">
                                <button>Logout</button>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </>
    )
}