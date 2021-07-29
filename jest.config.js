/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['TS151001'],
      },
    },
  },
}
