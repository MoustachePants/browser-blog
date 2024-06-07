const Stage0 = () => {
  return (
    <div className="stage-container">
      <p>
        In February 2024, I decided to revive an old hobby of mine: web
        development. In the past, I created lightweight web applications and
        visual simulator interfaces, but life took me in different directions,
        and I had to focus on my job. Recently, a friend recommended I visit
        RoadMap.sh to gain more knowledge and experience. One of the first
        articles in the Frontend skill tree is about how the browser renders a
        web page, and it immediately fascinated me how complex this hidden
        process is. We often take for granted the seamless transition from
        clicking a link to seeing a fully loaded webpage. It's easy to overlook
        the intricate mechanics behind the scenes (well, did you think about it
        after clicking the link that led you here?).
      </p>
      note: you must be familiar with at least basic knowledge of html and css
      in order to understand this article 🙂
      <p>
        In this article, I will explain and demonstrate the basics of browser
        rendering for fellow enthusiasts like myself. My goal is to make this
        topic as easy and understandable as possible while providing practical
        insights to enhance our web development skills. I will link to every
        resource I used, allowing you to explore further into this fascinating
        subject (it's a never-ending rabbit hole, trust me).
      </p>
      There are several browser rendering engines (Blink for Chrome and Edge,
      WebKit for Safari, Gecko for Firefox, etc.). Lucky for us, all of them
      work in a similar way.
    </div>
  );
};

export default Stage0;
