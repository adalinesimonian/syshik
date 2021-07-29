import syshik, { find } from '../src/index'

describe('argument types', () => {
  it('find should be a function', () => {
    expect(typeof syshik.find).toBe('function')
    expect(typeof find).toBe('function')
  })

  it('find should throw when called with a non-string argument', () => {
    expect(() => find(1 as any, '')).toThrowErrorMatchingSnapshot()
    expect(() => find(true as any, '')).toThrowErrorMatchingSnapshot()
    expect(() => find(null as any, '')).toThrowErrorMatchingSnapshot()
    expect(() => find(undefined as any, '')).toThrowErrorMatchingSnapshot()
    expect(() => find([] as any, '')).toThrowErrorMatchingSnapshot()
    expect(() => find({} as any, '')).toThrowErrorMatchingSnapshot()
    expect(() => find((() => {}) as any, '')).toThrowErrorMatchingSnapshot()
  })

  it('find should throw when called with a non-string and non-string-array search argument', () => {
    expect(() => find('', 1 as any)).toThrowErrorMatchingSnapshot()
    expect(() => find('', true as any)).toThrowErrorMatchingSnapshot()
    expect(() => find('', null as any)).toThrowErrorMatchingSnapshot()
    expect(() => find('', undefined as any)).toThrowErrorMatchingSnapshot()
    expect(() => find('', {} as any)).toThrowErrorMatchingSnapshot()
    expect(() => find('', (() => {}) as any)).toThrowErrorMatchingSnapshot()
  })
})

describe('return types', () => {
  describe('when called with a string argument', () => {
    it('find should return empty array when no matches', () => {
      expect(find('', 'abc')).toEqual([])
    })

    it('find should return array of matches when there are matches', () => {
      expect(find('abc', 'abc')).toEqual(['abc'])
      expect(find('abcabcabc', 'abc')).toEqual(['abc', 'abc', 'abc'])
    })
  })

  describe('when called with a string array argument', () => {
    it('find should an object with empty arrays when no matches', () => {
      expect(find('', ['abc', 'def'])).toEqual({
        abc: [],
        def: [],
      })
    })

    it('find should return an object of matches when there are matches', () => {
      expect(find('abc', ['abc'])).toEqual({
        abc: ['abc'],
      })
      expect(find('abcdef', ['abc', 'def'])).toEqual({
        abc: ['abc'],
        def: ['def'],
      })
      expect(find('abcdef', ['bcd', 'cde'])).toEqual({
        bcd: ['bcd'],
        cde: ['cde'],
      })
      expect(find('abcdef', ['abc', 'def', 'ghi'])).toEqual({
        abc: ['abc'],
        def: ['def'],
        ghi: [],
      })
    })
  })
})

describe('homoglyphs and lookalikes', () => {
  it('find should match diacritic characters', () => {
    expect(find('what éggplâńt', 'eggplant')).toEqual(['éggplâńt'])
  })

  it('find should match homoglyphs', () => {
    expect(find('𝜧𝚘𝝄𝕟 𐒴ⅰ𝕧ҽʀ', 'moon river')).toEqual(['𝜧𝚘𝝄𝕟 𐒴ⅰ𝕧ҽʀ'])
  })

  it('find should match lookalikes', () => {
    expect(find('|=/-\\|<3', 'fake')).toEqual(['|=/-\\|<3'])
  })
})
