'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import { company, navigation, services, countries } from '@/lib/constants';

export default function Header() {
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState<{ name: string; path: string } | null>(null);
  const menus: Record<string, [string, string][]> = {
    Services: services.map(service => [service.name, `/services/${service.slug}/`]),
    Countries: countries.map(country => [country.name, `/countries/#country-${country.code}`]),
  };

  useEffect(() => {
    const header = document.querySelector('.header') as HTMLElement | null;
    const back = document.querySelector('.back-top') as HTMLElement | null;

    const scrollState = () => {
      if (header) header.classList.toggle('scrolled', scrollY > 34);
      if (back) back.classList.toggle('visible', scrollY > 650);
    };
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; scrollState(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    scrollState();

    const toggle = document.querySelector('.menu-toggle') as HTMLButtonElement | null;
    const nav = document.querySelector('#primary-nav') as HTMLElement | null;
    const mq = matchMedia('(min-width:1024px)');

    const closeMenu = () => {
      if (!toggle || !nav) return;
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      nav.inert = !mq.matches;
      const srOnly = toggle.querySelector('.sr-only');
      if (srOnly) srOnly.textContent = 'Open navigation';
    };

    const handleToggle = () => {
      if (!toggle || !nav) return;
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      if (open) nav.style.setProperty('--menu-height', `${nav.scrollHeight}px`);
      nav.classList.toggle('open', open);
      nav.inert = !open && !mq.matches;
      const srOnly = toggle.querySelector('.sr-only');
      if (srOnly) srOnly.textContent = open ? 'Close navigation' : 'Open navigation';
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (e.target instanceof Element) e.target.closest('.nav-item')?.querySelector<HTMLButtonElement>('.nav-dropdown-toggle')?.focus();
        setDropdown(null);
      }
      if (e.key === 'Escape' && nav?.classList.contains('open')) {
        closeMenu();
        toggle?.focus();
      }
    };

    const handleDocClick = (e: MouseEvent) => {
      if (nav && !nav.contains(e.target as Node)) setDropdown(null);
      if (header && !header.contains(e.target as Node)) closeMenu();
    };

    closeMenu();
    mq.addEventListener('change', closeMenu);

    toggle?.addEventListener('click', handleToggle);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleDocClick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(scrollFrame);
      toggle?.removeEventListener('click', handleToggle);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleDocClick);
      mq.removeEventListener('change', closeMenu);
    };
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="topbar">
        <div className="container">
          <a href={`mailto:${company.email}`}>
            <Icon type="mail" />
            {company.email}
          </a>
          <span>
            <Icon type="clock" />
            {company.hours}
          </span>
          <span className="top-location">Perth &amp; Melbourne, Australia</span>
          <a className="topbar-phone" href={`tel:${company.tel}`}>
            <Icon type="phone" />
            {company.phone}
          </a>
        </div>
      </div>
      <header className="header" id="header">
        <div className="nav-shell container">
          <Link className="brand" href="/" aria-label="Migration Factor home">
            <Image
              className="brand-mark"
              src="/brand/mark.webp"
              width={200}
              height={200}
              alt=""
              decoding="async"
              priority={false}
            />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-controls="primary-nav"
            aria-expanded="false"
          >
            <span className="hamburger" />
            <span className="sr-only">Open navigation</span>
          </button>
          <nav id="primary-nav" aria-label="Main navigation">
            {navigation.map(([name, url]) => {
              const route = url === '/' ? '/' : url.replace(/\/$/, '');
              const isPage = pathname === route;
              const isSection = route !== '/' && pathname.startsWith(`${route}/`);
              const menu = menus[name];
              const expanded = dropdown?.name === name && dropdown.path === pathname;
              const link = <Link href={url} aria-current={isPage ? 'page' : isSection ? 'true' : undefined}>{name}</Link>;
              if (menu) return (
                <div className="nav-item" key={url}>
                  <div className="nav-item-label">{link}
                    <button className="nav-dropdown-toggle" type="button" aria-label={`Open ${name} menu`} aria-expanded={expanded} aria-controls={`nav-${name.toLowerCase()}`}
                      onClick={() => setDropdown(expanded ? null : { name, path: pathname })}>
                      <span className="nav-chevron" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="nav-submenu" id={`nav-${name.toLowerCase()}`} hidden={!expanded}>
                    {menu.map(([label, href]) => <Link key={href} href={href} onClick={() => setDropdown(null)}>{label}</Link>)}
                  </div>
                </div>
              );
              return (
                <Link
                  key={url}
                  href={url}
                  aria-current={isPage ? 'page' : isSection ? 'true' : undefined}
                >
                  {name}
                </Link>
              );
            })}
          </nav>
          <a className="header-phone" href={`tel:${company.tel}`}>
            <Icon type="phone" />
            <span>
              <small>Talk to our team</small>
              <strong>{company.phone}</strong>
            </span>
          </a>
        </div>
      </header>
    </>
  );
}
