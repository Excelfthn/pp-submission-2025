import { ReduxProvider } from "@/redux/provider";
import '../../globals.css'


export const metadata = {
  title: "Auth Layout",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReduxProvider>
          <main className="min-h-screen flex items-center justify-center">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
