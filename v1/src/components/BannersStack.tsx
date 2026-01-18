'use client';

import DisclaimerBanner from './DisclaimerBanner';
import NicheFocusBanner from './NicheFocusBanner';
import DevModeBanner from './DevModeBanner';

export default function BannersStack() {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3 w-[calc(100vw-32px)] max-w-sm">
      <DisclaimerBanner />
      <NicheFocusBanner />
      <DevModeBanner />
    </div>
  );
}
