import Link from "next/link";

const AboutChimoney = () => {
    return (
        <div className="h-full w-full bg-[#FAF9F9]">
            <div className="rounded-md p-4 shadow">
                <div className="flex items-center space-x-1 text-xs mb-2">
                    <p className="">Make payment to a user&apos;s wallet</p>
                    <Link href="/payments">
                        <button className="font-bold underline">here</button>
                    </Link>
                </div>
                <h3 className="text-sm">Do you know that Chimoney is a fast rising fintech?</h3>
                <p className="text-xs mt-2">with Chimoney, you can make payments with ease and make more value.</p>
                <p className="text-xs mt-2">Chimoney is trusted by companies such as <span className="font-bold">Microsoft</span>, <span className="font-bold">honeyCoin</span>, and <span className="font-bold">Developers nation</span></p>
                <div className="flex text-xs mt-4">
                    <p>Register with Chimoney</p>
                    <Link href="https://chimoney.com" target="_blank">
                        <p className="ml-1 text-blue-800 underline font-bold">here</p>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default AboutChimoney;
