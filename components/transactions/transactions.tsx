"use client";

import Image from "next/image";
import testUser from "@/public/testuser.svg";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";
import { Loader } from "lucide-react";

const Transactions = ({ maxTransactions }: any) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { userInfo } = useUserContext();

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/account", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            userSubId: userInfo?.userSubId,
            action: "transactions"
          })
        })
        const data = await res.json();
        setTransactions(data.message.data);
        console.log(data.message.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      };
    };

    if (userInfo?.userSubId) {
      getTransactions();
    };
  }, [userInfo]);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="py-2 w-full border rounded-md  bg-[#FAF9F9]">
        <table className="w-full text-sm flex flex-col p-4">
          <thead>
            <tr className="flex justify-between text-md border-b py-3">
              <td className="w-[25%] text-center font-semibold">Date</td>
              <td className="w-[25%] text-center font-semibold">Type</td>
              <td className="w-[25%] text-center font-semibold">Amount</td>
              <td className="w-[25%] text-center font-semibold truncate">Sender/Receipent</td>
            </tr>
          </thead>
          {loading && (
            <div className="flex flex-col items-center justify-center w-full mt-6">
              <Loader className="animate-spin" />
              <p className="text-xs">Loading please wait...</p>
            </div>
          )}
          {!loading && transactions && transactions.length === 0 && (
            <tbody>
              <tr className="flex justify-center text-sm py-3">
                <td colSpan={4} className="text-center">You have no transactions</td>
              </tr>
            </tbody>
          )}
          {!loading && transactions && transactions.length > 0 && (
            <tbody className="flex flex-col space-y-4 overflow-y-auto">
              {!loading && transactions &&
                transactions
                  .slice(0, maxTransactions)
                  .sort((a: any, b: any) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()) // Sort transactions based on issueDate
                  .map((transaction: any) => {
                    const transactionsDate = transaction?.issueDate;
                    //function to format date and time
                    const formatDateTime = (dateTimeString: any) => {
                      const date = new Date(dateTimeString);
                      const dateFormatter = new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      });
                      const formattedDate = dateFormatter.format(date);

                      const timeFormatter = new Intl.DateTimeFormat('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      });
                      const formattedTime = timeFormatter.format(date);

                      return `${formattedDate}, ${formattedTime}`;
                    };
                    const formattedDateTime = formatDateTime(transactionsDate);
                    return (
                      <tr className="flex justify-between text-sm border-b py-3" key={transaction?.id}>
                        <td className="flex items-center justify-center w-[25%]">{formattedDateTime}</td>
                        <td className="w-[25%] text-center truncate">{transaction?.issuer == userInfo?.userSubId ? "Sent" : "Received"}</td>
                        <td className="w-[25%] text-center truncate">${transaction?.valueInUSD}</td>
                        <td className="w-[25%] text-center truncate"></td>
                      </tr>
                    )
                  })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
};

export default Transactions;
