import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <ClientOnly />;
}
