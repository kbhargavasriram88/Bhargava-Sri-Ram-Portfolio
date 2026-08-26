import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bhargavtech.portfolio',
  appName: 'Bhargav Tech',
  webDir: 'out',
  server: {
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
