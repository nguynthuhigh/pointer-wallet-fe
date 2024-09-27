import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  type PartnersProps = {
    _id: string,
    name: string
    image?: string | null
    email: string,
    inactive: false | true;
    createdAt: string,
    updatedAt?: string,
    description:string,
  }


  const Partners = [
    {
       _id: "66beebd954439b23cd987c9f",
       name: "Nguyen-Quan",
       image: null,
       email: "nguyenminhquan042004@gmail.com",
       inactive: false,
       createdAt: "2024-08-16T06:04:09.552Z",
       updatedAt: "2024-08-16T06:04:29.530Z",
       description: "check attacker",
    },
    {
        _id: "66beebd954439b23cd987c9f",
        name: "Nguyen-Quan",
        image: null,
        email: "nguyenminhquan042004@gmail.com",
        inactive: false,
        createdAt: "2024-08-16T06:04:09.552Z",
        updatedAt: "2024-08-16T06:04:29.530Z",
        description: "check attacker",
     },{
        _id: "66beebd954439b23cd987c9f",
        name: "Nguyen-Quan",
        image: null,
        email: "nguyenminhquan042004@gmail.com",
        inactive: false,
        createdAt: "2024-08-16T06:04:09.552Z",
        updatedAt: "2024-08-16T06:04:29.530Z",
        description: "check attacker",
     },{
        _id: "66beebd954439b23cd987c9f",
        name: "Nguyen-Quan",
        image: null,
        email: "nguyenminhquan042004@gmail.com",
        inactive: false,
        createdAt: "2024-08-16T06:04:09.552Z",
        updatedAt: "2024-08-16T06:04:29.530Z",
        description: "check attacker",
     },{
        _id: "66beebd954439b23cd987c9f",
        name: "Nguyen-Quan",
        image: null,
        email: "nguyenminhquan042004@gmail.com",
        inactive: false,
        createdAt: "2024-08-16T06:04:09.552Z",
        updatedAt: "2024-08-16T06:04:29.530Z",
        description: "check attacker",
     },
  ]
  
  export function TableDemo() {
    return (
      <Table>
        <TableHeader className=" uppercase" >
          <TableRow>
            <TableHead className="text-[#0094FF]">Photo</TableHead>
            <TableHead className="text-[#0094FF]">Name</TableHead>
            <TableHead className="text-[#0094FF]">Description</TableHead>
            <TableHead className="text-[#0094FF]">Email</TableHead>
            <TableHead className="text-[#0094FF]">Join Date</TableHead>
            <TableHead className="text-[#0094FF]">Status</TableHead>
            <TableHead className="text-[#0094FF]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Partners.map((partners:PartnersProps,index:number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{partners.image}</TableCell>
              <TableCell>{partners.name}</TableCell>
              <TableCell>{partners.description}</TableCell>
              <TableCell>{partners.email}</TableCell>
              <TableCell>{partners.createdAt}</TableCell>
              <TableCell>{partners.inactive ? 'false' : 'true'}</TableCell>
              <TableCell>View Profile</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
  