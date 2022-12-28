module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [
      2,
      'always',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case', 'lower-case'],
    ],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'update',
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'ci',
        'revert',
        'perf',
        'sample',
        'init',
      ],
    ],
  },
}
