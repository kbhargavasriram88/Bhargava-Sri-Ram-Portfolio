import type { CapacitorConfig } from '@capacitor/cli';

// Only use a live URL if explicitly configured via environment variable
const serverUrl = process.env.CAPACITOR_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || undefined;

const config: CapacitorConfig = {
  appId: 'com.bhargavtech.portfolio',
  appName: 'Bhargav Tech',
  webDir: 'out',
  server: serverUrl
    ? {
        url: serverUrl,
        cleartext: true,
        errorPath: 'index.html',
      }
    : {
        errorPath: 'index.html',
      },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: '#020617',
      showSpinner: false,
    },
  },
};

export default config;
