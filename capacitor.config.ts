import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bhargavtech.portfolio',
  appName: 'Bhargav Tech',
  webDir: 'out',
  server: {
    url: 'https://bhargavtech4-0.netlify.app/', 
    cleartext: true,
  },
};

export default config;
