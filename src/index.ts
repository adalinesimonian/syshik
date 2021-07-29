import { escapeForRegex } from './regex-utils'
import charmap from './charmap'

/**
 * Cached regexes for known search strings.
 */
const knownRegexes: Map<string, RegExp> = new Map()

/**
 * Creates a regex that matches the given string, accounting for homoglyphs and
 * lookalikes.
 * @param searchString The search string to create a regex for.
 * @returns The regex for the given search string.
 */
function buildSearchRegex(searchString: string): RegExp {
  let pattern = ''
  let lastCharWasSpace = false
  for (const char of searchString) {
    if (/\s/.test(char)) {
      if (!lastCharWasSpace) {
        pattern += '\\s+'
        lastCharWasSpace = true
      }
      continue
    }
    lastCharWasSpace = false
    const part = charmap[char] || escapeForRegex(char)
    pattern += part + '[\\u0300-\\u036f]*'
  }
  return new RegExp(pattern, 'gi')
}

/**
 * Gets the regex for the given search string. If one is not already cached,
 * creates one.
 * @param searchString The search string to create a regex for.
 * @returns The regex for the given search string.
 */
function getSearchRegex(searchString: string) {
  const known = knownRegexes.get(searchString)
  if (known) {
    return known
  }
  const regex = buildSearchRegex(searchString)
  knownRegexes.set(searchString, regex)
  return regex
}

/**
 * Finds all occurrences of the given search strings in the given string.
 * @param str The string to search.
 * @param searchString The string to search for.
 * @returns An array of all matches.
 */
function findString(str: string, searchString: string): string[] {
  const matches: string[] = []
  const regex = getSearchRegex(searchString)

  for (const match of str.matchAll(regex)) {
    matches.push(match[0])
  }
  return matches
}

/**
 * Finds all occurrences of the given search strings in the given string.
 * @param string The string to search.
 * @param searchStrings The strings to search for.
 * @returns If only one search string is provided as a string-type parameter,
 * an array of all the matches. Otherwise, an object, where the key is the
 * search string and the value is an array of the matches for that search
 * string.
 * @example
 * const matches = syshik.find('abcdef', 'bc')
 * // matches => ['bc']
 * const matches = syshik.find('abcdef', ['bc', 'cd'])
 * // matches => { bc: ['bc'], cd: ['cd'] }
 */
export function find(str: string, searchStrings: string): string[]
export function find(
  str: string,
  searchStrings: string[]
): Record<string, string[]>
export function find(
  str: string,
  searchStrings: string | string[]
): string[] | Record<string, string[]> {
  const arg1Type = typeof str
  if (arg1Type !== 'string') {
    throw new TypeError(`Expected a string, found ${arg1Type}`)
  }
  const baseStr = str.normalize('NFD')

  if (typeof searchStrings === 'string') {
    return findString(baseStr, searchStrings)
  }

  if (!Array.isArray(searchStrings)) {
    throw new TypeError(
      `Search strings must either be passed as a string or an array of strings, found ${typeof searchStrings}`
    )
  }

  const results: Record<string, string[]> = Object.create(null)

  for (const searchString of searchStrings) {
    results[searchString] = findString(baseStr, searchString)
  }

  return results
}

/**
 * Syshik - Search utility for text obscured using homoglyphs or other text
 * trickery.
 */
export default { find }
