import { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.brand,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  logoWrap: {
    width: 92,
    height: 92,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  logo: {
    width: 58,
    height: 58,
    resizeMode: 'contain',
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: theme.spacing.sm,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
  },
  label: {
    color: theme.colors.label,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.textOnLight,
    marginBottom: theme.spacing.md,
  },
  primaryButton: {
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.brandDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 44,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: theme.colors.brandDark,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
  },
  secondaryButtonText: {
    color: theme.colors.brandDark,
    fontSize: 15,
    fontWeight: '700',
  },
  link: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  linkText: {
    color: theme.colors.brandDark,
    fontSize: 13,
    fontWeight: '600',
  },
}));

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = useMemo(() => email.length > 3 && password.length > 3, [email, password]);

  const login = useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 600));
      if (!canSubmit) throw new Error('Enter an email and password.');
      return { ok: true };
    },
    onSuccess: () => Alert.alert('Logged in (stub)', 'Wire this to your auth API next.'),
    onError: (error) => Alert.alert('Login failed', error instanceof Error ? error.message : 'Unknown error'),
  });

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.logoWrap}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.logo} />
          </View>
          <Text style={styles.title}>SuperMetric</Text>
          <Text style={styles.subtitle}>
            Illuminating aspiring, current, & former superintendent stories with purpose.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#6b7280"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#6b7280"
            secureTextEntry
            style={styles.input}
          />

          <Pressable
            disabled={!canSubmit || login.isPending}
            onPress={() => login.mutate()}
            style={[styles.primaryButton, { opacity: !canSubmit || login.isPending ? 0.6 : 1 }]}>
            <Text style={styles.primaryButtonText}>{login.isPending ? 'Logging in…' : 'Log in'}</Text>
          </Pressable>

          <Pressable onPress={() => Alert.alert('Sign up', 'Add your sign-up flow next.')} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Sign up</Text>
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('Help', 'Add password reset/help next.')}
            style={styles.link}>
            <Text style={styles.linkText}>Need help signing in?</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

