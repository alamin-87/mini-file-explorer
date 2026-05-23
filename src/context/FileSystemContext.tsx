"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FileSystemItem, ItemType } from "@/types";
import { initialData } from "@/data/initialData";
import {
  createItem, renameItem, deleteItem, updateFileContent, findItem,
} from "@/utils/fileSystem";

interface FileSystemContextType {
  root: FileSystemItem;
  selectedId: string | null;
  openFileId: string | null;
  setSelectedId: (id: string | null) => void;
  setOpenFileId: (id: string | null) => void;
  handleCreate: (parentId: string, name: string, type: ItemType) => void;
  handleRename: (id: string, newName: string) => void;
  handleDelete: (id: string) => void;
  handleUpdateContent: (id: string, content: string) => void;
  getItem: (id: string) => FileSystemItem | null;
}

const FileSystemContext = createContext<FileSystemContextType | null>(null);

const STORAGE_KEY = "mini-file-explorer-data";

export function FileSystemProvider({ children }: { children: React.ReactNode }) {
  const [root, setRoot] = useState<FileSystemItem>(initialData);
  const [selectedId, setSelectedId] = useState<string | null>("root");
  const [openFileId, setOpenFileId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage after hydration to avoid SSR mismatch
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRoot(JSON.parse(stored));
      } catch {
        // ignore parse errors, keep initialData
      }
    }
    setIsHydrated(true);
  }, []);

  // Only persist to localStorage after initial hydration
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(root));
    }
  }, [root, isHydrated]);

  const handleCreate = (parentId: string, name: string, type: ItemType) => {
    setRoot((prev) => createItem(prev, parentId, name, type));
  };

  const handleRename = (id: string, newName: string) => {
    setRoot((prev) => renameItem(prev, id, newName));
  };

  const handleDelete = (id: string) => {
    if (openFileId === id) setOpenFileId(null);
    if (selectedId === id) setSelectedId("root");
    setRoot((prev) => deleteItem(prev, id));
  };

  const handleUpdateContent = (id: string, content: string) => {
    setRoot((prev) => updateFileContent(prev, id, content));
  };

  const getItem = (id: string) => findItem(root, id);

  return (
    <FileSystemContext.Provider value={{
      root, selectedId, openFileId,
      setSelectedId, setOpenFileId,
      handleCreate, handleRename, handleDelete, handleUpdateContent, getItem,
    }}>
      {children}
    </FileSystemContext.Provider>
  );
}

export function useFileSystem() {
  const ctx = useContext(FileSystemContext);
  if (!ctx) throw new Error("useFileSystem must be used inside FileSystemProvider");
  return ctx;
}