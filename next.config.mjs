/** @type {import('next').NextConfig} */
if (process.env.SHIKSHAK_SAARTHI_LOCK !== 'uu-shikshak-saarthi-authorized') {
  console.error('\n\x1b[31m%s\x1b[0m', '=======================================================');
  console.error('\x1b[31m%s\x1b[0m', '🛑 ERROR: UNAUTHORIZED SETUP & EXECUTION PREVENTED.');
  console.error('\x1b[31m%s\x1b[0m', 'This project is proprietary and locked.');
  console.error('\x1b[31m%s\x1b[0m', '=======================================================\n');
  process.exit(1);
}

const nextConfig = {};

export default nextConfig;

