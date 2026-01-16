// Static content that matches the Strapi API structure
export const STATIC_ABOUT_PAGE = {
  aboutTitle: 'About Me',
  aboutContent: "Hello! I'm Dylan, and I thrive on solving challenges with technology. My coding journey began when I crafted my first Minecraft plugin back in 2014, igniting my passion for continuous learning. Over the years, I've had the privilege of working with four startups and a larger company, where I've tackled complex scenarios and worn many hats, gaining invaluable experience along the way.",
  workExperienceTitle: 'Work Experience',
  skillsTitle: 'My Technical Skills',
  skillsChartText: 'Each marker represents 1 year of experience.',
  testimonialsTitle: 'What People Say About Me',
  interestingFactsTitle: 'A Little More About Me'
};

export const STATIC_HERO_CONTENT = {
  content: [
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: "I'm a Fullstack Developer with expertise in React, TypeScript, and building RESTful APIs using Node.js and Koa. This website pays tribute to one of my favorite university assignments — a retro-style terminal coded in C."
        }
      ]
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text: "When I'm not coding, you can find me walking, gaming, or attending PAX Aus, which I've been doing since the first PAX in 2013."
        }
      ]
    }
  ]
};

export const STATIC_CTA = {
  text: "Ready to work together?",
  buttonText: "Get In Touch"
};

export const STATIC_CONTACT_PAGE = {
  attributes: {
    title: "Let's Connect",
    content: [],
    resumeCta: "Are you interested in grabbing my CV?",
    resumeCtaButtonText: "Download CV",
    resume: {
      data: {
        attributes: {
          url: "/cv/dylan-henderson-cv.pdf"
        }
      }
    }
  }
};