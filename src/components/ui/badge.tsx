import React from "react";
import cn from "clsx";

interface BadgeProps {
  count: number; // Количество уведомлений
  children: React.ReactNode; // Иконка или элемент
  className: string;
}

export const Badge: React.FC<BadgeProps> = ({ count, children, className }) => {
  const displayCount = count > 99 ? `99+` : count.toString();

  // Определяем ширину бейджа на основе длины текста
  const badgeWidth =
    displayCount.toString().length === 1 ? "w-5" : displayCount.length === 2 ? "w-6" : "w-8";

  return (
    <div className="relative inline-flex items-center">
      {children}

      <span
        className={cn(
          "absolute -top-2 bg-blue-300 text-black text-xs font-semibold flex items-center justify-center rounded-full h-5",
          className,
          badgeWidth,
          {
            "-right-2": Number(displayCount) > 9,
            "-right-1": Number(displayCount) < 10,
          }
        )}
      >
        {displayCount}
      </span>
    </div>
  );
};
