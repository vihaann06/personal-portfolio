import type { VNode } from './filesystem';

export interface BookLink {
  name: string;
  url: string;
}

/** Classic computer science texts — each opens the book (or official page) online. */
export const CS_BOOKS: BookLink[] = [
  {
    name: 'SICP',
    url: 'https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html',
  },
  {
    name: 'Introduction to Algorithms',
    url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
  },
  {
    name: 'CSAPP',
    url: 'http://csapp.cs.cmu.edu/',
  },
  {
    name: 'Design Patterns',
    url: 'https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612',
  },
  {
    name: 'Clean Code',
    url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
  },
  {
    name: 'The Pragmatic Programmer',
    url: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/',
  },
  {
    name: 'Theory of Computation',
    url: 'https://www.amazon.com/Introduction-Theory-Computation-Michael-Sipser/dp/113318779X',
  },
  {
    name: 'TAOCP Vol 1',
    url: 'https://www-cs-faculty.stanford.edu/~knuth/taocp.html',
  },
  {
    name: 'Database System Concepts',
    url: 'https://www.amazon.com/Database-System-Concepts-Abraham-Silberschatz/dp/0078022150',
  },
  {
    name: 'Operating System Concepts',
    url: 'https://www.amazon.com/Operating-System-Concepts-Abraham-Silberschatz/dp/1119800366',
  },
];

export const PHILOSOPHY_BOOKS: BookLink[] = [
  { name: 'Meditations', url: 'https://www.gutenberg.org/ebooks/2680' },
  { name: 'The Republic', url: 'https://www.gutenberg.org/ebooks/1497' },
  { name: 'Nicomachean Ethics', url: 'https://www.gutenberg.org/ebooks/8438' },
  { name: 'Critique of Pure Reason', url: 'https://www.gutenberg.org/ebooks/4280' },
  { name: 'Beyond Good and Evil', url: 'https://www.gutenberg.org/ebooks/4363' },
  { name: 'Tractatus', url: 'https://www.gutenberg.org/ebooks/5740' },
  { name: 'Tao Te Ching', url: 'https://www.gutenberg.org/ebooks/216' },
  { name: 'Leviathan', url: 'https://www.gutenberg.org/ebooks/3207' },
  { name: 'Enquiry (Hume)', url: 'https://www.gutenberg.org/ebooks/9662' },
  { name: 'The Social Contract', url: 'https://www.gutenberg.org/ebooks/46333' },
];

export const PRODUCTIVITY_BOOKS: BookLink[] = [
  { name: 'Getting Things Done', url: 'https://gettingthingsdone.com/' },
  { name: 'Deep Work', url: 'https://www.calnewport.com/books/deep-work/' },
  { name: 'Atomic Habits', url: 'https://jamesclear.com/atomic-habits' },
  { name: 'The 7 Habits', url: 'https://www.franklincovey.com/the-7-habits/' },
  {
    name: 'How to Win Friends',
    url: 'https://www.dalecarnegie.com/en/books/how-to-win-friends-and-influence-people',
  },
  { name: 'Essentialism', url: 'https://gregmckeown.com/books/essentialism/' },
  { name: 'The Power of Habit', url: 'https://charlesduhigg.com/the-power-of-habit/' },
  { name: 'Make Time', url: 'https://maketime.blog/book/' },
];

function toBookNodes(books: BookLink[]): VNode[] {
  return books.map((book) => ({
    type: 'link',
    name: book.name,
    url: book.url,
    opensAs: 'file',
  }));
}

export const CS_BOOK_NODES = toBookNodes(CS_BOOKS);
export const PHILOSOPHY_BOOK_NODES = toBookNodes(PHILOSOPHY_BOOKS);
export const PRODUCTIVITY_BOOK_NODES = toBookNodes(PRODUCTIVITY_BOOKS);
