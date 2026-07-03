'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({ href, children }) => {
    const path = usePathname();
    const isActive = href === path;
    
    return (
        <div>
            <Link 
                href={href} 
                className={`text-base font-medium transition-colors ${
                    isActive 
                    ? "text-[#6366F1] dark:text-white font-semibold"  // একটিভ অবস্থায় লাইটে পার্পল, ডার্কে সাদা
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" // নরমাল অবস্থা
                }`}
            >
               <span>{children}</span>
            </Link>
        </div>
    );
};

export default Navlink;