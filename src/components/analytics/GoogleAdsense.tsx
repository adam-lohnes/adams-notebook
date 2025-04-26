'use client';

import Script from 'next/script';

export function GoogleAdsense() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8735246803774836"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
} 