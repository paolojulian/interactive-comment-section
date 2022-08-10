const dev = process.env.NODE_ENV === 'production';

export const domain = dev ? 'http://localhost:3000' : 'https://stoic-lovelace-2a3271.netlify.app';