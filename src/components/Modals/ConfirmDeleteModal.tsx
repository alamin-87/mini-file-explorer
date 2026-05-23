"use client";

import { Trash2, X } from "lucide-react";
import { FileSystemItem } from "@/types";

interface ConfirmDeleteModalProps {
  item: FileSystemItem;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmDeleteModal({
  item,
  onConfirm,
  onClose,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-80 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-base">Delete</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
          <Trash2 size={18} className="text-red-400 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            Delete <span className="text-white font-medium">"{item.name}"</span>
            ?
            {item.type === "folder" && (
              <span className="block text-xs text-gray-500 mt-0.5">
                All contents will be permanently deleted.
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
