import { StaticTimeClock } from './static-time-clock.component';
import { R } from '@app/resource';

const eventDisplay = new StaticTimeClock('start-time-clock', 'startTime',	R.getInstance());

describe('StaticTimeClock', () => {
	it('should create', () => {
		expect(eventDisplay).toBeDefined();
	});
});
