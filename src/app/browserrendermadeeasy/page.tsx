import ProgressBar from "../../components/UI/ProgressBar";
import Main from "../../components/Layout/Blog";
import "./Dev.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browser Render Made Easy",
  description: "Explaining the complex magic behind every web page",
};

export default function Page() {
  return (
    <div className="dev-page">
      <ProgressBar />
      <Main />
    </div>
  );
}
