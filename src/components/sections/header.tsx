"use client";

import { useState } from 'react';
import { Search, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const navItems = [
    { name: 'Games', href: '/game' },
    { name: 'Movies', href: '/movie' },
    { name: 'TV Shows', href: '/tv' },
    { name: 'Music', href: '/music' },
    { name: 'News', href: '/news' },
];

const MetacriticLogo = () => (
    <a href="/" className="flex items-center gap-2">
        <div className="w-9 h-9 bg-chart-2 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-xl leading-none">m</span>
        </div>
        <span className="text-primary-foreground text-[28px] font-bold tracking-tighter lowercase">metacritic</span>
    </a>
);


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isGamesHovered, setIsGamesHovered] = useState(false);
    
    const GameDropdown = () => {
        const dropdownLinks = [
            {
                category: 'Explore Games',
                links: [
                    { text: 'Free & Subscription Games', href: '#' },
                    { text: 'Xbox Game Pass', href: '#' },
                    { text: 'Best Games This Year', href: '#' },
                    { text: 'Best Games of All Time', href: '#' },
                    { text: 'Upcoming Releases', href: '#' },
                    { text: 'New PS5 Games', href: '#' },
                    { text: 'New Xbox Series X|S Games', href: '#' },
                    { text: 'New PC Games', href: '#' },
                    { text: 'New Switch/Switch 2 Games', href: '#' },
                    { text: 'See All', href: '#' },
                ],
            },
            {
                category: 'New Game Releases',
                links: [
                    { text: '← Game Calendar', href: '#' },
                    { text: 'FF Tactics: The Ivalice...', href: '#' },
                    { text: 'Hades II', href: '#' },
                    { text: 'Silent Hill f', href: '#' },
                    { text: 'Sonic Racing: Cross...', href: '#' },
                    { text: 'Brotlands 4', href: '#' },
                    { text: 'Hollow Knight: Silk...', href: '#' },
                    { text: 'Trails In The Sky...', href: '#' },
                    { text: 'See All', href: '#' },
                ],
            },
        ];

        return (
            <div className="absolute top-full left-0 mt-0 z-50 bg-background border border-border rounded-lg shadow-lg py-4 w-[600px] flex transition-opacity duration-300">
                {dropdownLinks.map((column, colIndex) => (
                    <div key={colIndex} className={`flex-1 px-8 ${colIndex === 0 ? 'border-r border-border' : ''}`}>
                        <h3 className="font-bold text-lg mb-4 text-foreground">{column.category}</h3>
                        <ul className="space-y-2">
                            {column.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <a href={link.href} className="flex items-center justify-between text-muted-foreground hover:text-metacritic-orange-500 hover:underline transition-colors duration-200">
                                        {link.text}
                                        <ChevronRight size={16} className="text-muted-foreground" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

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
                                <li
                                    key={item.name}
                                    className="relative"
                                    onMouseEnter={() => item.name === 'Games' && setIsGamesHovered(true)}
                                    onMouseLeave={() => item.name === 'Games' && setIsGamesHovered(false)}
                                >
                                    <a href={item.href} className="flex items-center text-base font-bold hover:opacity-80 transition-opacity">
                                        {item.name}
                                    </a>
                                    {item.name === 'Games' && isGamesHovered && <GameDropdown />}
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
                        <a
                            href="#"
                            className="bg-chart-2 text-primary font-bold text-sm px-5 h-9 flex items-center rounded-md hover:opacity-90 transition-opacity"
                        >
                            Register
                        </a>
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
                                        <a href={item.href} className="block text-base font-bold hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <a
                            href="#"
                            className="bg-chart-2 text-primary font-bold text-sm w-full block text-center py-2 rounded-md hover:opacity-90 transition-opacity"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Register
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
