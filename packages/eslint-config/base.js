import js from "@eslint/js";
import tseslint from "typescript-eslint";

/**
 * Shared base ESLint flat config for all workspace packages.
 */
export const baseConfig = tseslint.config(
  { ignores: ["dist", "node_modules", ".turbo"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);

export default baseConfig;
