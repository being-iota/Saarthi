/** @type {import('next').NextConfig} */
const isAuthorized = 
  process.env.SHIKSHAK_SAARTHI_LOCK === 'uu-shikshak-saarthi-authorized' ||
  process.env.VERCEL_GIT_REPO_OWNER === 'being-iota' ||
  process.env.VERCEL_GIT_REPO_OWNER === 'ratnapriya2954-1016';

if (!isAuthorized) {
  console.error('\n\x1b[31m%s\x1b[0m', '=======================================================');
  console.error('\x1b[31m%s\x1b[0m', '🛑 ERROR: UNAUTHORIZED SETUP & EXECUTION PREVENTED.');
  console.error('\x1b[31m%s\x1b[0m', 'This project is proprietary and locked.');
  console.error('\x1b[31m%s\x1b[0m', '=======================================================\n');
  process.exit(1);
}

const nextConfig = {};

export default nextConfig;

