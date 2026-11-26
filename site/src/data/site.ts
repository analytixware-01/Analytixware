// Single place to edit company details used across the site.
export const site = {
  name: 'Analytixware Technologies Pvt Ltd',
  url: 'https://analytixware.in',
  gaId: 'G-7NYJMPT9YR',
  address: 'A 1201 Ekta Festival, 132 Feet Ring Road, Naranpura, Ahmedabad',
  phone: '+91 9011719639',
  // "Chat with us" WhatsApp button (bottom-left on every page)
  whatsapp: {
    number: '+91 9011719639', // with country code
    message: 'Hi', // pre-filled text when the chat opens
    greeting: 'Hi,\nHow can I help you ?',
    brandName: 'Analytixware Technologies',
    status: 'online',
  },
  email: 'bhavik@analytixware.in',
  tagline:
    'We empower businesses with data insights. Leverage our data analytics solutions to stay ahead in a competitive world.',
  social: [
    { icon: 'fas fa-envelope', href: 'mailto:bhavik@analytixware.in', external: false },
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/company/analytixware-technologies-pvt-ltd/', external: true },
    { icon: 'fab fa-twitter', href: 'https://x.com/AnalytixwareIn', external: true },
    { icon: 'fab fa-instagram', href: 'https://instagram.com/Analytixware', external: true },
  ],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Case Study', href: '/case-studies' },
    { label: 'Blogs', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ],
  footerLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Services', href: '/services' },
    { label: 'Case Study', href: '/case-studies' },
  ],
};
