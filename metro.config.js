const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase JS SDK ships both a modern package.json "exports" map and a
// legacy top-level "react-native" field pointing at its React
// Native-specific build. Metro's package-exports resolution picks the
// wrong build for @firebase/auth, which throws "Component auth has not
// been registered yet" at runtime. Disabling it makes Metro fall back to
// the legacy "react-native" field, which resolves correctly.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
