"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Games', href: '/game' },
    { name: 'Movies', href: '/movie' },
    { name: 'TV Shows', href: '/tv' },
    { name: 'Music', href: '/music' },
    { name: 'News', href: '/news' },
];

const MetacriticLogo = () => (
    <Link href="/" className="flex items-center gap-2">
        <div className="w-9 h-9 bg-chart-2 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-xl leading-none">m</span>
        </div>
        <span className="text-primary-foreground text-[28px] font-bold tracking-tighter lowercase">metacritic</span>
    </Link>
);


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-primary text-primary-foreground sticky top-0 z-50">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Left Section: Logo */}
                    <div className="flex-shrink-0">
                        <MetacriticLogo />
                    </div>

                    {/* Center Section: Navigation (Desktop) */}
                    <nav className="hidden md:flex flex-1 justify-center px-4">
                        <ul className="flex items-center space-x-8">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-base font-bold hover:opacity-80 transition-opacity">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Right Section: Search and Register (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-background text-foreground rounded-full h-9 w-[240px] pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring border-transparent"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                        <Link
                            href="#"
                            className="bg-chart-2 text-primary font-bold text-sm px-5 h-9 flex items-center rounded-md hover:opacity-90 transition-opacity"
                        >
                            Register
                        </Link>
                    </div>

                     {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary border-t border-gray-800">
                    <div className="px-4 pt-4 pb-6 space-y-4">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search"
                                className="bg-background text-foreground rounded-full h-9 w-full pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                        <nav>
                            <ul className="flex flex-col space-y-4 items-start">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="block text-base font-bold hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <Link
                            href="#"
                            className="bg-chart-2 text-primary font-bold text-sm w-full block text-center py-2 rounded-md hover:opacity-90 transition-opacity"
                             onClick={() => setIsMenuOpen(false)}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}