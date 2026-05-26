
import { CircleUser, HopOff ,LayoutDashboard,
  Wallet,
  Receipt,House
 } from "lucide-react";
import Navlink from "./Navlink";
import { Button } from "@heroui/react";
import Link from "next/link";

const Navbar = ()=> {

    const links = [ {
    title: "Home",
    href: "/",
    icon: House,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: Wallet,
  }, {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Budget",
    href: "/budget",
    icon: Receipt,
  },
 ]

  return (
    <nav className=" border-b bg-[#FAF6E9]  ">

   <div className="flex items-center justify-between h-16 w-10/11 mx-auto">
   {/* logo */}
     <Link href={'/'} className="flex gap-1 items-center">
        <span className="bg-[#A0C878] p-3 rounded-xl text-xl font-bold text-white "> <HopOff /></span>
      <h1 className="font-bold text-3xl font-agbalumo">Finora</h1>
    </Link>


<div className="flex gap-5 items-center">
{
    links.map(link=>  <Navlink key={link.href} href={link.href} >{link.title}</Navlink>)
}
</div>


<Link href={'/login'}>
<Button className=" bg-[#40534C] p-3 px-5 rounded-xl text-[#DDEB9D] hover:bg-[#677D6A] hover:text-[#FFFDF6]">Login</Button></Link>
   </div>

    </nav>
  )
};

export default Navbar;