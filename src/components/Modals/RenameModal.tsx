"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface RenameModalProps {
  currentName: string;
  onConfirm: (newName: string) => void;
  onClose: () => void;
}

export default function RenameModal({
  currentName,
  onConfirm,
  onClose,
}: RenameModalProps) {
  const [name, setName] = useState(currentName);

  const handleSubmit = () => {
    if (!name.trim() || name.trim() === currentName) return;
    onConfirm(name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-80 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-base">Rename</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <input
          type="text"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2
            text-white text-sm outline-none focus:border-blue-500 mb-4"
        />

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim() || name.trim() === currentName}
            className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40
              disabled:cursor-not-allowed text-sm text-white transition-colors"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
}
