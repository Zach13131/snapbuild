/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional API origin. Defaults to ./api on this site. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
