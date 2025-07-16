import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

type BreadcrumbProps = {
  title: string;
  href?: string;
  onClick?: () => void;
  isHighlighted?: boolean;
  isDisabled?: boolean;
};

type Breadcrumb = {
  items: BreadcrumbProps[];
};
const Breadcrumb = ({ items }: Breadcrumb) => {
  const router = useRouter();
  return (
    <div>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {items?.length > 0 &&
            items?.map((item, idx) => (
              <li className="inline-flex items-center" key={idx}>
                <button
                  onClick={() => {
                    router.push(item.href || "#");
                  }}
                  className={`inline-flex items-center text-sm font-medium ${
                    item?.isHighlighted ? "text-gray-700" : "text-gray-400"
                  } hover:text-blue-600 dark:text-gray-400 dark:hover:text-white`}
                >
                  <ChevronRightIcon className="size-5" />
                  {item.title}
                </button>
              </li>
            ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
