import { ShowtimeCounterClock } from './showtime-counter-clock.component';
import { R } from '@app/resource';

const showtime = new ShowtimeCounterClock('showtime-counter-clock', R.getInstance());

describe('ShowtimeCounterClock', () => {
	it('should create', () => {
		expect(showtime).toBeDefined();
	});
});
