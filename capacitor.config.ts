import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.liferoute.emergency",
  appName: "LifeRoute",
  webDir: "dist/client",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#020617",
      androidSplashResourceName: "splash",
      showSpinner: false
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#020617"
    }
  }
};

export default config;
