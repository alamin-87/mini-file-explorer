"use client";

import { useState, useEffect } from "react";
import { useFileSystem } from "@/context/FileSystemContext";
import { FileSystemItem, ItemType } from "@/types";
import Toolbar from "./Toolbar";
import GridItem from "./GridItem";
import CreateModal from "@/components/Modals/CreateModal";
import RenameModal from "@/components/Modals/RenameModal";
import ConfirmDeleteModal from "@/components/Modals/ConfirmDeleteModal";
import { Folder } from "lucide-react";
import FileViewer from "./FileViewer";

export default function MainPanel() {
  const {
    selectedId,
    setSelectedId,
    getItem,
    handleCreate,
    handleRename,
    handleDelete,
  } = useFileSystem();

  const [showCreate, setShowCreate] = useState(false);
  const [renameTarget, setRenameTarget] = useState<FileSystemItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FileSystemItem | null>(null);

  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentFolder = selectedId ? getItem(selectedId) : null;
  const children =
    currentFolder?.type === "folder" ? currentFolder.children || [] : [];
  const filteredChildren = children.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const isFile = currentFolder?.type === "file";

  // Reset active item selection and search when navigating folders
  useEffect(() => {
    setActiveItemId(null);
    setSearchQuery("");
  }, [selectedId]);

  const handleCreateConfirm = (name: string, type: ItemType) => {
    if (!selectedId) return;
    handleCreate(selectedId, name, type);
  };

  return (
    <div
      className="flex flex-col h-full bg-gray-850"
      onClick={() => setActiveItemId(null)}
    >
      {/* Toolbar */}
      <Toolbar
        onCreate={() => setShowCreate(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Content */}
      <div className="flex-1 overflow-hidden p-4 sm:p-6">
        {isFile && currentFolder ? (
          <FileViewer item={currentFolder} />
        ) : children.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <Folder size={48} className="mb-3 opacity-30" />
            <p className="text-sm">This folder is empty</p>
            <p className="text-xs mt-1">
              Create a new folder or file to get started
            </p>
          </div>
        ) : filteredChildren.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <p className="text-sm">No results found for "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-blue-400 mt-2 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap content-start gap-4 sm:gap-6 overflow-y-auto h-full pb-6 justify-center sm:justify-start">
            {filteredChildren.map((item) => (
              <GridItem
                key={item.id}
                item={item}
                isActive={activeItemId === item.id}
                onClick={() => setActiveItemId(item.id)}
                onDoubleClick={() => setSelectedId(item.id)}
                onRename={(item) => setRenameTarget(item)}
                onDelete={(item) => setDeleteTarget(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreate && (
        <CreateModal
          onConfirm={handleCreateConfirm}
          onClose={() => setShowCreate(false)}
        />
      )}
      {renameTarget && (
        <RenameModal
          currentName={renameTarget.name}
          onConfirm={(newName) => handleRename(renameTarget.id, newName)}
          onClose={() => setRenameTarget(null)}
        />
      )}
      {deleteTarget && (
        <ConfirmDeleteModal
          item={deleteTarget}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
