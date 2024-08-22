import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browser Render Made Easy",
  description: "Answering how the browser render's web pages",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
