"use client";

import { useState } from "react";
import { Folder, FileText, Pencil, Trash2 } from "lucide-react";
import { FileSystemItem } from "@/types";
import { useFileSystem } from "@/context/FileSystemContext";

interface GridItemProps {
  item: FileSystemItem;
  isActive: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onRename: (item: FileSystemItem) => void;
  onDelete: (item: FileSystemItem) => void;
}

export default function GridItem({
  item,
  isActive,
  onClick,
  onDoubleClick,
  onRename,
  onDelete,
}: GridItemProps) {
  const [hovered, setHovered] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastClickTime < 300) {
      // It's a double tap/click
      onDoubleClick();
    } else {
      // It's a single tap/click
      onClick();
    }
    setLastClickTime(now);
  };

  return (
    <div
      onClick={handleItemClick}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl cursor-pointer
        transition-all duration-200 ease-out group w-28 h-28 hover:scale-[1.03] active:scale-[0.97]
        ${
          isActive
            ? "bg-blue-600/20 border-blue-500 shadow-md shadow-blue-500/5"
            : "bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-gray-500"
        } border`}
    >
      {/* Icon */}
      {item.type === "folder" ? (
        <Folder size={36} className="text-yellow-400" />
      ) : (
        <FileText size={36} className="text-blue-400" />
      )}

      {/* Name */}
      <span className="text-xs text-gray-300 text-center truncate w-full text-center">
        {item.name}
      </span>

      {/* Action Buttons on Hover or Active (for mobile) */}
      {(hovered || isActive) && (
        <div className="absolute top-1.5 right-1.5 flex gap-1 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename(item);
            }}
            className="p-1 rounded bg-gray-600 hover:bg-blue-600 transition-colors"
            title="Rename"
          >
            <Pencil size={11} className="text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item);
            }}
            className="p-1 rounded bg-gray-600 hover:bg-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 size={11} className="text-white" />
          </button>
        </div>
      )}

      {/* Double click hint */}
      {hovered && (
        <span className="absolute -bottom-6 text-xs text-gray-500 whitespace-nowrap">
          double click to open
        </span>
      )}
    </div>
  );
}