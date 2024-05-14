import Transactions from "./transactions";
const Index = () => {
    return (
        <div className="h-full flex flex-col px-4 sm:px-8 overflow-y-auto">
            <h1 className="font-bold pt-4 pb-2 ">Transactions</h1>
            <p className="font-semibold text-xs pb-4">You can only receive money sent to your Chimoney wallet</p>
            <Transactions />
        </div>
    )
};

export default Index;
