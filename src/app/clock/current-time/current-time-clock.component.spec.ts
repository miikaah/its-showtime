import { CurrentTimeClock } from './current-time-clock.component';

const currentTimeClock = new CurrentTimeClock('vignette-clock');

describe('CurrentTimeClock', () => {
	it('should create', () => {
		expect(currentTimeClock).toBeDefined();
	});
});
