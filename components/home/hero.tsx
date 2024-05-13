import Link from "next/link";
import Image from "next/image";
import chimoneyImage from "@/public/chimoneyImage.png";

const Hero = () => {
    return (
        <div className="lg:flex items-start px-8 md:px-12 lg:px-16 mt-8 lg:mt-20">
            <div className="md:mt-8">
                <h1 className="text-5xl font-semibold mx-auto font-rubik">create and manage payments seamlessly</h1>
                <p className="text-md mt-8 leading-6">Go Fast and go far with efficient, pre-configured, secure cross-border payouts & disbursements from a single Platform </p>
                <Link href="/signup">
                    <button
                        className="bg-[#1F2937] mt-4 text-white px-4 py-2 font-medium rounded-2xl text-sm hover:px-5">
                        Get started <span className="pl-2">{'>'}</span>
                    </button>
                </Link>
            </div>
            <div className="w-full h-[16rem] sm:h-[22rem] md:h-[27rem] lg:h-[21rem] mt-12 lg:mt-0">
                <Image src={chimoneyImage} alt="image" width={0} height={0} className="w-full h-full" />
            </div>
        </div>
    );
};

export default Hero;
