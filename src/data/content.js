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

export const westonsMakes = [
  // Things you make by hand. category: 'Baking' sits on cake stands, 'Pottery' sits on the shelf.
  // photo: drop images in /public/makes/ and reference them like 'makes/sourdough.jpg'
  { name: '', category: 'Baking', photo: '', description: '', date: '' },
  { name: '', category: 'Baking', photo: '', description: '', date: '' },
  { name: '', category: 'Baking', photo: '', description: '', date: '' },
  { name: '', category: 'Pottery', photo: '', description: '', date: '' },
  { name: '', category: 'Pottery', photo: '', description: '', date: '' },
  { name: '', category: 'Pottery', photo: '', description: '', date: '' },
];

export const dragonflyRooms = [
  // description = one-liner on the key tag; details = the full write-up in the pop-up.
  { room: '101', name: '', description: '', details: '', image: '', stack: [], repo: '', demo: '' },
  { room: '102', name: '', description: '', details: '', image: '', stack: [], repo: '', demo: '' },
  { room: '201', name: '', description: '', details: '', image: '', stack: [], repo: '', demo: '' },
  { room: '202', name: '', description: '', details: '', image: '', stack: [], repo: '', demo: '' },
];

export const doosesLedger = [
  // Newest first. Taylor insists.
  { start: '', end: 'Present', role: '', company: '', highlights: ['', ''] },
  { start: '', end: '', role: '', company: '', highlights: ['', ''] },
  { start: '', end: '', role: '', company: '', highlights: ['', ''] },
];

export const bookstoreShelf = [
  // "Employee Picks". pickNote = the handwritten shelf-talker card (why you wrote it / why read it).
  { title: '', category: 'Architecture', date: '', summary: '', pickNote: '', url: '' },
  { title: '', category: 'Engineering', date: '', summary: '', pickNote: '', url: '' },
  { title: '', category: 'Book Review', date: '', summary: '', pickNote: '', url: '' },
];

// Background music: embedded official YouTube video (never download/rehost the audio).
export const soundtrack = {
  title: 'La La La: Gilmore Girls soundtrack',
  videoId: 'nYXRHOMqGXA',
  playlistId: 'PLBKadB95sF44pNky_DZop2PidMKp5DBZB',
  volume: 35,
};

// Map hotspots. Order = tab order = scroll order in "skip the tour" mode.
export const locations = [
  { id: 'gazebo', name: 'Town Square Gazebo', section: 'Welcome' },
  { id: 'lukes', name: "Luke's Diner", section: 'About Me' },
  { id: 'westons', name: "Weston's Bakery", section: 'Things I Make' },
  { id: 'dragonfly', name: 'The Dragonfly Inn', section: 'Projects' },
  { id: 'dooses', name: "Doose's Market", section: 'Experience' },
  { id: 'bookstore', name: 'Black, White & Read', section: 'Blog' },
  { id: 'pattys', name: "Miss Patty's", section: 'Contact' },
];
