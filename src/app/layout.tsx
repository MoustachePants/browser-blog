import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";

export const metadata: Metadata = {
  title: "MoustachePants",
  description: "Elad Laor's portfolio",
};

const nanum_gothic = Nanum_Gothic({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nanum_gothic.className}>
      {/* <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
          rel="stylesheet"
        />
      </head> */}
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
