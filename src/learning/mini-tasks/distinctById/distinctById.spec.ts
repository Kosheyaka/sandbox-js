import { DistinctByIdEntity } from './types';
import { distinctById } from './distinctById';

describe('Mini-task: Distinct by ID', () => {
  it('Test #1', () => {
    const input: DistinctByIdEntity[] = [
      { id: -1, content: '-1' },
      { id: 2, content: '2' },
      { id: 0, content: '0' },
      { id: 1, content: '1' },
      { id: -1, content: '-1' },
      { id: 0, content: '0' },
      { id: null, content: 'null' },
      { id: 1, content: '1' },
      { id: 2, content: '2' },
      { id: null, content: 'null' },
    ];

    const expected: DistinctByIdEntity[] = [
      { id: -1, content: '-1' },
      { id: 2, content: '2' },
      { id: 0, content: '0' },
      { id: 1, content: '1' },
      { id: null, content: 'null' },
    ];

    const result = distinctById(input);

    expect(result).toEqual(expected);
  });
});
