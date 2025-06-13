// src/app/layout.js
import { ReduxProvider } from "@/redux/provider";
import NetworkStatusBar from "@/components/NetworkStatus/NetworkStatusBar";
import "./globals.css";

export const metadata = {
  title: "Main Layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" foxified="">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <ReduxProvider>
          <NetworkStatusBar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
