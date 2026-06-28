import React from "react";
import Image from "next/image";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const imageSrc = item?.image || item?.thumbnail || "/placeholder.png";
  const itemName = item?.name || item?.title || "Unknown Product";
  const itemDescription =
    item?.description || "No description available for this item.";
  const itemPrice = item?.price || 0;
  const itemQuantity = item?.quantity || 1;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 shadow-xs mb-4 transition-all hover:shadow-md dark:hover:border-zinc-700">
      <div className="flex items-center gap-4 w-full sm:w-auto">

        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden relative p-2 shrink-0 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={itemName}
            fill
            sizes="(max-width: 768px) 80px, 96px"
            className="object-contain p-2"
            priority={item?.id === 1}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-50 text-base sm:text-lg truncate max-w-[200px] sm:max-w-md">
            {itemName}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1 max-w-[280px] sm:max-w-md line-clamp-2">
            {itemDescription}
          </p>

          <div className="flex items-center gap-4 mt-3 sm:hidden">
            <div className="flex items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-full p-1">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, itemQuantity - 1)}
                disabled={itemQuantity <= 1}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-40 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
              >
                <Minus size={14} />
              </button>
              <span className="px-3 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                {itemQuantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, itemQuantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="flex items-center gap-1 text-xs font-semibold text-red-500 dark:text-red-400 cursor-pointer hover:text-red-600 dark:hover:text-red-300"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-end justify-between h-24 py-1 shrink-0">
        <span className="font-bold text-[#006633] dark:text-emerald-500 text-base sm:text-lg">
          $
          {(itemPrice * itemQuantity).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 rounded-full p-1">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, itemQuantity - 1)}
              disabled={itemQuantity <= 1}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-40 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {itemQuantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, itemQuantity + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-1 text-xs font-semibold text-red-500 dark:text-red-400 cursor-pointer hover:text-red-600 dark:hover:text-red-300"
          >
            <Trash2 size={14} /> Remove
          </button>
        </div>
      </div>

      <div className="sm:hidden w-full text-right mt-2 shrink-0">
        <span className="font-bold text-[#006633] dark:text-emerald-500 text-base">
          $
          {(itemPrice * itemQuantity).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
