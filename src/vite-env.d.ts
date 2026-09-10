/// <reference types="vite/client" />

/* `import.meta.env` was previously reached through a pair of
   `// @ts-ignore` comments in lib/supabase.ts. This declares it properly,
   so the environment variables are typed instead of suppressed. */
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
