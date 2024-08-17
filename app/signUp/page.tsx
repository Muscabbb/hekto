import SignUpForm from "@/components/froms/signUpForm";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <Image
        src={"/assets/imgs/signUp.png"}
        alt="onboarding"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
      <section className="remove-scrollbar containers my-auto">
        <div className="sub-container max-w-[496px]">
          <SignUpForm />
        </div>
      </section>
    </div>
  );
};

export default SignUp;
