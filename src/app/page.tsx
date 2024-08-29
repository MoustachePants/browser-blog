import Head from "next/head";
import { Metadata } from "next";
import "./page.css";

export default function Page() {
  return (
    <div className="home-page-container">
      <main>
        <section id="about">
          <h1>Welcome!</h1>
          <p>
            My name is Elad Laor, and I'm a full-stack developer based in Tel
            Aviv, Israel. I've worked on a diverse range of projects, from
            airplane simulators to fully designed websites, with a strong focus
            on creating clean and refined interfaces. My goal is to build
            solutions that not only look great but also deliver a seamless and
            intuitive user experience.
          </p>
        </section>
        <section id="projects">
          <h2>Projects</h2>
          <a className="project">
            <h3>Bird's Flight Simulator</h3>
            <p>
              Every bird has its own fligt control system, pilot it above
              Israel's sky. Make sure to try the "Bird's Eye View"!
            </p>
          </a>
          <a className="project">
            <h3>Israel Fountains Library</h3>
            <p>
              A fully dynamic and responsive website. The client is written in
              plain, vanilla JavaScript. No frameworks.
            </p>
          </a>
          <a className="project" href="/browserrendermadeeasy">
            <h3>Browser Render Made Easy</h3>
            <p>
              Explaining the complex magic behind every web page - an
              interactive blog post.
            </p>
          </a>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Elad Laor. All rights reserved.</p>
      </footer>
    </div>
  );
}
