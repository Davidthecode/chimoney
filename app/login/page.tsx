import Login from "@/components/auth/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/lib/authOptions";

const Loginpage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  };
  return <Login />;
};

export default Loginpage;
