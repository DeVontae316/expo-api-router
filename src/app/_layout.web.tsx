import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../utils/unistyles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function RootLayoutWeb() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="events" options={{ title: "Events" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
      </Stack>
    </QueryClientProvider>
  );
}
