import Signup from "@/components/auth/signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const SignupPage = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/dashboard");
    };
    return <Signup />;
};

export default SignupPage;
