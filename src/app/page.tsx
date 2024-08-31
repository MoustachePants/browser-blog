import "./page.css";
import Ropes from "../../archive/Ropes";

export default function Page() {
  return (
    <div className="home-page-container">
      {/* <Ropes /> */}
      <main>
        <section id="about">
          <h1>Welcome!</h1>
          <p>
            My name is <strong>Elad Laor</strong>, and I'm a full-stack
            developer based in <strong>Tel Aviv, Israel</strong>. I've worked on
            a diverse range of projects, from airplane simulators to fully
            designed websites, with a strong focus on creating clean and refined
            interfaces. My goal is to build solutions that not only look great
            but also deliver a seamless and intuitive user experience.
          </p>
          <div className="links">
            <a href="mailto:elad222@gmail.com">
              <img src="./icons/email.png" alt="email-icon" />
            </a>
            <a href="https://github.com/MoustachePants">
              <img src="./icons/github.png" alt="github-icon" />
            </a>
            <a href="https://www.linkedin.com/in/elad-laor-a7701923b/">
              <img src="./icons/linkedin.png" alt="linkedin-icon" />
            </a>
          </div>
        </section>
        <section id="projects">
          <h2>Recent Projects</h2>
          <a className="project">
            <div className="project-header">
              <h3>Bird's Flight Simulator</h3>
              <img
                src="./icons/desktop.png"
                alt="desktop"
                title="desktop compatibility"
              />
            </div>
            <p>
              Every bird has its own fligt control system, pilot it above
              Israel's sky. Make sure to try the "Bird's Eye View"!
            </p>
          </a>
          <a className="project" href="https://thesprings.netlify.app/">
            <div className="project-header">
              <h3>Israel's Natural Springs Library</h3>
              <img
                src="./icons/desktop.png"
                alt="desktop"
                title="desktop compatibility"
              />
              <img
                src="./icons/mobile.png"
                alt="mobile"
                title="mobile compatibility"
                id="mobile-icon"
              />
            </div>
            <p>
              A fully dynamic and responsive website. The client is written in
              plain, vanilla JavaScript. No frameworks.
            </p>
          </a>
          <a className="project" href="/browserrendermadeeasy">
            <div className="project-header">
              <h3>Browser Render Made Easy</h3>
              <img
                src="./icons/desktop.png"
                alt="desktop"
                title="desktop compatibility"
              />
              <img
                src="./icons/mobile.png"
                alt="mobile"
                title="mobile compatibility"
                id="mobile-icon"
              />
            </div>
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
