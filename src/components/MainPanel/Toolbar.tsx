"use client";

import { Plus, ChevronLeft, Search } from "lucide-react";
import { useFileSystem } from "@/context/FileSystemContext";
import { findItem } from "@/utils/fileSystem";

interface ToolbarProps {
  onCreate: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Toolbar({
  onCreate,
  searchQuery,
  setSearchQuery,
}: ToolbarProps) {
  const { root, selectedId, setSelectedId } = useFileSystem();

  // Build the breadcrumb path array
  const buildPath = (
    node: typeof root,
    targetId: string,
    path: { id: string; name: string }[] = [],
  ): { id: string; name: string }[] | null => {
    const currentPathNode = { id: node.id, name: node.name };
    if (node.id === targetId) return [...path, currentPathNode];
    for (const child of node.children || []) {
      const result = buildPath(child, targetId, [...path, currentPathNode]);
      if (result) return result;
    }
    return null;
  };

  const currentPath = selectedId
    ? buildPath(root, selectedId) || [{ id: "root", name: "Drive" }]
    : [{ id: "root", name: "Drive" }];

  // Find the parent folder of a given item
  const findParent = (
    node: typeof root,
    targetId: string,
  ): typeof root | null => {
    for (const child of node.children || []) {
      if (child.id === targetId) return node;
      const found = findParent(child, targetId);
      if (found) return found;
    }
    return null;
  };

  const handleBack = () => {
    if (!selectedId || selectedId === "root") return;
    const parent = findParent(root, selectedId);
    if (parent) setSelectedId(parent.id);
  };

  const currentItem = selectedId ? findItem(root, selectedId) : null;
  const isFolder = currentItem?.type === "folder";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b border-gray-700 bg-gray-850">
      {/* Left: Back + Breadcrumb */}
      <div className="flex items-start sm:items-center gap-3">
        <button
          onClick={handleBack}
          disabled={!selectedId || selectedId === "root"}
          className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30
            disabled:cursor-not-allowed transition-colors"
          title="Go back"
        >
          <ChevronLeft size={16} className="text-gray-300" />
        </button>

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-1 text-sm text-gray-400 pt-0.5 sm:pt-0">
          {currentPath.map((segment, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-600">/</span>}
              <button
                onClick={() => setSelectedId(segment.id)}
                className={`hover:text-white transition-colors duration-150 py-0.5 px-1 rounded hover:bg-gray-800 ${
                  i === currentPath.length - 1
                    ? "text-white font-medium cursor-default pointer-events-none hover:bg-transparent"
                    : "text-gray-500 font-normal"
                }`}
              >
                {segment.name}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Right: Search + Create Button */}
      {isFolder && (
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-sm rounded-lg pl-8 pr-3 py-1.5 
                text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-full sm:w-48 transition-colors"
            />
          </div>
          <button
            onClick={onCreate}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600
              hover:bg-blue-500 text-sm text-white font-medium transition-all
              hover:scale-[1.02] active:scale-[0.98] shadow-sm shadow-blue-500/20 whitespace-nowrap"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create</span>
          </button>
        </div>
      )}
    </div>
  );
}
