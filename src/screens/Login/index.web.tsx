import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

const styles = StyleSheet.create((theme) => ({
  page: {
    flex: 1,
    backgroundColor: "#0b0f1a",
    padding: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 1120,
    maxWidth: "100%",
    minHeight: 680,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    backgroundColor: "#fff",
    flexDirection: "row",
    _web: {
      boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
    },
  },
  left: {
    flex: 1,
    padding: 64,
    justifyContent: "center",
    backgroundColor: theme.colors.brand,
    _web: {
      backgroundImage:
        "linear-gradient(135deg, #2A6E8C 0%, #1F5A78 55%, #164A66 100%)",
    },
  },
  leftInner: {
    maxWidth: 420,
  },
  logoWrap: {
    width: 118,
    height: 118,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    _web: {
      boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
    },
  },
  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 54,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 18,
    fontSize: 20,
    lineHeight: 28,
  },
  right: {
    flex: 1,
    padding: 72,
    justifyContent: "center",
  },
  form: {
    width: 380,
    maxWidth: "100%",
    alignSelf: "center",
  },
  label: {
    color: theme.colors.label,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.textOnLight,
    marginBottom: 22,
  },
  primaryButton: {
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.brandDark,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    height: 44,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.brandDark,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  secondaryButtonText: {
    color: theme.colors.brandDark,
    fontSize: 15,
    fontWeight: "700",
  },
  link: {
    marginTop: 18,
    alignItems: "center",
  },
  linkText: {
    color: theme.colors.brandDark,
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    marginTop: 44,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    alignItems: "center",
  },
  footerText: {
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 14,
  },
  footerRow: {
    flexDirection: "row",
    gap: 18,
    _web: { gap: 18 },
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    _web: { gap: 6 },
  },
  badgeText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "600",
  },
  message: {
    marginBottom: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
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
}));

export default function LoginScreenWeb() {
  const { width } = useWindowDimensions();
  const isNarrow = width < 980;

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

    if (!email && !password)
      throw new Error("Email and password are required.");
    if (!email) throw new Error("Email is required.");
    if (!password) throw new Error("Password is required.");

    if (options?.requireValidEmail && !email.includes("@")) {
      throw new Error("A valid email is required.");
    }

    if (
      typeof options?.minPasswordLength === "number" &&
      password.length < options.minPasswordLength
    ) {
      throw new Error(
        `Password must be at least ${options.minPasswordLength} characters.`
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
        message: "Logged in (stub). Wire this to your auth API next.",
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
    <View style={styles.page}>
      <View
        style={[
          styles.card,
          {
            flexDirection: isNarrow ? "column" : "row",
            minHeight: isNarrow ? 760 : 680,
          },
        ]}
      >
        <View style={[styles.left, { padding: isNarrow ? 44 : 64 }]}>
          <View style={styles.leftInner}>
            <View style={styles.logoWrap}>
              <Image
                source={require("../../../assets/images/icon.png")}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>SuperMetric</Text>
            <Text style={styles.subtitle}>
              Illuminating aspiring, current, & former superintendent stories
              with purpose.
            </Text>
          </View>
        </View>

        <View style={[styles.right, { padding: isNarrow ? 44 : 72 }]}>
          <View style={styles.form}>
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
              placeholder="Email"
              placeholderTextColor="#6b7280"
              style={styles.input}
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
              placeholderTextColor="#6b7280"
              secureTextEntry
              style={styles.input}
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
                Secure platform for educational leaders
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
        </View>
      </View>
    </View>
  );
}
