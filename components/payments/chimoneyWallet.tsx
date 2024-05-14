"use client";

import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useUserContext } from "@/context/userContext";

const ChimoneyWalletPayment = () => {
    const [receiverChimoneyId, setRecevierChimoneyId] = useState("");

    const [amountValue, setAmountValue] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const { userInfo } = useUserContext();
    const userSubId = userInfo?.userSubId;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("api/payments", {
                method: "POST",
                headers: {
                    "contentType": "application/json"
                },
                body: JSON.stringify({
                    receiverChimoneyId,
                    amount: amountValue,
                    userSubId,
                    action: "toWallet"
                })
            });
            setRecevierChimoneyId("");
            setAmountValue(0);
            if (res.ok) {
                console.log(res);
                toast.success("payment sent successfully");
                setLoading(false);
            } else {
                const errorData = await res.json();
                toast.error(errorData.message);
                console.log(errorData);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <div className="h-full w-full bg-[#FAF9F9]">
            <div className="rounded-md p-4 shadow">
                <h1 className="text-lg font-semibold">Make Payment</h1>
                <p className="text-sm font-medium">To anyone, anywhere, securely</p>
                <div className="flex items-center justify-center text-sm border mt-4 px-2 py-1 rounded-3xl bg-[#E7E5E4]">
                    <button className="font-medium px-4 py-2 rounded-3xl w-1/2 text-center bg-[#dbdbda]">To Chimoney wallet</button>
                </div>
                <form className="flex flex-col mt-6 h-fit text-sm" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="receiverChimoneyId">Receiver&apos;s Chimoney Id</label>
                        <input
                            type="text"
                            id="receiverChimoneyId"
                            value={receiverChimoneyId}
                            onChange={(e) => setRecevierChimoneyId(e.target.value)}
                            className="w-full border rounded-xl h-8 px-2 outline-[#8ad9a7]"
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mt-3">
                        <label htmlFor="amount">$Amount</label>
                        <input
                            type="number"
                            id="amount"
                            value={amountValue}
                            onChange={(e) => setAmountValue(parseFloat(e.target.value))}
                            className="w-full border rounded-xl h-8 px-2 outline-[#8ad9a7]"
                        />
                    </div>
                    <button className="w-full border mt-8 rounded-xl bg-[#E7E5E4] hover:bg-[#d6d5d4] h-10" type="submit" disabled={loading}>
                        {loading ? (
                            <div className="w-full flex justify-center">
                                <Loader className="animate-spin" />
                            </div>
                        ) : (
                            <p>Send money</p>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
};

export default ChimoneyWalletPayment;
