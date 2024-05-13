import { NextResponse } from "next/server";

export const getWalletBalance = async ({ userSubId }: any) => {
    try {
        const res = await fetch(`${process.env.CHIMONEY_BASE_URL}/v0.2/wallets/list`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': process.env.CHIMONEY_API_KEY as string,
            },
            body: JSON.stringify({
                subAccount: userSubId
            })
        })
        const result = await res.json()
        console.log("getWalletBalanceResult", result);
        if (result.status !== "success") {
            return NextResponse.json({ message: "Error getting wallet balance" }, { status: 400 });
        };
        return NextResponse.json({ message: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error getting wallet balance" }, { status: 400 });
    };
};


export const getTransactions = async ({ userSubId }: any) => {
    try {
        const res = await fetch(`${process.env.CHIMONEY_BASE_URL}/v0.2/accounts/transactions`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': process.env.CHIMONEY_API_KEY as string,
            },
            body: JSON.stringify({
                subAccount: userSubId
            })
        })
        const result = await res.json()
        console.log("transactionsResult", result);
        if (result.status !== "success") {
            return NextResponse.json({ message: "Error getting transactions" }, { status: 400 });
        };
        return NextResponse.json({ message: result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error getting transactions" }, { status: 400 });
    };
};
