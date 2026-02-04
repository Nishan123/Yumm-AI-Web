import Image from "next/image";
import GoogleIcon from "@/public/Icon-Google.png";

interface SecondaryBtnProps {
  buttonName: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-gray-600"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const SecondaryBtn = ({
  buttonName,
  onClick,
  disabled = false,
  loading = false,
}: SecondaryBtnProps) => {
  return (
    <button
      className="w-92.5 h-13.5 rounded-[40px] flex items-center justify-center px-4 outline-0 font-inter
      bg-white text-black border border-[#666666] cursor-pointer gap-2
      disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all"
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Image src={GoogleIcon} alt="Google Icon" className="w-5 h-5" />
          {buttonName}
        </>
      )}
    </button>
  );
};

export default SecondaryBtn;
