declare namespace NodeJS {
  interface ProcessEnv {
    ACCESS_TOKEN_SECRET: string;
    PORT: string;
    GMAIL_EMAIL: string;
    GMAIL_PASSWORD: string;
  }
}