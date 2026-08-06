import * as migration_20260806_111936_quotes from './20260806_111936_quotes';

export const migrations = [
  {
    up: migration_20260806_111936_quotes.up,
    down: migration_20260806_111936_quotes.down,
    name: '20260806_111936_quotes'
  },
];
