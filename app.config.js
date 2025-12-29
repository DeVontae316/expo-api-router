module.exports = ({ config }) => {
  // Determine the API origin based on environment
  const env = process.env.APP_VARIANT;

  const apiOrigin = {
    development: "http://localhost:8082",
    preview: "https://codewithtae-expo-api-route--staging.expo.app/",
    production: "https://codewithtae-expo-api-route.expo.app/",
  };

  return {
    expo: {
      name: "expo-api-route",
      slug: "expo-api-route",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "expoapiroute",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.codewithtae.expoapiroute",
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false,
        package: "com.codewithtae.expoapiroute",
      },
      web: {
        bundler: "metro",
        output: "server",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [["expo-router", { origin: apiOrigin[env] }]],

      updates: {
        url: "https://u.expo.dev/d8c79c18-7235-46e2-b50b-7eb21c0e70c3",
      },
      runtimeVersion: {
        policy: "appVersion",
      },
      experiments: {
        typedRoutes: true,
      },
      extra: {
        router: {},
        eas: {
          projectId: "d8c79c18-7235-46e2-b50b-7eb21c0e70c3",
        },
        apiOrigin,
        env,
      },
      owner: "codewithtae",
    },
  };
};
