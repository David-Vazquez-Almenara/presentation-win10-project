// LinkedInApp.js
import React, { useRef } from 'react';
import '../../CSS/WindowsComponents.css';

const LinkedInApp = () => {
  const iframeRef = useRef(null);

  /**
   * Inject a <base target="_blank"> into the iframe document
   * so all links open in a new browser tab instead of inside the iframe.
   */
  const handleLoad = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument;
      // Avoid duplicate base tags
      if (!doc.querySelector('base[target="_blank"]')) {
        const base = doc.createElement('base');
        base.target = '_blank';
        const head = doc.head;
        head.insertBefore(base, head.firstChild);
      }
    }
  };

  return (
    <div className="window-content">
      <iframe
        ref={iframeRef}
        onLoad={handleLoad}
        src="resources/linkedin.html"
        title="LinkedIn Profile"
        width="100%"
        height="100%"
        frameBorder="0"
        sandbox="allow-same-origin allow-scripts allow-popups"
      />
    </div>
  );
};

export default LinkedInApp;
