import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.brand,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
    marginBottom: theme.spacing.xl,
  },
  logoWrap: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  logo: {
    width: 62,
    height: 62,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 0.2,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: theme.spacing.md,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  message: {
    marginBottom: theme.spacing.md,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
  },
  messageError: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },
  messageSuccess: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },
  messageText: {
    fontSize: 13,
    fontWeight: "600",
  },
  messageTextError: {
    color: "#991B1B",
  },
  messageTextSuccess: {
    color: "#065F46",
  },
  label: {
    color: theme.colors.label,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    fontSize: 16,
    color: theme.colors.textOnLight,
    marginBottom: theme.spacing.md,
    backgroundColor: "#fff",
  },
  primaryButton: {
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.brandDark,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.xs,
    shadowColor: theme.colors.brandDark,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    height: 48,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.brandDark,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.md,
  },
  secondaryButtonText: {
    color: theme.colors.brandDark,
    fontSize: 16,
    fontWeight: "700",
  },
  link: {
    marginTop: theme.spacing.md,
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
  },
  linkText: {
    color: theme.colors.brandDark,
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    alignItems: "center",
  },
  footerText: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  footerRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  badgeText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
  },
}));

export default function LoginScreenIOS() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [notice, setNotice] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const getValidatedCredentials = (options?: {
    requireValidEmail?: boolean;
    minPasswordLength?: number;
  }) => {
    const email = credentials.email.trim();
    const password = credentials.password.trim();

    if (!email && !password) throw new Error("Email and password are required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    if (options?.requireValidEmail && !email.includes("@")) {
      throw new Error("A valid email is required");
    }

    if (
      typeof options?.minPasswordLength === "number" &&
      password.length < options.minPasswordLength
    ) {
      throw new Error(
        `Password must be at least ${options.minPasswordLength} characters`
      );
    }

    return { email, password };
  };

  const login = useMutation({
    mutationFn: async () => {
      getValidatedCredentials();
      await new Promise((r) => setTimeout(r, 400));
      return { ok: true };
    },
    onMutate: () => setNotice(null),
    onSuccess: () =>
      setNotice({
        type: "success",
        message: "Logged in (stub). Wire this to your auth API next please!!!.",
      }),
    onError: (error) =>
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
  });

  const signUp = useMutation({
    mutationFn: async () => {
      const { email, password } = getValidatedCredentials({
        requireValidEmail: true,
        minPasswordLength: 8,
      });
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json().catch(() => null)) as any;

      if (!response.ok) {
        const errorMessage =
          typeof data?.error === "string"
            ? data.error
            : `Request failed (${response.status})`;
        throw new Error(errorMessage);
      }

      return data as { ok: true; user: { id: string; email: string } };
    },
    onMutate: () => setNotice(null),
    onSuccess: (data) =>
      setNotice({
        type: "success",
        message: `Signed up. Created ${data.user.email}.`,
      }),
    onError: (error) =>
      setNotice({
        type: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
  });

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: "height" })}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.logoWrap}>
              <Image
                source={require("../../../assets/images/icon.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>SuperMetric</Text>
            <Text style={styles.subtitle}>
              Illuminating aspiring, current, & former superintendent stories
              with purpose and integrity.
            </Text>
          </View>

          <View style={styles.card}>
            {!!notice && (
              <View
                style={[
                  styles.message,
                  notice.type === "error"
                    ? styles.messageError
                    : styles.messageSuccess,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    notice.type === "error"
                      ? styles.messageTextError
                      : styles.messageTextSuccess,
                  ]}
                >
                  {notice.message}
                </Text>
              </View>
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              value={credentials.email}
              onBlur={() =>
                setCredentials((prev) => ({
                  ...prev,
                  email: prev.email.trim(),
                }))
              }
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, email: text }))
              }
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              returnKeyType="next"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={credentials.password}
              onBlur={() =>
                setCredentials((prev) => ({
                  ...prev,
                  password: prev.password.trim(),
                }))
              }
              onChangeText={(text) =>
                setCredentials((prev) => ({ ...prev, password: text }))
              }
              autoComplete="password"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              style={styles.input}
              returnKeyType="done"
              onSubmitEditing={() => login.mutate()}
            />

            <Pressable
              disabled={login.isPending}
              onPress={() => login.mutate()}
              style={[
                styles.primaryButton,
                { opacity: login.isPending ? 0.6 : 1 },
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {login.isPending ? "Logging in…" : "Log in"}
              </Text>
            </Pressable>

            <Pressable
              disabled={signUp.isPending}
              onPress={() => signUp.mutate()}
              style={[
                styles.secondaryButton,
                { opacity: signUp.isPending ? 0.6 : 1 },
              ]}
            >
              <Text style={styles.secondaryButtonText}>
                {signUp.isPending ? "Signing up…" : "Sign up"}
              </Text>
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert("Help", "Add password reset/help next.")
              }
              style={styles.link}
            >
              <Text style={styles.linkText}>Need help signing in?</Text>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Secure platform for superintendent research and insights
              </Text>
              <View style={styles.footerRow}>
                <View style={styles.badge}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                  <Text style={styles.badgeText}>Encrypted</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                  <Text style={styles.badgeText}>Private</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                  <Text style={styles.badgeText}>Research-backed</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
