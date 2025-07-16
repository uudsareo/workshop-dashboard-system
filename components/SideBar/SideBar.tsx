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
    <div className="bg-black">
      <>
        {/* Navigation Toggle */}
        <div className="lg:hidden py-16 text-center">
          <button
            type="button"
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-gray-950 focus:outline-hidden focus:bg-gray-900"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-sidebar-collapsible-group"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-sidebar-collapsible-group"
          >
            Open
          </button>
        </div>

        {/* Sidebar */}
        <div
          id="hs-sidebar-collapsible-group"
          className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64 hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform h-full hidden fixed top-0 start-0 bottom-0 z-60 bg-white border-e border-gray-200"
          role="dialog"
          tabIndex={-1}
          aria-label="Sidebar"
        >
          <div className="relative flex flex-col h-full max-h-full">
            {/* Header */}
            <header className="p-4 flex justify-between items-center gap-x-2">
              <a
                className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80"
                href="#"
                aria-label="Brand"
              >
                Brand
              </a>
              <div className="lg:hidden -me-2">
                {/* Close Button */}
                <button
                  type="button"
                  className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100"
                  data-hs-overlay="#hs-sidebar-collapsible-group"
                >
                  <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </header>

            {/* Body */}
            <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
              {/* Insert your sidebar content here */}
              <div
                className="hs-accordion-group pb-0 px-2 w-full flex flex-col flex-wrap h-full"
                data-hs-accordion-always-open
              >
                <div className="h-full flex flex-col justify-between">
                  <ul className="space-y-1">
                    {/* Use JSX to continue rendering the accordion structure from your original HTML */}
                    {/* Make sure to update all class to className, self-close svg/path elements, and fix camelCase attributes */}

                    <li>
                      <button
                        className="w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white hover:cursor-pointer"
                        onClick={() => router.push("/admin")}
                      >
                        <HomeIcon className="size-5" aria-hidden="true" />
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        className="hover:cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white"
                        onClick={() => router.push("/admin/project")}
                      >
                        <NewspaperIcon className="size-5" aria-hidden="true" />
                        Projects
                      </button>
                    </li>
                    <li>
                      <button
                        className="hover:cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white"
                        onClick={() => router.push("/admin/list")}
                      >
                        <Square3Stack3DIcon
                          className="size-5"
                          aria-hidden="true"
                        />
                        Parts
                      </button>
                    </li>
                  </ul>
                  <div className="pb-10">
                    <button className="hover:cursor-pointer w-full flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white">
                      <Cog6ToothIcon className="size-5" aria-hidden="true" />
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </>
    </div>
  );
};

export default SidebarComponent;
