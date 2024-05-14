import Index from "@/components/payments";

const Payments = () => {
    return (
        <div className="pt-6 px-4 sm:px-8 flex flex-col h-full overflow-y-auto">
            <h1 className="font-bold">Payments</h1>
            <h3 className="text-sm font-medium">Send payouts to emails, phone numbers, and user&apos;s chimoney wallet ASAP!</h3>
            <div className="flex justify-center items-center mt-12">
                <div className="w-full">
                    <Index />
                </div>
            </div>
        </div>
    )
};

export default Payments;
