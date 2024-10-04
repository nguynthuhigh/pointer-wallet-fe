// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { GoDotFill } from "react-icons/go";
// import AvatarDefault from '../../../assets/png/Avatar.png';
// import { formatDate } from "../transaction/TransactionHistory";

// export function TableComponents(data:[]) {
//         <Table>
//           <TableHeader className="uppercase" >
//               <TableRow>
//                   <TableHead className="text-[#1A3E5F] font-bold">No.</TableHead>
//                   <TableHead className="text-[#1A3E5F] font-bold">Photo</TableHead>
//                   <TableHead className="text-[#1A3E5F] font-bold ">Name</TableHead>
//                   <TableHead className="text-[#1A3E5F] font-bold">Email</TableHead>
//                   <TableHead className="text-[#1A3E5F] font-bold">Join Date</TableHead>
//                   <TableHead className="text-[#1A3E5F] font-bold">Status</TableHead>
//                   <TableHead className="text-[#1A3E5F] font-bold">Action</TableHead>
//               </TableRow>
//           </TableHeader>
//         </Table>
//   return (
//     <>
//         <Table>
//           <TableBody>
//             {data.map((items,index:number) => (
//                 <TableRow key={index}>
//                     <TableCell className="font-bold"></TableCell>
//                     <TableCell className="font-medium">{items.image
//                      ? <img src = {AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover"/>   
//                      : <img src = {AvatarDefault} className="rounded-full h-[40px] w-[40px] object-cover"/>}</TableCell>
//                     <TableCell>{(items)}</TableCell>
//                     <TableCell>{items.email}</TableCell>
//                     <TableCell> {formatDate(items.createdAt)}</TableCell>
//                     <TableCell className={`w-fit ${!items.inactive ? 'text-[#027A48] bg-[#ECFDF3]' : 'bg-[#FFE3E3] text-[#FF1717]'} h-[30px] mt-4 px-[8px] rounded-[16px] flex items-center`}
//                     >   <GoDotFill className="ml-[6px] mr-[4px]" />
//                             <div className="mr-[8px] font-bold">
//                                 {!items.inactive ? 'Active' : 'Inactive'}
//                             </div>
//                     </TableCell>
//                     <TableCell key={items._id} onClick={() => handleClickDetail(items,getID(index),getNameID(items))} className="text-[#0094FF] font-bold hover:transition-all hover:-translate-y-2 duration-300 cursor-pointer">View Profile</TableCell>
//                 </TableRow>
//                 ))}
//             </TableBody>
//             <TableFooter>
//                   <TableRow>
                            
//                   </TableRow>
//             </TableFooter>
//         </Table>

//     </>
    
//   )
// }