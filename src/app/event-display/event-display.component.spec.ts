import { EventDisplayComponent } from './event-display.component';
import { R } from '@app/resource';

const eventDisplay = new EventDisplayComponent(
	'showtime-counter-clock',
	'event-name-current',
	R.getInstance()
);

describe('EventDisplayComponent', () => {
	it('should create', () => {
		expect(eventDisplay).toBeDefined();
	});
});
