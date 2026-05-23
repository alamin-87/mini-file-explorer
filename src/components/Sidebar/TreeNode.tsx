"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
} from "lucide-react";
import { FileSystemItem } from "@/types";
import { useFileSystem } from "@/context/FileSystemContext";

interface TreeNodeProps {
  item: FileSystemItem;
  depth?: number;
}

export default function TreeNode({ item, depth = 0 }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(depth === 0);
  const { selectedId, setSelectedId, setOpenFileId } = useFileSystem();

  const isSelected = selectedId === item.id;
  const isFolder = item.type === "folder";

  const handleClick = () => {
    if (isFolder) {
      setExpanded((prev) => !prev);
    }
    setSelectedId(item.id);
  };

  return (
    <div>
      {/* Item Row */}
      <div
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md cursor-pointer text-sm select-none transition-colors
          ${isSelected
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-700"
          }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {/* Expand/Collapse Arrow */}
        {isFolder ? (
          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            {expanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </span>
        ) : (
          <span className="w-4 h-4 flex-shrink-0" />
        )}

        {/* Icon */}
        {isFolder ? (
          expanded ? (
            <FolderOpen size={16} className="flex-shrink-0 text-yellow-400" />
          ) : (
            <Folder size={16} className="flex-shrink-0 text-yellow-400" />
          )
        ) : (
          <FileText size={16} className="flex-shrink-0 text-blue-400" />
        )}

        {/* Name */}
        <span className="truncate">{item.name}</span>
      </div>

      {/* Children — Recursive */}
      {isFolder && expanded && item.children && (
        <div>
          {item.children.length === 0 ? (
            <p
              className="text-xs text-gray-600 italic py-1"
              style={{ paddingLeft: `${(depth + 1) * 16 + 8}px` }}
            >
              Empty folder
            </p>
          ) : (
            item.children.map((child) => (
              <TreeNode key={child.id} item={child} depth={depth + 1} />
            ))
          )}
        </div>
      )}
    </div>
  );
}