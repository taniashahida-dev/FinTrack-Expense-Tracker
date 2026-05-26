import { ChevronRight } from "lucide-react";


const Hero = () => {
    return (
     
           <div className="space-y-5 w-11/12 md:w-4/12 mt-10 md:mt-32 mx-auto text-center ">
<div className="absolute top-4 -right-5 h-80 w-80 rounded-full bg-[#FAF6E9] z-10"></div>
<div className="absolute bottom-3 left-5 h-50 w-50 rounded-full bg-[#FAF6E9] z-10"></div>

            <h1 className="text-[#40534C] text-3xl md:text-6xl font-bold font-agbalumo">Track your money
<span className="text-[#A0C878]"> smarter,</span> not harder</h1>
<p className="text-[#677D6A] text-lg">Manage income, expenses, and savings from one clean dashboard. Know where every taka goes — effortlessly.</p>


<div className=" flex flex-col md:flex-row gap-3 items-center justify-center">
   <button className="flex gap-1 items-center font-semibold  bg-[#40534C] p-3 px-4 rounded-xl text-[#DDEB9D] hover:bg-[#677D6A] hover:text-[#FFFDF6]">Start tracking -it`s free <span> <ChevronRight /></span>
        </button>
        
        <button className=" text-[#40534C] font-semibold p-3 px-4 rounded-xl bg-[#DDEB9D] hover:text-[#677D6A] hover:bg-[#FFFDF6] hover:border-2 border-[#40534C] ">See how it`s work</button>
</div>
        </div>
     
    );
};

export default Hero;