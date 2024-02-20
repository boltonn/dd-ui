"use client";
import { HiOutlineChatBubbleBottomCenter, HiEnvelope, HiPhoto, HiVideoCamera, HiMapPin } from "react-icons/hi2";
import { SiGraphql } from "react-icons/si";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const navbarItems = [{
        label: 'Chats',
        href: '/chats',
        icon: HiOutlineChatBubbleBottomCenter,
    },
    {
        label: 'Emails',
        href: '/emails',
        icon: HiEnvelope,
    },
    {
        label: 'Images',
        href: '/images',
        icon: HiPhoto,
    },
    {
        label: 'Videos',
        href: '/videos',
        icon: HiVideoCamera,
    },
    {
        label: 'Networks',
        href: '/networks',
        icon: SiGraphql,
    },
    {
        label: 'Locations',
        href: '/locations',
        icon: HiMapPin,
    }
]


export default function Navbar() {
    const pathname = usePathname();

    return navbarItems?.length ? (
        <nav className='flex items-center justify-center px-4 mx-auto overflow-x-auto text-l whitespace-nowrap'>
            {navbarItems.map((item, index) => (
                <Link
                    key={index}
                    className={`hover:cursor-pointer hover:text-violet-500 dark:hover:text-violet-300 flex flex-col items-center justify-center w-16 h-16 group ${pathname === item.href ? 'text-violet-700 ' : 'dark:text-gray-200'}`}
                    href={item.href}
                >
                    <item.icon size={24} className="flex-none w-6 h-6 group-hover:cursor-pointer" />
                    <span className="pl-1 text-xs group-hover:cursor-pointer">{item.label}</span>
                </Link>
            ))}
        </nav>
    ) : null;
}