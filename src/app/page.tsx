// import { ClientOnly } from "./[[...slug]]/client";

export function generateStaticParams() {
  return [{ slug: [""] }];
}

export default function Page() {
  return <h1>MoustachePants</h1>;
}
