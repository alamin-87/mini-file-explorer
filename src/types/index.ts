export type ItemType = "folder" | "file";

export interface FileSystemItem {
  id: string;
  name: string;
  type: ItemType;
  content?: string;
  children?: FileSystemItem[];
}