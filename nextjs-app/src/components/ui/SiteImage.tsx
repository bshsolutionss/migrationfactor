import React from 'react';
import Image from 'next/image';
import { images } from '@/lib/constants';

interface SiteImageProps {
  slot: string;
  className?: string;
  eager?: boolean;
}

export default function SiteImage({ slot, className = '', eager = false }: SiteImageProps) {
  const im = images[slot];
  if (!im) return null;
  return (
    <Image
      className={className}
      src={im.src}
      alt={im.alt}
      width={im.width}
      height={im.height}
      priority={eager}
      loading={eager ? 'eager' : 'lazy'}
      style={{ objectPosition: 'center' }}
    />
  );
}
