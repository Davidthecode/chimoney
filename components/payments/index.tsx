import ChimoneyWalletPayment from "./chimoneyWallet"
import SendMoney from "./sendmoney"


const Index = () => {
    return (
        <div className="flex flex-col space-y-6 w-full pb-10 overflow-y-auto">
            <div className="flex flex-col space-y-12 xl:space-y-0 xl:flex-row items-center justify-around w-full">
                <div className="w-full sm:w-[80%] xl:w-2/5 flex flex-col space-y-4">
                    <p className="font-semibold">Send money to Email/Phone number</p>
                    <p className="text-xs">Input your recipient&apos;s email or phone number to make payments</p>
                    <SendMoney />
                </div>
                <div className="w-full sm:w-[80%] xl:w-2/5 flex flex-col space-y-4">
                    <p className="font-semibold">Send money to a user&apos;s Chimoney wallet</p>
                    <p className="text-xs">Ask your friend for their Chimoney id - they can find it on the dashboard page</p>
                    <ChimoneyWalletPayment />
                </div>
            </div>
            <p className="text-center text-xs">when someone makes payment into your <span className="font-semibold">Chimoney Wallet,</span> it would be added to your account balance</p>
        </div>
    )
};

export default Index;
