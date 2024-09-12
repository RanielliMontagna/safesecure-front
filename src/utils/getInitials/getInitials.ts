export function getInitials(name?: string) {
  return name
    ?.split(' ') // Splits the name into an array of words
    .map(word => word[0].toUpperCase()) // Gets the first letter of each word and converts it to uppercase
    .join('') // Joins the letters into a single string
}
