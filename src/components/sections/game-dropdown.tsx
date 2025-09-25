import React from 'react';
import { ChevronRight } from 'lucide-react';

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

export default function GameDropdown() {
  return (
    <div className="absolute top-full left-0 mt-0 z-50 bg-white border border-border rounded-lg shadow-lg py-4 w-[600px] flex transition-opacity duration-300">
      {dropdownLinks.map((column, colIndex) => (
        <div key={colIndex} className={`flex-1 px-8 ${colIndex === 0 ? 'border-r border-border' : ''}`}>
          <h3 className="font-bold text-lg mb-4 text-primary">{column.category}</h3>
          <ul className="space-y-2">
            {column.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <a href={link.href} className="flex items-center justify-between text-gray-700 hover:text-metacritic-orange-500 hover:underline transition-colors duration-200">
                  {link.text}
                  <ChevronRight size={16} className="text-gray-400" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
