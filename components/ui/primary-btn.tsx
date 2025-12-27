interface PrimaryBtnProps {
  buttonName: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const PrimaryBtn = ({
  buttonName,
  type = "button",
  disabled = false,
  onClick,
}: PrimaryBtnProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-92.5 h-13.5 rounded-[40px] flex items-center justify-center 
      px-4 outline-0 font-inter bg-black text-white cursor-pointer 
      disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 
      transition-all"
    >
      {buttonName}
    </button>
  );
};

export default PrimaryBtn;
