/* tslint:disable:no-unused-expression */
import { CurrentTimeClock } from '@app/clock/current-time/current-time-clock.component';
import { StaticTimeClock } from '@app/clock/static-time/static-time-clock.component';
import { ShowtimeCounterClock } from '@app/clock/showtime-counter/showtime-counter-clock.component';
import { ResourceObserver } from '@app/resource-observer';
import { EventsComponent } from '@app/events/events.component';
import { EventDisplayComponent } from '@app/event-display/event-display.component';
import { R } from '@app/resource';

function main() {
	// Create resource Singleton
	const r = R.getInstance();
	// Vignette clock that shows current time
	new CurrentTimeClock('vignette-clock');
	// Counter that shows remaining time
	new ShowtimeCounterClock('showtime-counter-clock', r);
	// Start time for the event
	const startTime = new StaticTimeClock('start-time-clock', 'startTime', r);
	const startTimeObserver = new ResourceObserver(startTime.update.bind(startTime));
	// End time for the event
	const endTime = new StaticTimeClock('end-time-clock', 'endTime', r);
	const endTimeObserver = new ResourceObserver(endTime.update.bind(endTime));
	// Event display that displays events name
	const eventDisplay = new EventDisplayComponent('event-name-current', 'event-name-next', r);
	const eventDisplayObserver = new ResourceObserver(eventDisplay.update.bind(eventDisplay));
	// Events component for editing events
	const events = new EventsComponent(
		'events-container',
		'event-item-wrapper',
		'start-end-time-container',
		'close-event-list-button',
		'save-event-list-button',
		'event-add',
		r
	);
	events.registerObservers([startTimeObserver, endTimeObserver, eventDisplayObserver]);
}

main();
