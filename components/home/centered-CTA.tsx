import Image from "next/image";
import microsoftImage from "@/public/microsoft.svg";
import devNationImage from "@/public/DevNation.svg";
import honeyCoin from "@/public/honeycoin.svg";

const CenteredCTA = () => {
    return (
        <div className="px-[10%] mt-16 md:mt-28 lg:mt-40 flex items-center justify-center w-full space-x-8">
            <h1 className="font-semibold text-xs md:text-sm">Trusted by |</h1>
            <div className="flex space-x-8">
                <div className="w-10 h-10 sm:w-16 sm:h-16">
                    <Image src={microsoftImage} alt="microsoft" width={0} height={0} className="w-full h-full" />
                </div>
                <div className="w-10 h-10 sm:w-16 sm:h-16">
                    <Image src={honeyCoin} alt="devnation" width={0} height={0} className="w-full h-full" />
                </div>
                <div className="w-10 h-10 sm:w-16 sm:h-16">
                    <Image src={devNationImage} alt="devnation" width={0} height={0} className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default CenteredCTA;
