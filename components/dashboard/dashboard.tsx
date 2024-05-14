"use client";

import Chart from "@/components/barchart/bar-chart";
import SendMoney from "@/components/payments/sendmoney";
import AboutChimoney from "@/components/dashboard/aboutChimoney";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import Transactions from "../transactions/transactions";

const Dashboard = () => {
    const [wallet, setWallet] = useState<any[]>([]);

    const { userInfo } = useUserContext();
    console.log(userInfo?.userSubId)

    useEffect(() => {
        const getWallet = async () => {
            try {
                const res = await fetch("/api/account", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        userSubId: userInfo?.userSubId,
                        action: "walletBalance"
                    })
                })
                const data = await res.json();
                setWallet(data.message.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (userInfo?.userSubId) {
            getWallet();
        }
    }, [userInfo]);

    console.log(wallet);

    return (
        <div className="pt-6 px-4 sm:px-8 flex items-start h-full overflow-y-auto">
            {/* first div */}
            <div className="flex flex-col w-full xl:w-4/6 xl:pr-6">
                <div className="flex items-center">
                    <div className="text-xl mr-2">👋</div>
                    <h1 className="text-[#FFA14E] font-semibold">Hey {userInfo?.username}!</h1>
                </div>
                <p className="text-xs font- mt-2">Chimoney Id {userInfo?.userSubId}</p>
                <h1 className="font-bold text-xl mt-2">You have a balance of ${wallet.length && wallet[0]?.balance}</h1>
                <div className="mt-8 pr-3 py-4 border rounded-md shadow">
                    <Chart />
                </div>
                <p className="text-[11px] font-semibold text-center">This is just a mock chart</p>
                <div className="mt-8 w-full xl:hidden flex flex-col items-center space-y-8 sm:space-y-0 sm:flex sm:flex-row sm:items-start justify-around">
                    <div className="w-full sm:w-3/6">
                        <SendMoney />
                    </div>
                    <div className="w-full sm:w-2/6 h-full">
                        <AboutChimoney />
                    </div>
                </div>
                <div className="mt-10 pb-6">
                    <h1 className="font-semibold mb-2">Recent Transactions</h1>
                    <Transactions maxTransactions={3} />
                </div>
            </div>

            {/* second div */}
            <div className="hidden xl:flex w-2/6 flex-col space-y-10 ">
                <SendMoney />
                <AboutChimoney />
            </div>
        </div>
    );
};

export default Dashboard;
