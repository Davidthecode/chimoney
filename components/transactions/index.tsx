import Transactions from "./transactions";
const Index = () => {
    return (
        <div className="h-full flex flex-col px-4 sm:px-8 overflow-y-auto">
            <h1 className="font-bold pt-4 pb-6 ">Transactions</h1>
            <Transactions />
        </div>
    )
};

export default Index;
