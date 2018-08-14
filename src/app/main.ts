/* tslint:disable:no-unused-expression */
import { CurrentTimeClock } from '@app/clock/current-time/current-time-clock.component';
import { StaticTimeClock } from '@app/clock/static-time/static-time-clock.component';
import { ShowtimeCounterClock } from '@app/clock/showtime-counter/showtime-counter-clock.component';
import { EventsComponent } from '@app/events/events.component';
import { R } from '@app/resource';

function main() {
	// Create resource Singleton
	const r = R.getInstance();
	r.startTime = '23:05';
	// Vignette clock that shows current time
	new CurrentTimeClock('vignette-clock');
	// Counter that shows remaining time
	new ShowtimeCounterClock('showtime-counter-clock', r);
	// Start time for the event
	new StaticTimeClock('start-time-clock', r.startTime);
	// End time for the event
	new StaticTimeClock('end-time-clock', '23:59');
	// Events component for editing events
	new EventsComponent(
		'events-container',
		'event-item-wrapper',
		'start-end-time-container',
		'close-event-list-button',
		'event-add',
		r
	);
}

main();
