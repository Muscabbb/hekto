import ForgetForm from "@/components/froms/forgetForm";
import Image from "next/image";

const Forget = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <Image
        src={"/assets/imgs/forgetPass.png"}
        alt="onboarding"
        height={1000}
        width={1000}
        className="side-img max-w-[50%]"
      />
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <ForgetForm />
        </div>
      </section>
    </div>
  );
};

export default Forget;
