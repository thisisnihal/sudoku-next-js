import { Providers } from "@/app/providers";

export default function RootLayout({ children }) {
  return <Providers>{children}</Providers>;
}
