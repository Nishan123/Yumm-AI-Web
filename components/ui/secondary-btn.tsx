import Image from "next/image";
import GoogleIcon from "@/public/Icon-Google.png";
const Button = ({ buttonName }: { buttonName: string }) => {
  return (
    <button
      className="w-92.5 h-13.5 rounded-[40px] flex items-center justify-center px-4 outline-0 font-inter
      bg-white text-black border border-[#666666] cursor-pointer gap-2"
      type="submit"
    >
      <Image src={GoogleIcon} alt="Goolge Icon" className="w-5 h-5" />
      {buttonName}
    </button>
  );
};

export default Button;
