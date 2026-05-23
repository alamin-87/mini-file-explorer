"use client";

import { useState, useEffect } from "react";
import { X, Save, FileText } from "lucide-react";
import { useFileSystem } from "@/context/FileSystemContext";

export default function TextEditor() {
  const { openFileId, setOpenFileId, getItem, handleUpdateContent } = useFileSystem();
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(true);

  const file = openFileId ? getItem(openFileId) : null;

  useEffect(() => {
    if (file) {
      setContent(file.content || "");
      setSaved(true);
    }
  }, [openFileId]);

  const handleSave = () => {
    if (!openFileId) return;
    handleUpdateContent(openFileId, content);
    setSaved(true);
    setOpenFileId(null); // Close file after saving
  };

  const handleClose = () => {
    if (!saved) {
      const confirm = window.confirm("You have unsaved changes. Are you sure you want to close?");
      if (!confirm) return;
    }
    setOpenFileId(null);
  };

  if (!file) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-[600px] h-[480px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-blue-400" />
            <span className="text-white text-sm font-medium">{file.name}</span>
            {!saved && (
              <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
                Unsaved
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600
                hover:bg-blue-500 text-xs text-white transition-colors"
            >
              <Save size={13} />
              Save
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Editor */}
        <textarea
          value={content}
          onChange={(e) => { setContent(e.target.value); setSaved(false); }}
          className="flex-1 bg-transparent text-gray-300 text-sm p-4 resize-none outline-none
            font-mono leading-relaxed placeholder-gray-600"
          placeholder="Start typing..."
          spellCheck={false}
        />

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-700 flex justify-between">
          <span className="text-xs text-gray-600">
            {content.length} characters
          </span>
          <span className="text-xs text-gray-600">
            {saved ? "✓ Saved" : "● Unsaved changes"}
          </span>
        </div>
      </div>
    </div>
  );
}