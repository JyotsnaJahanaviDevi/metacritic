"use client";

import { Facebook, Twitter, Instagram } from 'lucide-react';
import React from 'react';
import Image from "next/image";
import Link from "next/link";

const WatchtubeLogo = () => (
  <Link href="/" className="flex items-center gap-2">
    <Image
      src="/logo.png"   // path in public folder
      alt="Watchtube Logo"
      width={250}       // adjust as needed
      height={250}      // adjust as needed
      className="object-contain"
    />
    {/* <span className="text-primary-foreground text-[28px] font-bold tracking-tighter lowercase">
      watchtube
    </span> */}
  </Link>
);

const GamespotLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 125 18" fill="currentColor">
    <path d="M5.568 0C2.493 0 0 2.493 0 5.568v6.864C0 15.507 2.493 18 5.568 18h113.864c3.075 0 5.568-2.493 5.568-5.568V5.568C125 2.493 122.507 0 119.432 0H5.568z"></path>
    <path fill="#fff" d="M10.15 13.935h-3.3V4.004h3.3v9.931zm13.11-9.931c-3.15 0-5.325 2.505-5.325 5.01 0 2.626 2.31 5.01 5.4 5.01 1.965 0 3.375-.824 4.14-1.92l-1.995-1.125c-.525.645-1.2 1.05-2.145 1.05-1.53 0-2.31-1.395-2.31-2.925h6.6v-.33c0-2.385-1.89-5.01-4.77-5.01zm-2.07 3.9h3.9c-.045-1.125-.795-1.92-1.95-1.92-1.155.03-1.8.825-1.95 1.92zm17.58-.285c.42.06.78.135.78.585s-.255.51-.78.585v.045c.81.105 1.155.45 1.155 1.14 0 .975-.975 1.425-2.22 1.425-2.43 0-2.97-2.13-2.97-3.9 0-2.04 1.17-3.81 3.255-3.81 1.32 0 2.19.48 2.595 1.14l-1.74.855c-.21-.42-.645-.615-1.02-.615-.81 0-1.035.78-1.035 1.62 0 1.23.48 1.95 1.29 1.95.735 0 .96-.45.96-1.02 0-.345-.12-.555-.84-.555v-.3h.015zm9.33-3.615c-3.15 0-5.325 2.505-5.325 5.01 0 2.626 2.31 5.01 5.4 5.01 1.965 0 3.375-.824 4.14-1.92l-1.995-1.125c-.525.645-1.2 1.05-2.5 1.05-1.53 0-2.31-1.395-2.31-2.925h6.6v-.33c0-2.385-1.89-5.01-4.77-5.01zm-2.07 3.9h3.9c-.045-1.125-.795-1.92-1.95-1.92-1.155.03-1.8.825-1.95 1.92zm11.385-3.9h3.3v6.3c0 2.25 1.155 3.3 2.97 3.3.93 0 1.575-.15 2.055-.375v-2.01c-.3.09-.78.18-1.155.18-.75 0-1.05-.39-1.05-1.5v-5.97h3.39V4.004h-3.39v-.96h-3.81v.96H51.46v9.93h3.33V6.525c0-1.335.81-2.16 2.01-2.16.585 0 1.17.21 1.62.6V4.44a3.839 3.839 0 00-2.4-.6c-2.4 0-3.69 1.425-3.69 3.66v6.435h3.3V4.004h-3.3l.001zM79.465 4.004h-3.3v9.93h3.3v-9.93zm-8.07 1.56c-1.35-.915-2.985-1.185-4.23-1.185-2.43 0-4.08 1.425-4.08 3.555v6.005h3.3V8.054c0-1.155.675-1.83 1.665-1.83.69 0 1.275.24 1.77.675v5.03h3.3V4.244l-1.725 1.32zM91.805 8.94c0-2.88-2.07-5.01-5.115-5.01-3.03 0-5.1 2.13-5.1 5.01s2.07 5.01 5.1 5.01c3.045 0 5.115-2.13 5.115-5.01zm-3.345.03c0 1.575-1.02 2.67-2.04 2.67-1.035 0-2.055-1.095-2.055-2.67 0-1.575 1.02-2.67 2.055-2.67 1.02 0 2.04 1.095 2.04 2.67zM102.395 8.94c0-2.88-2.07-5.01-5.115-5.01-3.03 0-5.1 2.13-5.1 5.01s2.07 5.01 5.1 5.01c3.045 0 5.115-2.13 5.115-5.01zm-3.345.03c0 1.575-1.02 2.67-2.04 2.67-1.035 0-2.055-1.095-2.055-2.67 0-1.575 1.02-2.67 2.055-2.67 1.02 0 2.04 1.095 2.04 2.67zm12.39-5.22c-1.35-.915-2.985-1.185-4.23-1.185-2.43 0-4.08 1.425-4.08 3.555v6.005h3.3V8.054c0-1.155.675-1.83 1.665-1.83.69 0 1.275.24 1.77.675v5.03h3.3V4.244l-1.725 1.32zm9.15 5.22h-3.3V4.004h3.3v9.93z"></path>
  </svg>
);

const TvGuideLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 83 23" fill="currentColor">
    <path d="M12 21.9c-5.1 0-8.8-3.4-8.8-8.1 0-5.3 4.2-7.9 8.1-7.9 2.5 0 4.2.9 5.3 2l-2.6 1.8c-.8-1.1-1.8-1.5-2.7-1.5-2.5 0-3.5 1.5-3.5 4.6h8.7v.5c0 4.5-2.8 8.6-8.5 8.6zM9.4 12c.1-1.9 1-3.3 2.7-3.3s2.4 1.3 2.6 3.3H9.4zm10.7-5.9h3.6l-.1 15.8h-3.6l.1-15.8zM26.4 0v21.8h11.9v-3.4h-8.3V.1l8.3-.1v-3.4H26.4v3.4zm14.8 6.1h3.6l-.1 15.8h-3.6l.1-15.8z"></path>
    <path d="M49 14.2c2.9 0 4.7-1.9 4.7-4.7s-1.9-4.8-4.7-4.8-4.7 1.9-4.7 4.8 1.8 4.7 4.7 4.7zm0-12.6c4.6 0 8.1 3.2 8.1 8.2s-3.5 8.2-8.1 8.2-8.1-3.2-8.1-8.2 3.5-8.2 8.1-8.2zm11.7.3l.1 12.3h-3.6l-.1-12.3h3.6zm13.7 8.3c1.7 0 2.2-1.1 2.2-2.3v-6h3.6v6.2c0 3.3-2.1 5.6-5.8 5.6-3.8 0-5.8-2.2-5.8-5.6V2h3.6v6c0 1.2.6 2.3 2.2 2.3z"></path>
  </svg>
);

const GameFaqsLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120.3 14" fill="currentColor">
    <path d="M11.6 14C5.2 14 0 10.9 0 7c0-3.9 5.2-7 11.6-7 4.3 0 8.3 1.4 8.3 1.4L18.6 3C18.6 3 14.5 1.5 11.6 1.5 6 1.5.8 4.1.8 7c0 2.9 5.2 5.5 10.8 5.5 2.9 0 7-1.5 7-1.5l1.3 1.6s-4 1.4-8.3 1.4zM24.7 1.6h2.1v10.8h-2.1z M35.6 1.6h2.2L35 7l2.8 5.4h-2.2L33.7 8l-2 4.4h-2.2L32.2 7l-2.7-5.4h2.2l1.9 4.4 1.9-4.4z M52.5 7.1c0-3.2-2.1-5.5-5.2-5.5-3 0-5.2 2.3-5.2 5.5s2.2 5.5 5.2 5.5c3.1 0 5.2-2.3 5.2-5.5zm-2.1 0c0 2-1.3 3.6-3.1 3.6s-3.1-1.6-3.1-3.6 1.3-3.6 3.1-3.6 3.1 1.6 3.1 3.6z M57.2 1.6h2.1v10.8h-2.1z M61.6 8.7V1.6h2.1v7.1c0 2 1.3 2.9 3 2.9.8 0 1.4-.2 1.4-.2V13s-.6.2-1.4.2c-1.6 0-3-1-3-2.9z M79.4 1.6h-4.3l2.2 5.4z M76.3 12.4h2.2L74.8 7l3.7-5.4h-4.3L72.1 7l-3.7 5.4h4.3L76.3 7l-2-5.4h2.2l1.9 4.4z M90.4 7.1c0-3.2-2.1-5.5-5.2-5.5-3 0-5.2 2.3-5.2 5.5s2.2 5.5 5.2 5.5c3.1 0 5.2-2.3 5.2-5.5zm-2.1 0c0 2-1.3 3.6-3.1 3.6s-3.1-1.6-3.1-3.6 1.3-3.6 3.1-3.6 3.1 1.6 3.1 3.6z M100.8 1.8c.3.1.5.2.5.4s-.2.4-.5.4v0c.5.1.8.3.8.8 0 .7-.7 1-1.5 1-1.6 0-2-1.5-2-2.8s.8-2.7 2.2-2.7c.9 0 1.5.3 1.8.8l-1.2.6c-.1-.3-.4-.4-.7-.4-.5 0-.7.6-.7 1.2s.3 1.4.9 1.4c.5 0 .6-.3.6-.7s-.1-.4-.6-.4v-.2h0z M109.1 1.6h-4.3l2.2 5.4z M106.1 12.4h2.2l-3.7-5.4 3.7-5.4h-4.3L101.9 7l-3.7 5.4h4.3l2.1-5.4-2 5.4h2.2l1.9-4.4z M118.2 1.6h2.1v10.8h-2.1z"></path>
  </svg>
);

