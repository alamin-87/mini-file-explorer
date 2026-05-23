"use client";

import { HardDrive } from "lucide-react";
import { useFileSystem } from "@/context/FileSystemContext";
import TreeNode from "./TreeNode";

export default function Sidebar() {
  const { root } = useFileSystem();

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-700">
        <HardDrive size={18} className="text-blue-400" />
        <span className="text-sm font-semibold text-white tracking-wide">
          Webbly Media Drive
        </span>
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        <TreeNode item={root} depth={0} />
      </div>
    </div>
  );
}