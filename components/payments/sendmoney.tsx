"use client";

import { type FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useUserContext } from "@/context/userContext";

const SendMoney = () => {
    const [toEmail, setToEmail] = useState(true);

    const [emailValue, setEmailValue] = useState("");
    const [phonenumberValue, setPhoneNumberValue] = useState("");
    const [amountValue, setAmountValue] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const { userInfo } = useUserContext();
    const userSubId = userInfo?.userSubId;

    const handleToEmail = () => setToEmail(true);
    const handleToPhoneNumber = () => setToEmail(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let bodyData: any = {};

        if (toEmail) {
            if (!emailValue || !amountValue) {
                toast.error("Input an email and amount to send money");
                return;
            }
            bodyData = {
                email: emailValue,
                amount: amountValue,
                userSubId,
                action: "toEmail"
            };
        } else {
            if (!phonenumberValue || !amountValue) {
                toast.error("Input a Phone no and amount to send money");
                return;
            }
            bodyData = {
                phone: phonenumberValue,
                amount: amountValue,
                userSubId,
                action: "toPhone"
            };
        };

        try {
            setLoading(true);
            const res = await fetch("api/payments", {
                method: "POST",
                headers: {
                    "contentType": "application/json"
                },
                body: JSON.stringify(bodyData)
            });
            setEmailValue("");
            setPhoneNumberValue("");
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
                <div className="flex items-center text-sm border mt-4 px-2 py-1 rounded-3xl bg-[#E7E5E4]">
                    <button className={`font-medium px-4 py-2 rounded-3xl w-1/2 text-center ${toEmail && "bg-[#dbdbda]"}`} onClick={handleToEmail}>To email</button>
                    <button className={`font-medium px-4 py-2 rounded-3xl w-1/2 text-center ${!toEmail && "bg-[#dbdbda]"}`} onClick={handleToPhoneNumber}>To Phone</button>
                </div>
                <form className="flex flex-col mt-6 h-fit text-sm" onSubmit={handleSubmit}>
                    {toEmail ? (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email">Email of receiver</label>
                            <input
                                type="email"
                                id="email"
                                value={emailValue}
                                onChange={(e) => setEmailValue(e.target.value)}
                                className="w-full border rounded-xl h-8 px-2 outline-[#8ad9a7]"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email">Phone number of receiver</label>
                            <input
                                type="tel"
                                id="number"
                                placeholder="(123) 456 789"
                                value={phonenumberValue}
                                onChange={(e) => setPhoneNumberValue(e.target.value)}
                                className="w-full border rounded-xl h-8 px-2 outline-[#8ad9a7]"
                            />
                        </div>
                    )}
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

export default SendMoney;
