import SendMoney from "@/components/dashboard/sendmoney";

const Payments = () => {
    return (
        <div className="pt-6 px-4 sm:px-8 flex flex-col h-full overflow-y-auto">
            <h1 className="font-bold">Payments</h1>
            <h3 className="text-sm font-medium">Send payouts to emails and phone numbers with Chimoney ASAP!</h3>
            <div className="flex justify-center items-center mt-12">
                <div className="w-full sm:w-4/5 md:w-3/5">
                    <SendMoney />
                </div>
            </div>
        </div>
    )
};

export default Payments;
