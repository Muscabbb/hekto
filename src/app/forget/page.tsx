import ForgetForm from "@/components/froms/forgetForm";
import Image from "next/image";

const Forget = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen max-h-screen">
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <Image
          src={"/assets/imgs/forgetPass.png"}
          alt="onboarding"
          fill
          className="object-cover"
          priority
        />
      </div>
      <section className="remove-scrollbar container my-auto flex-1 flex items-center justify-center">
        <div className="sub-container w-full max-w-[496px] px-4">
          <ForgetForm />
        </div>
      </section>
    </div>
  );
};

export default Forget;
