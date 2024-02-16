"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { Button } from "@/components/ui/button"

export default function DarkModeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? <HiOutlineSun className="w-4 h-4"/> : <HiOutlineMoon className="w-4 h-4"/>}
        </Button>
    )
}
