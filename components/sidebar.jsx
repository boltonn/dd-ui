"use client";
import { useState } from "react";
import { HiChevronDoubleLeft, HiHome, HiCog, HiInformationCircle, HiMiniMagnifyingGlass } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import Link from "next/link";

const sidebarItems = [
    {
        label: 'Home',
        href: '/',
        icon: HiHome,
    },
    {
        label: 'Search',
        href: '/search',
        icon: HiMiniMagnifyingGlass,
    },
    {
        label: 'Developer',
        href: '/developer',
        icon: HiCog,
    },
    {
        label: 'About',
        href: '/about',
        icon: HiInformationCircle,
    }
]

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return sidebarItems?.length ? (
        <div className={`relative duration-300 h-screen bg-violet-950 bg-opacity-10 shadow-md border-r mb-3 border-r-violet-700 ${isOpen ? "w-64" : "w-20"} border-r-violet-100`}>
            <HiChevronDoubleLeft
                onClick={toggleSidebar} 
                size={24}
                className={`absolute mt-2 cursor-pointer rounded-full -right-[12px] dark:bg-black bg-white ${isOpen ? "rotate-180" : ""}`}
            />
            <div className="flex flex-col items-center justify-center pt-6">
                {sidebarItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`group flex items-center w-full h-12 ${pathname === item.href ? "bg-muted" : ""}`}
                    >
                        <item.icon size={24} className="ml-7 dark:text-white group-hover:text-violet-500" />
                        {isOpen ? <span className="ml-2 dark:text-white group-hover:text-violet-500">{item.label}</span> : null}
                    </Link>
                ))}
            </div>
        </div>
    ) : null;
}