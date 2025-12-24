import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats a date', () => {
    expect(formatDate(new Date('2020-01-02T00:00:00Z'))).toContain('2020');
  });
});

