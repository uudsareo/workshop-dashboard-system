"use client";

import {
  HomeIcon,
  NewspaperIcon,
  Cog6ToothIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarComponent: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-black sm:w-64 w-16">
      <div
        className="hs-overlay"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Header */}
          <div className="hidden sm:flex items-center justify-center lg:justify-start h-16 px-4 border-b border-gray-200 dark:border-neutral-700">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Admin Panel
            </span>
          </div>
          {/* Body */}
          <nav className="h-full overflow-y-auto ">
            <div
              className="pb-0 px-2 w-full flex flex-col flex-wrap h-full"
              data-hs-accordion-always-open
            >
              <div className="h-full flex flex-col justify-between">
                <ul className="space-y-1">
                  <li>
                    <button
                      className="w-full flex items-center justify-center lg:justify-start gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:text-white"
                      onClick={() => router.push("/admin")}
                    >
                      <HomeIcon className="size-5" />
                      <span className="hidden lg:inline">Dashboard</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full flex items-center justify-center lg:justify-start gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:text-white"
                      onClick={() => router.push("/admin/project")}
                    >
                      <NewspaperIcon className="size-5" />
                      <span className="hidden lg:inline">Projects</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full flex items-center justify-center lg:justify-start gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:text-white"
                      onClick={() => router.push("/admin/list")}
                    >
                      <Square3Stack3DIcon className="size-5" />
                      <span className="hidden lg:inline">Parts</span>
                    </button>
                  </li>
                </ul>
                <div className="pt-1">
                  <button
                    onClick={() => router.push("/admin/settings")}
                    className="w-full flex items-center justify-center lg:justify-start gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:text-white"
                  >
                    <Cog6ToothIcon className="size-5" />
                    <span className="hidden lg:inline">Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
