export function splitByWords(text: string): string[] {
  // Splits by space but keeps the spacing attached so elements flow naturally in the DOM
  return text.split(" ").map((word, i, arr) => (i < arr.length - 1 ? word + " " : word));
}
