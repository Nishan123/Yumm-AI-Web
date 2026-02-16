import { ChevronRight } from "lucide-react";

interface SettingItemCardProps {
  icon: any;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  destructive?: boolean;
}

export const SettingItemCard = ({
  icon: Icon,
  title,
  subtitle,
  onClick,
  destructive = false,
}: SettingItemCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-xl group ${
        destructive ? "text-red-500 hover:bg-red-50" : "text-gray-900"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-2 rounded-lg ${
            destructive ? "bg-red-100" : "bg-gray-100 group-hover:bg-white"
          } transition-colors`}
        >
          <Icon
            size={20}
            className={destructive ? "text-red-500" : "text-gray-600"}
          />
        </div>
        <div className="text-left">
          <h3 className="font-medium text-sm sm:text-base">{title}</h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 max-w-[200px] sm:max-w-xs md:max-w-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {!destructive && <ChevronRight size={16} className="text-gray-400" />}
    </button>
  );
};
