# 📁 Mini File Explorer

A modern, fully in-browser file explorer built with **Next.js 16**, **React 19**, and **TypeScript**. It simulates a desktop-like file management experience right in the browser — complete with folder navigation, file creation, renaming, deletion, inline text editing, and persistent local storage.

> **Live Demo:** Deploy to [Vercel](https://vercel.com) with one click — no backend required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📂 **Folder Navigation** | Browse a hierarchical file system with collapsible sidebar tree and main panel grid view |
| ➕ **Create** | Create new files and folders inside any directory via a modal dialog |
| ✏️ **Rename** | Rename any file or folder inline through a dedicated rename modal |
| 🗑️ **Delete** | Delete files and folders with a confirmation prompt to prevent accidents |
| 📝 **Text Editor** | Open and edit `.txt` files in a code-editor-style viewer with line numbers, character count, and save/cancel actions |
| 🔍 **Search & Filter** | Real-time search bar in the toolbar to filter files and folders within the current directory |
| 🧭 **Breadcrumb Navigation** | Clickable breadcrumb path in the toolbar for quick folder traversal |
| 💾 **LocalStorage Persistence** | All file system changes are automatically saved to `localStorage` and restored on reload |
| 📱 **Responsive Design** | Fully responsive with a collapsible mobile sidebar, touch-friendly interactions, and adaptive layouts |
| 🎨 **Dark Theme** | Sleek dark UI with smooth transitions, hover effects, and micro-animations |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.6 | React framework (App Router) |
| [React](https://react.dev/) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Utility-first styling |
| [Lucide React](https://lucide.dev/) | 1.16+ | Icon library |
| [uuid](https://www.npmjs.com/package/uuid) | 14.x | Unique ID generation |

---

## 📦 Project Structure

```
mini-file-explorer/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root HTML layout with metadata
│   ├── page.tsx             # App entry point (FileSystemProvider + AppLayout)
│   └── favicon.ico
│
├── src/
│   ├── types/
│   │   └── index.ts         # FileSystemItem and ItemType type definitions
│   │
│   ├── data/
│   │   └── initialData.ts   # Default file/folder tree (seed data)
│   │
│   ├── context/
│   │   └── FileSystemContext.tsx  # React Context for global state management
│   │
│   ├── utils/
│   │   └── fileSystem.ts    # Pure utility functions (CRUD, tree traversal)
│   │
│   └── components/
│       ├── Sidebar/
│       │   ├── Sidebar.tsx      # Sidebar wrapper with header
│       │   └── TreeNode.tsx     # Recursive tree node (expand/collapse)
│       │
│       ├── MainPanel/
│       │   ├── MainPanel.tsx    # Main content area orchestrator
│       │   ├── Toolbar.tsx      # Breadcrumb, search bar, create button
│       │   ├── GridItem.tsx     # Individual file/folder card in grid
│       │   └── FileViewer.tsx   # Inline text file viewer/editor with line numbers
│       │
│       ├── Editor/
│       │   └── TextEditor.tsx   # Modal-based text editor (legacy/alternate)
│       │
│       └── Modals/
│           ├── CreateModal.tsx       # Create new file/folder dialog
│           ├── RenameModal.tsx       # Rename item dialog
│           └── ConfirmDeleteModal.tsx # Delete confirmation dialog
│
├── public/                  # Static assets (SVGs)
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/alamin-87/mini-file-explorer.git
cd mini-file-explorer

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

---

## 🏗️ Architecture

### Data Model

The file system is represented as a recursive tree structure:

```typescript
type ItemType = "folder" | "file";

interface FileSystemItem {
  id: string;          // Unique identifier (UUID)
  name: string;        // Display name
  type: ItemType;      // "folder" or "file"
  content?: string;    // Text content (files only)
  children?: FileSystemItem[];  // Nested items (folders only)
}
```

### State Management

A single **React Context** (`FileSystemContext`) provides the entire application state and actions:

- `root` — The root `FileSystemItem` tree
- `selectedId` — Currently selected/navigated item
- `openFileId` — Currently opened file in the editor
- CRUD handlers: `handleCreate`, `handleRename`, `handleDelete`, `handleUpdateContent`
- `getItem(id)` — Lookup any item by ID

### Persistence

All changes are automatically persisted to `localStorage` under the key `mini-file-explorer-data`. On first load, the app hydrates from `localStorage` if data exists, otherwise it uses the default seed data from `initialData.ts`. Hydration is deferred to `useEffect` to prevent SSR/client mismatch.

### Utility Functions (`src/utils/fileSystem.ts`)

Pure, immutable tree operations that return new tree copies:

| Function | Description |
|---|---|
| `findItem(root, id)` | Recursively search for an item by ID |
| `createItem(root, parentId, name, type)` | Add a new child to the specified parent folder |
| `renameItem(root, id, newName)` | Update an item's name |
| `deleteItem(root, id)` | Remove an item and all its descendants |
| `updateFileContent(root, id, content)` | Update a file's text content |

---

## 🖥️ UI Components

### Sidebar
- Displays the full folder tree with recursive `TreeNode` components
- Folders show expand/collapse chevrons and yellow folder icons
- Files show blue document icons
- Selected item is highlighted with a blue background
- Empty folders display an "Empty folder" placeholder

### Main Panel
- **Toolbar**: Back button, breadcrumb path, search input, and "Create" button
- **Grid View**: Cards for each file/folder with hover actions (rename, delete)
- **File Viewer**: Code-editor-style view with line numbers, edit/save/cancel controls, and a status bar showing line count, character count, and save state
- **Empty States**: Helpful messages for empty folders and no-results searches

### Modals
- **CreateModal** — Type selector (file/folder) + name input
- **RenameModal** — Pre-filled name input with confirm/cancel
- **ConfirmDeleteModal** — Shows item name with delete/cancel actions

---

## 📱 Responsive Design

The app is fully responsive across all screen sizes:

- **Desktop (md+)**: Side-by-side sidebar and main panel layout
- **Mobile (<md)**: Sidebar becomes a slide-out drawer with a hamburger toggle and a dark overlay backdrop
- **Touch Support**: Double-tap to open items, single-tap to select; action buttons remain visible on active (tapped) items

---

## 🧩 Key Design Decisions

1. **Client-side only** — No backend or API. The entire file system lives in-memory and is persisted to `localStorage`, making deployment trivial.
2. **Immutable tree updates** — All utility functions return new tree objects instead of mutating state, ensuring predictable React re-renders.
3. **Deferred hydration** — `localStorage` is read inside `useEffect` (not during SSR) to prevent React hydration mismatches in Next.js.
4. **UUID-based identity** — Each item gets a `uuid` v4 ID at creation time, making lookups and operations deterministic regardless of name changes.
5. **Component separation** — Modals, sidebar, and main panel are fully decoupled; they communicate exclusively through the shared `FileSystemContext`.

---

## 📄 License

This project is private and proprietary.

---

## 👤 Author

**Alamin** — [GitHub](https://github.com/alamin-87)

Built with ❤️ for Webbly Media (Sweden)
