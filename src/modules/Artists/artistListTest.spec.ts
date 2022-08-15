import searchSlice, {
} from './artistListReducer';

describe('reducer', () => {
  it('should handle initial state', () => {
    expect(searchSlice(undefined, { type: 'unknown' })).toEqual({
      value: undefined,
      status: 'idle',
    });
  });
});
