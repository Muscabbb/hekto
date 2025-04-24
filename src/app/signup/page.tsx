import SignUpForm from "@/components/froms/signUpForm";
import Image from "next/image";

const SignUp = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={"/assets/imgs/signUp.png"}
          alt="onboarding"
          fill
          className="object-cover"
          quality={100}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>

      {/* Form Container */}
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-4xl rounded-lg bg-white/10 p-8 shadow-lg backdrop-blur-sm">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
