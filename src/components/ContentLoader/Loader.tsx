import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#cfcfcf"
    foregroundColor="#ebebeb"
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <circle cx="20" cy="20" r="20" />
    <rect x="51" y="62" rx="3" ry="3" width="88" height="6" />
    <rect x="51" y="80" rx="3" ry="3" width="52" height="6" />
    <circle cx="23" cy="74" r="20" />
    <rect x="51" y="62" rx="3" ry="3" width="88" height="6" />
    <rect x="51" y="80" rx="3" ry="3" width="52" height="6" />
    <circle cx="23" cy="74" r="20" />
    <rect x="53" y="116" rx="3" ry="3" width="88" height="6" />
    <rect x="53" y="134" rx="3" ry="3" width="52" height="6" />
    <circle cx="25" cy="128" r="20" />
    <rect x="56" y="170" rx="3" ry="3" width="88" height="6" />
    <rect x="56" y="188" rx="3" ry="3" width="52" height="6" />
    <circle cx="28" cy="182" r="20" />
  </ContentLoader>
);

export default Loader;
