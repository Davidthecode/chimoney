import Index from "@/components/home";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/lib/authOptions";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  };
  return (
    <div className="h-full">
      <Index />
    </div>
  )
};

export default Home;