const overviewLinks = [
  { href: "/about-us", text: "About" },
  { href: "/help", text: "Help Center", target: "_blank" },
  { href: "/careers", text: "Careers", target: "_blank" },
  { href: "https://www.fandom.com/privacy-policy-pp1", text: "Privacy Policy", target: "_blank" },
  { href: "/digital-services-act", text: "Digital Services Act" },
  { href: "https://www.fandom.com/terms-of-use", text: "Terms of Use", target: "_blank" },
];

const socialLinks = [
  { href: "https://www.facebook.com/metacritic", icon: Facebook, label: "Facebook" },
  { href: "https://twitter.com/metacritic", icon: Twitter, label: "Twitter" },
  { href: "https://www.instagram.com/metacritic/", icon: Instagram, label: "Instagram" },
];

const brandLinks = [
    { href: "https://www.gamespot.com/?mc_cid=mc_gamespot", logo: GamespotLogo, label: "Gamespot", className: "w-auto h-[18px]" },
    { href: "https://www.tvguide.com/?mc_cid=mc_tvguide", logo: TvGuideLogo, label: "TV Guide", className: "w-auto h-[23px]" },
    { href: "https://gamefaqs.gamespot.com/?mc_cid=mc_gamefaqs", logo: GameFaqsLogo, label: "GameFAQs", className: "w-auto h-[14px]" },
  ];

const Footer = () => {
  return (
    <footer className="bg-background text-foreground">
      <div className="h-2 w-full bg-gradient-to-r from-[#00ce7a] via-[#ffcc33] to-[#ff6874] mb-8"></div>
      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-center mb-8">
          <a href="/" aria-label="Home">
            <WatchtubeLogo />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left mb-12">
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Overview</h3>
            <ul className="space-y-2 text-xs">
              {overviewLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.target}
                    rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="text-foreground hover:text-primary hover:underline"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
               <li>
                  <button className="bg-transparent border-none p-0 text-foreground hover:text-primary hover:underline text-xs cursor-pointer">
                    Manage Cookies
                  </button>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Follow Us</h3>
            <ul className="flex justify-center md:justify-start space-x-6">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-foreground hover:text-primary"
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Explore Other Brands</h3>
            <ul className="flex justify-center md:justify-start items-center space-x-6">
              {brandLinks.map((brand) => (
                <li key={brand.label}>
                  <a
                    href={brand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={brand.label}
                    className="text-foreground hover:text-primary"
                  >
                    <brand.logo className={brand.className} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center text-[11px] text-muted-foreground space-y-2">
            <p>Video and Images from IVA &amp; Xperi</p>
            <p>
                Movie title data and credits provided by <a href="https://imdb.com" target="_blank" rel="noopener noreferrer" className="underline">IMDb</a>
            </p>
            <p>© {new Date().getFullYear() + 1} FANDOM, INC. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;