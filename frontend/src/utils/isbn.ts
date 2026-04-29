/**
 * Returns a new ISBN regex instance each time to avoid lastIndex issues with global flag.
 * Matches ISBN-10 and ISBN-13 with or without hyphens, globally.
 */
const getISBNPattern = () =>
  /\b(?:ISBN[-: ]?)?(?:97[89][-\s]?)?(?:\d[-\s]?){9}[\dX]\b/gi;

/**
 * Validates an ISBN-10 number using checksum.
 */
const isValidISBN10 = (isbn: string): boolean => {
  if (isbn.length !== 10) return false;
  const sum = isbn.split("").reduce((acc, char, i) => {
    const val = char === "X" ? 10 : parseInt(char, 10);
    return acc + val * (10 - i);
  }, 0);
  return sum % 11 === 0;
};

/**
 * Validates an ISBN-13 number using checksum.
 */
const isValidISBN13 = (isbn: string): boolean => {
  if (isbn.length !== 13) return false;
  const sum = isbn.split("").reduce((acc, char, i) => {
    return acc + parseInt(char, 10) * (i % 2 === 0 ? 1 : 3);
  }, 0);
  return sum % 10 === 0;
};

/**
 * Strips hyphens and spaces from an ISBN string.
 */
const normalizeISBN = (isbn: string): string => isbn.replace(/[-\s]/g, "");

/**
 * Checks if a string is a valid ISBN-10 or ISBN-13.
 */
export const isValidISBN = (isbn: string): boolean => {
  const normalized = normalizeISBN(isbn);
  return isValidISBN10(normalized) || isValidISBN13(normalized);
};

/**
 * Extracts all valid ISBNs from a text string.
 * Supports ISBN-10 and ISBN-13 with or without hyphens.
 */
export const extractISBNs = (text: string): string[] => {
  const matches = text.match(getISBNPattern()) ?? [];
  return [...new Set(matches.map(normalizeISBN).filter(isValidISBN))];
};

/**
 * Wraps ISBNs in italic markdown syntax.
 * Used to visually highlight ISBNs in chat messages without removing them.
 */
export const italicizeISBNs = (text: string): string => {
  return text.replace(getISBNPattern(), (match) => `*${match}*`);
};

/**
 * Removes ISBNs from a text string.
 */
export const stripISBNs = (text: string): string => {
  return text.replace(getISBNPattern(), "").replace(/\s+/g, " ").trim();
};

/**
 * Builds a Kristiania library search URL for a given ISBN.
 */
export const buildLibraryUrl = (isbn: string): string =>
  `https://bibsys-xm.primo.exlibrisgroup.com/discovery/search?query=any,contains,${isbn}&tab=default_slot&search_scope=MyInst_and_CI&vid=47BIBSYS_MH:MH&offset=0`;
