'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


const Navlink = ({href,children}) => {
    const path = usePathname()
    const isActive = href == path
    return (
        <div>
            <Link href={href} className={`${isActive && "bg-[#A0C878] p-2 px-4 rounded-2xl text-white font-bold"}  text-[#A0C878] text-lg`}>
           
           <span>
             {children}
           </span>
            </Link>
        </div>
    );
};

export default Navlink;