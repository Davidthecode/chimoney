import CenteredCTA from "./centered-CTA";
import Hero from "./hero";
import Navbar from "./navbar";

const Index = () => {
    return (
        <div className="flex flex-col">
            <Navbar />
            <Hero />
            <CenteredCTA />
        </div>
    )
};

export default Index;