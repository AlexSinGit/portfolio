/* =====================================================================
   PORTFOLIO DATA TEMPLATE (committed to git).

   Keep your real data in data/portfolio.js — that file is listed in
   .gitignore and never reaches the repository. If data/portfolio.js
   is missing, the build creates it automatically from this template.

   Project fields:
     title — project name
     stack — array of technologies (chips under the title)
     desc  — short description
     link  — "View project" URL; empty string '' hides the button
     image — screenshot path (put the file into data/images/ — that
             folder is gitignored — and use a path like
             'images/file-name.jpg'); '' shows a placeholder
     fit   — optional; by default the whole image is shown without
             cropping ('contain'); set 'cover' to fill the frame
             (edges may be cropped)

   To add a project — copy an { ... } object; to remove — delete it.
   Numbering, dots and the counter are recalculated at build time.
   ===================================================================== */

module.exports = {
  settings: {
    label: 'Selected Work',             // header label
    accent: 'oklch(0.78 0.16 250)',     // accent color
    placeholderText: 'Drop screenshot', // placeholder text when image is empty
  },

  projects: [
    {
      title: 'Nebula Analytics',
      stack: ['Vue 3', 'TypeScript', 'D3.js', 'SCSS'],
      desc: 'Real-time analytics dashboard for distributed teams. Interactive charts, live filtering and a component library built from scratch.',
      link: 'https://example.com',
      image: '',
    },
    {
      title: 'Atlas Commerce',
      stack: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
      desc: 'Headless e-commerce storefront with server-side rendering, cart persistence and a lightning-fast checkout flow.',
      link: 'https://example.com',
      image: '',
    },
    {
      title: 'Orbit Landing',
      stack: ['Pug', 'SCSS', 'GSAP', 'Vanilla JS'],
      desc: 'Animated marketing site for a SaaS launch. Scroll-driven motion, responsive layout and sub-second load times.',
      link: '',
      image: '',
    },
  ],
};
