// Single source of truth for all portfolio content.
// Both the town-map view and the "skip the tour" scroll view render from this file.
// Blank strings ('') are intentional placeholders: fill them in and the UI picks them up.

export const owner = {
  name: 'Your Name',
  title: 'Software Engineer',
  tagline: "Welcome to my corner of the internet. Grab a coffee, let's talk code.",
  email: '', // TODO: add your email. The contact form stays disabled until this is set.
  socials: [
    { label: 'GitHub', url: '' },
    { label: 'LinkedIn', url: '' },
    { label: 'Resume', url: '' },
  ],
};

export const lukesMenu = {
  intro: '', // TODO: short bio, a sentence or two, like the blurb at the top of a menu
  sections: [
    {
      heading: 'Specialties',
      subheading: 'Core languages',
      items: [
        { name: '', note: '' },
        { name: '', note: '' },
        { name: '', note: '' },
      ],
    },
    {
      heading: 'Sides',
      subheading: 'Soft skills',
      items: [
        { name: '', note: '' },
        { name: '', note: '' },
        { name: '', note: '' },
      ],
    },
    {
      heading: 'Bottomless Coffee',
      subheading: 'Tools and frameworks',
      items: [
        { name: '', note: '' },
        { name: '', note: '' },
      ],
    },
  ],
};

export const westonsBakes = [
  // photo: drop images in /public/bakes/ and reference them like 'bakes/sourdough.jpg'
  { name: '', photo: '', description: '', date: '' },
  { name: '', photo: '', description: '', date: '' },
  { name: '', photo: '', description: '', date: '' },
];

export const dragonflyRooms = [
  { room: '101', name: '', description: '', stack: [], repo: '', demo: '' },
  { room: '102', name: '', description: '', stack: [], repo: '', demo: '' },
  { room: '201', name: '', description: '', stack: [], repo: '', demo: '' },
  { room: '202', name: '', description: '', stack: [], repo: '', demo: '' },
];

export const doosesLedger = [
  // Newest first. Taylor insists.
  { start: '', end: 'Present', role: '', company: '', highlights: ['', ''] },
  { start: '', end: '', role: '', company: '', highlights: ['', ''] },
  { start: '', end: '', role: '', company: '', highlights: ['', ''] },
];

export const bookstoreShelf = [
  { title: '', category: 'Architecture', date: '', summary: '', url: '' },
  { title: '', category: 'Engineering', date: '', summary: '', url: '' },
  { title: '', category: 'Book Review', date: '', summary: '', url: '' },
];

// Map hotspots. Order = tab order = scroll order in "skip the tour" mode.
export const locations = [
  { id: 'gazebo', name: 'Town Square Gazebo', section: 'Welcome' },
  { id: 'lukes', name: "Luke's Diner", section: 'About Me' },
  { id: 'westons', name: "Weston's Bakery", section: 'Recent Bakes' },
  { id: 'dragonfly', name: 'The Dragonfly Inn', section: 'Projects' },
  { id: 'dooses', name: "Doose's Market", section: 'Experience' },
  { id: 'bookstore', name: 'Black, White & Read', section: 'Blog' },
  { id: 'pattys', name: "Miss Patty's", section: 'Contact' },
];
