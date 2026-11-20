// Static content that matches the Strapi API structure
export const STATIC_CTA = {
  text: 'Ready to work together?',
  buttonText: 'Get In Touch',
};

export const STATIC_CONTACT_PAGE = {
  attributes: {
    title: "Let's Connect",
    content: [],
    resumeCta: 'Are you interested in grabbing my CV?',
    resumeCtaButtonText: 'Download CV',
    resume: {
      data: {
        attributes: {
          url: '/cv/dylan-henderson-cv.pdf',
        },
      },
    },
  },
};
