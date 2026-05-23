"use client";

import { useState, useEffect } from "react";
import { Pencil, Save, X, FileText, Check } from "lucide-react";
import { FileSystemItem } from "@/types";
import { useFileSystem } from "@/context/FileSystemContext";

interface FileViewerProps {
  item: FileSystemItem;
}

export default function FileViewer({ item }: FileViewerProps) {
  const { handleUpdateContent } = useFileSystem();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(true);

  // Reset states when item changes
  useEffect(() => {
    setContent(item.content || "");
    setIsEditing(false);
    setSaved(true);
  }, [item.id, item.content]);

  const handleSave = () => {
    handleUpdateContent(item.id, content);
    setSaved(true);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(item.content || "");
    setSaved(true);
    setIsEditing(false);
  };

  const lines = content.split("\n");

  return (
    <div className="flex flex-col h-full bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
      {/* File Header / Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-gray-800 bg-gray-950">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-blue-400" />
          <span className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
            {item.name}
          </span>
          {!saved && (
            <span className="text-[10px] text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full font-medium">
              Unsaved Changes
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 
                  text-xs font-medium text-white transition-all shadow-sm"
              >
                <Save size={13} />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 
                  text-xs font-medium text-gray-300 hover:text-white transition-all"
              >
                <X size={13} />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 
                text-xs font-medium text-white transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <Pencil size={13} />
              <span>Edit File</span>
            </button>
          )}
        </div>
      </div>

      {/* Editor/Viewer Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {isEditing ? (
          <div className="flex-1 flex overflow-hidden">
            {/* Line numbers for editing */}
            <div className="w-12 py-4 select-none text-right pr-3 font-mono text-xs text-gray-600 bg-gray-950 border-r border-gray-850">
              {lines.map((_, index) => (
                <div key={index} className="h-6 leading-6">
                  {index + 1}
                </div>
              ))}
            </div>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setSaved(false);
              }}
              className="flex-1 bg-transparent text-gray-300 font-mono text-sm p-4 h-full resize-none outline-none 
                leading-6 focus:text-white transition-colors"
              placeholder="Start typing..."
              spellCheck={false}
              autoFocus
            />
          </div>
        ) : (
          <div className="flex-1 flex overflow-auto">
            {/* Line numbers for reading */}
            <div className="w-12 py-4 select-none text-right pr-3 font-mono text-xs text-gray-600 bg-gray-950/50 border-r border-gray-850">
              {lines.map((_, index) => (
                <div key={index} className="h-6 leading-6">
                  {index + 1}
                </div>
              ))}
            </div>
            <pre className="flex-1 font-mono text-sm p-4 text-gray-300 leading-6 whitespace-pre overflow-x-auto">
              {content || <span className="italic text-gray-600">File is empty</span>}
            </pre>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-4 sm:px-5 py-2 border-t border-gray-800 bg-gray-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
        <div>
          <span>{lines.length} {lines.length === 1 ? "line" : "lines"}</span>
          <span className="mx-2 text-gray-700">|</span>
          <span>{content.length} characters</span>
        </div>
        <div>
          {saved ? (
            <span className="flex items-center gap-1 text-emerald-500">
              <Check size={12} />
              Saved to local storage
            </span>
          ) : (
            <span className="text-yellow-500">● Unsaved changes</span>
          )}
        </div>
      </div>
    </div>
  );
}
