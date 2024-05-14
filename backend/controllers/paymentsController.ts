import { NextResponse } from "next/server";

export const sendMoneyWithEmail = async ({ email, amount, userSubId }: any) => {
    try {
        const initializeSend = await fetch(`${process.env.CHIMONEY_BASE_URL}/v0.2/payouts/chimoney`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': process.env.CHIMONEY_API_KEY as string,
            },
            body: JSON.stringify({
                subAccount: userSubId,
                chimoneys: [
                    {
                        email: email,
                        valueInUSD: amount
                    },
                ]
            })
        })
        const res = await initializeSend.json();
        console.log(res)
        if (res.status !== "success") {
            return NextResponse.json({ message: "Payment Failed" }, { status: 400 });
        };
        return NextResponse.json({ message: res }, { status: 200 });
    } catch (error) {
        console.log("Chimoney payout error", error);
        return NextResponse.json({ message: "chimoney payout error" }, { status: 400 });
    };
};


export const sendMoneyWithPhoneNumber = async ({ phone, amount, userSubId }: any) => {
    try {
        const initializeSend = await fetch(`${process.env.CHIMONEY_BASE_URL}/v0.2/payouts/chimoney`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': process.env.CHIMONEY_API_KEY as string,
            },
            body: JSON.stringify({
                subAccount: userSubId,
                chimoneys: [
                    {
                        phone,
                        valueInUSD: amount
                    },
                ]
            })
        })
        const res = await initializeSend.json();
        console.log(res)
        if (res.status !== "success") {
            return NextResponse.json({ message: "Payment Failed" }, { status: 400 });
        };
        return NextResponse.json({ message: res }, { status: 200 });
    } catch (error) {
        console.log("Chimoney payout error", error);
        return NextResponse.json({ message: "chimoney payout error" }, { status: 400 });
    };
};


export const sendMoneyToWallet = async ({ receiverChimoneyId, amount, userSubId }: any) => {
    try {
        const initializeSend = await fetch(`${process.env.CHIMONEY_BASE_URL}/v0.2/payouts/wallet`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': process.env.CHIMONEY_API_KEY as string,
            },

            body: JSON.stringify({
                subAccount: userSubId,
                wallets: [
                    {
                        receiver: receiverChimoneyId,
                        valueInUSD: amount
                    },
                ]
            })
        })
        const res = await initializeSend.json();
        console.log(res)
        if (res.status !== "success") {
            return NextResponse.json({ message: "Payment Failed" }, { status: 400 });
        };
        return NextResponse.json({ message: res }, { status: 200 });
    } catch (error) {
        console.log("Chimoney payout error", error);
        return NextResponse.json({ message: "chimoney payout error" }, { status: 400 });
    };
};