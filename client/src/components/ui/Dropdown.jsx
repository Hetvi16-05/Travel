import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export function Dropdown({ trigger, items, className }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as={Fragment}>
          {trigger || (
            <button className="inline-flex w-full justify-center rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 border border-white/10 transition-colors">
              Options
              <ChevronDown
                className="ml-2 -mr-1 h-5 w-5 text-white/50"
                aria-hidden="true"
              />
            </button>
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95 -translate-y-2"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 -translate-y-2"
      >
        <Menu.Items
          className={cn(
            "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-white/5 rounded-xl bg-[#111827] shadow-[0_16px_48px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
            className
          )}
        >
          <div className="px-1 py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={cn(
                      active ? "bg-primary/20 text-white" : "text-white/70",
                      "group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(
                          "mr-2 h-4 w-4",
                          active ? "text-primary-300" : "text-white/40"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
