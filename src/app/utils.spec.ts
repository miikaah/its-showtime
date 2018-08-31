import { prefixNumber } from './utils';

describe('Utils', () => {
	it('should prefix number', () => {
		expect(prefixNumber(2)).toBe('02');
	});
});
