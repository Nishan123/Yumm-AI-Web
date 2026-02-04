interface PrimaryBtnProps {
  buttonName: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
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

const PrimaryBtn = ({
  buttonName,
  type = "button",
  disabled = false,
  loading = false,
  onClick,
}: PrimaryBtnProps) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className="w-92.5 h-13.5 rounded-[40px] flex items-center justify-center 
      px-4 outline-0 font-inter bg-black text-white cursor-pointer 
      disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 
      transition-all"
    >
      {loading ? <Spinner /> : buttonName}
    </button>
  );
};

export default PrimaryBtn;
