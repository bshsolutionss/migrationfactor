import React from 'react';

// Native flags avoid the country-code letters shown by Windows flag emoji.
function star(
  x: number,
  y: number,
  radius: number,
  fill: string,
  stroke = '',
  strokeWidth = 0
): string {
  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (i * 36 - 90) * (Math.PI / 180);
    const r = i % 2 ? radius * 0.382 : radius;
    return `${(x + Math.cos(angle) * r).toFixed(2)},${(y + Math.sin(angle) * r).toFixed(2)}`;
  }).join(' ');
  return `<polygon points="${points}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="${strokeWidth}"` : ''}/>`;
}

function getFlagArtwork(code: string): string {
  if (code === 'US') {
    let artwork =
      '<rect width="100" height="100" fill="#fff"/>' +
      Array.from(
        { length: 7 },
        (_, i) => `<rect y="${i * (200 / 13)}" width="100" height="${100 / 13}" fill="#b22234"/>`
      ).join('') +
      '<rect width="40" height="53.85" fill="#3c3b6e"/>';
    artwork += Array.from({ length: 9 }, (_, row) =>
      Array.from({ length: row % 2 ? 5 : 6 }, (_, col) =>
        star((row % 2 ? 6.67 : 3.33) + col * 6.67, 3 + row * 5.98, 2.15, '#fff')
      ).join('')
    ).join('');
    return artwork;
  }
  if (code === 'NZ') {
    let artwork =
      '<rect width="100" height="100" fill="#012169"/>' +
      '<svg width="50" height="50" viewBox="0 0 60 30" preserveAspectRatio="none">' +
      '<path d="M0 0 60 30M60 0 0 30" stroke="#fff" stroke-width="6"/>' +
      '<path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" stroke-width="2"/>' +
      '<path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/>' +
      '<path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6"/>' +
      '</svg>';
    artwork += (
      [[75, 22, 5], [62, 43, 4.5], [87, 43, 4], [75, 70, 5.5]] as [number, number, number][]
    )
      .map(([x, y, r]) => star(x, y, r, '#c8102e', '#fff', 1.5))
      .join('');
    return artwork;
  }
  if (code === 'EU') {
    return (
      '<rect width="100" height="100" fill="#003399"/>' +
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        return star(50 + Math.cos(angle) * 28, 50 + Math.sin(angle) * 28, 4.5, '#ffcc00');
      }).join('')
    );
  }
  return '';
}

interface FlagProps {
  code: string;
}

export default function Flag({ code }: FlagProps) {
  const artwork = getFlagArtwork(code);
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable={false}
      dangerouslySetInnerHTML={{
        __html: `<defs><clipPath id="flag-${code}"><circle cx="50" cy="50" r="50"/></clipPath></defs><g clip-path="url(#flag-${code})">${artwork}</g>`,
      }}
    />
  );
}
