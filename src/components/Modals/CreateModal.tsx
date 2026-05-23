"use client";

import { useState } from "react";
import { FolderPlus, FilePlus, X } from "lucide-react";
import { ItemType } from "@/types";

interface CreateModalProps {
  onConfirm: (name: string, type: ItemType) => void;
  onClose: () => void;
}

export default function CreateModal({ onConfirm, onClose }: CreateModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<ItemType>("folder");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onConfirm(name.trim(), type);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-80 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-base">Create New</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Type Select */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setType("folder")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-colors
              ${
                type === "folder"
                  ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
          >
            <FolderPlus size={15} />
            Folder
          </button>
          <button
            onClick={() => setType("file")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-colors
              ${
                type === "file"
                  ? "bg-blue-500/20 border-blue-500 text-blue-400"
                  : "border-gray-600 text-gray-400 hover:border-gray-500"
              }`}
          >
            <FilePlus size={15} />
            File
          </button>
        </div>

        {/* Name Input */}
        <input
          type="text"
          autoFocus
          placeholder={type === "folder" ? "Folder name" : "filename.txt"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2
            text-white text-sm placeholder-gray-500 outline-none focus:border-blue-500 mb-4"
        />

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40
              disabled:cursor-not-allowed text-sm text-white transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
