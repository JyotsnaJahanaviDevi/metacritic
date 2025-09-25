"use client";

import { Facebook, Twitter, Instagram } from 'lucide-react';
import React from 'react';

const MetacriticWordmark = () => (
  <span className="font-[Arial] text-4xl font-bold text-black tracking-tighter">metacritic</span>
);
const GamespotLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 1631.76 517.06" aria-hidden="true" class="symbol symbol-logo-outline-full"><path d="M1510 137.41a119.48 119.48 0 0 0-75.43 27l60.12-88.74-111.09 75.38L1411 19.51l-73.82 112.37L1311.82 0l-25.16 131.87-73.71-112 27.2 131.23-110.9-75 60 88.07a119.78 119.78 0 0 0-75.55-26.71c-41.34 0-77.15 20.59-99.43 51.75-22-31.16-58-51.75-99.3-51.75a121.52 121.52 0 0 0-99.24 51.75 121.49 121.49 0 0 0-99.21-51.75c-40.94 0-77.15 20.59-99.33 51.75a120.86 120.86 0 0 0-99-51.75c-41 0-77.23 20.59-99.53 51.75a120.74 120.74 0 0 0-99-51.75c-41 0-77.12 20.59-99.44 51.75a120.69 120.69 0 0 0-99.12-51.75C54.43 137.41 0 191.87 0 258.72S54.43 380 121.12 380a120.32 120.32 0 0 0 99.12-51.62c22.33 31.23 58.49 51.62 99.45 51.62a120.37 120.37 0 0 0 99-51.62C441 359.61 477.28 380 518.25 380a120.49 120.49 0 0 0 99-51.62 121.26 121.26 0 0 0 198.54 0 121.26 121.26 0 0 0 198.54 0c22.28 31.26 58.09 51.62 99.43 51.62 28.3 0 54.33-9.83 75.55-25.91l-60 87.21 111.12-75.21-27.22 131.36 73.73-112.09 25.06 131.7 25.5-131.72 73.71 111.88-27.42-131.37 111.12 75.34-59.15-86.55A121.82 121.82 0 0 0 1510 380c67.4 0 121.71-54.42 121.71-121.26S1577.44 137.41 1510 137.41Zm.76 225.84c-46 0-78.72-26.79-121-53.28l51.68 77.52-79.84-55.27 24.57 98.27-55.27-86-18.36 98.26-18.49-98.26-55.27 86 24.57-98.27-79.85 55.27 51.14-76.71c-42.47 26.22-76.33 52.46-121.17 52.46a104.7 104.7 0 0 1-99.32-71.68 104.65 104.65 0 0 1-198.64 0 104.65 104.65 0 0 1-198.64 0 104.65 104.65 0 0 1-198.64 0 104.65 104.65 0 0 1-198.64 0 104.73 104.73 0 1 1 0-66.1 104.65 104.65 0 0 1 198.64 0 104.65 104.65 0 0 1 198.64 0 104.65 104.65 0 0 1 198.64 0 104.65 104.65 0 0 1 198.64 0 104.7 104.7 0 0 1 99.32-71.68c46.59 0 78.7 26.25 121.17 52.46l-51.14-76.71 79.85 55.28-24.57-98.27 55.27 86 18.38-98.27 18.57 98.28 55.27-86-24.57 98.27 79.84-55.28-50.64 76c42.19-26 78.93-51.72 119.94-51.72a104.73 104.73 0 0 1 0 209.46Z"></path><path d="M136.2 280.15a8.92 8.92 0 0 1-2.94 6.85c-1.92 1.72-4.39 2.16-7.18 2.16a24 24 0 0 1-18.81-8.58c-5.25-5.91-7.81-13.08-7.81-21.85s2.67-16.52 8.4-22.61c6.21-6.63 14.41-10 24.91-10a55.78 55.78 0 0 1 15.21 2 63 63 0 0 1 10.67 3.53l3.81-14.57c-9.32-3.41-14.58-5.11-15.65-5.33-6.91-1.74-15.26-2.47-25.82-2.47-16.12 0-29.36 4.71-39.86 14.36C70.9 233 66 244.69 66 258.6c0 13.6 5.25 25.2 15.2 34.84a52.57 52.57 0 0 0 36.92 14.26 73.35 73.35 0 0 0 15.16-1.85c12.42-2.57 20.39-3.85 23.52-3.85a18.05 18.05 0 0 1 10.4 2.77v-44.54h-31ZM308.4 212.23l-43.31 92.56h18.71l6.92-15h42.42l6.9 15h34.07l-43.5-92.56Zm-9.81 60.86 13.24-28.58 13.32 28.58ZM517.91 252.84l-28.55-40.62h-25.93v92.56h17.13v-51.62l20.14 29.33h17.21l23.56-33.6v55.89h30.91v-92.56h-25.65l-28.82 40.62zM677.93 304.78h76.22v-16.79H709.2v-24.87h31.08v-16.93H709.2v-17.13h44.95v-16.84h-76.22v92.56zM924.15 245.87c-6.33-2.34-10.84-4.62-13.66-6.65s-3.9-4-3.9-5.65a5 5 0 0 1 2.39-4.4 13.87 13.87 0 0 1 6.92-1.63 57.86 57.86 0 0 1 16 2.27 70.33 70.33 0 0 1 14 6.76l8.35-12.57a70.11 70.11 0 0 0-18.25-9.85 66.35 66.35 0 0 0-24.85-4.79q-16.81 0-27.49 8.68c-6.69 5.34-10.17 12-10.17 19.93 0 6.43 2.28 11.89 7 16.89s11.62 9.48 21.33 13c14.46 5.57 21.74 10.1 21.74 13.61a6.14 6.14 0 0 1-3.16 5.53c-2.36 1.72-5.24 2.16-9.21 2.16-6.11 0-11.68-.76-16.67-2.92a54.94 54.94 0 0 1-14.66-8.9l-9.34 11.38a61.93 61.93 0 0 0 18.58 13.18 59.16 59.16 0 0 0 26.15 5.8c13.07 0 23.57-2.92 31.63-8.9 7.49-5.57 11.13-12 11.13-19.48a25.2 25.2 0 0 0-7-17.78c-5.43-6.04-14.22-11.61-26.86-15.67ZM1157.51 221.11c-7.93-6-17.35-8.88-28.29-8.88h-52.83v92.56h31.3v-30.85h21.53c10.94 0 20.36-3.13 28.29-9.21 7.72-6 11.48-13.38 11.48-21.84s-3.76-15.76-11.48-21.78Zm-24.43 31.38a20.71 20.71 0 0 1-13.05 4.11h-12.34v-27.54H1120a22.34 22.34 0 0 1 13.05 4.18c3.55 2.78 5.36 6.19 5.36 9.66.02 3.95-1.79 7.03-5.34 9.58ZM1349.28 223.58c-9.75-9.53-21.94-14.23-36.65-14.23-14.22 0-26.44 4.71-36.61 14.23-9.87 9.66-14.9 21.35-14.9 35s5 25.2 14.9 34.84a52.15 52.15 0 0 0 36.61 14.26c14.7 0 26.9-4.72 36.65-14.26 10.41-9.64 15.33-21.24 15.33-34.84s-5.16-25.34-15.33-35Zm-23.56 56.78c-3.74 6.13-7.95 8.81-12.87 8.81s-9.4-2.61-13.16-8.58a46.53 46.53 0 0 1 0-43.73c4-6.19 8.24-9.33 13.16-9.33s9.57 3.14 13.09 9c3.74 6.09 5.56 13.37 5.56 22 0 8.54-1.81 15.95-5.78 21.83ZM1464.79 229.06h30.32v75.72h30.68v-75.72h30.19v-16.84h-91.19v16.84z"></path></svg>
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
            <MetacriticWordmark />
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