import { counter } from './counter.component';

test('should subtract 1', () => {
	expect(counter(2)).toBe(1);
});
