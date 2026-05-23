"use client";

import { useState } from "react";
import { FileSystemProvider } from "@/context/FileSystemContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import MainPanel from "@/components/MainPanel/MainPanel";
import { PanelLeft, X } from "lucide-react";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 flex-shrink-0 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <Sidebar />
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-700 bg-gray-900">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            {sidebarOpen ? <X size={18} /> : <PanelLeft size={18} />}
          </button>
          <span className="text-sm font-semibold text-white">Mini File Explorer</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <MainPanel />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <FileSystemProvider>
      <AppLayout />
    </FileSystemProvider>
  );
}