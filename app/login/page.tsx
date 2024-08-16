import LoginForm from "@/components/froms/loginForm";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <Image
        src={"/assets/imgs/login.png"}
        alt="onboarding"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default Login;
