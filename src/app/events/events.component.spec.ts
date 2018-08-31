import { EventsComponent } from './events.component';
import { R } from '@app/resource';

const fakeEndDate = new Date(2018, 7, 31, 17, 37);
const fakeEvent = { id: 'bar', name: 'foo', startDate: new Date(), endDate: fakeEndDate };

const resources = R.getInstance();

const resources2 = { events: [], addEvent: {}, removeEvent: {} };
const events2 = new EventsComponent(
	'events-container',
	'event-item-wrapper',
	'start-end-time-container',
	'close-event-list-button',
	'save-event-list-button',
	'event-add',
	resources2 as any
);

let events;
describe('EventsComponent', () => {
	beforeEach(() => {
		events = new EventsComponent(
			'events-container',
			'event-item-wrapper',
			'start-end-time-container',
			'close-event-list-button',
			'save-event-list-button',
			'event-add',
			resources
		);
		resources.events = [];
	});

	it('should toggle event list', () => {
		(events as any).toggleEventList();
		expect((events as any).isEventListVisible).toBe(true);
		expect((events as any).containerRef.style.display).toBe('block');
		(events as any).toggleEventList();
		expect((events as any).isEventListVisible).toBe(false);
		expect((events as any).containerRef.style.display).toBe('none');
	});

	it('should add event item', () => {
		const eventToMapSpy = jest.spyOn((events as any), 'addEventToMap').mockImplementation(() => {});
		const renderEventSpy = jest.spyOn((events as any), 'renderEventItem').mockImplementation(() => {});
		(events as any).addEventItem();
		expect(eventToMapSpy).toHaveBeenCalled();
		expect(renderEventSpy).toHaveBeenCalled();
	});

	it('should get next start date by last event\'s endDate', () => {
		resources.addEvent = fakeEvent;
		expect((events as any).getNextStartDate().toISOString()).toBe('2018-08-31T14:38:00.000Z');
	});

	it('should render an event item', () => {
		(events as any).renderEventItem({ ...fakeEvent, id: 'fake-item' }, 'remove-foo');
		expect(typeof document.getElementById('fake-item')).toBe('object');
	});

	it('should get a formatted date string', () => {
		expect((events as any).getFormattedDateString(fakeEndDate)).toBe('17:37 31.8.2018');
	});

	it('should add event to resources', () => {
		(events2 as any).addEventToMap(fakeEvent);
		expect(resources2.addEvent).toBe(fakeEvent);
	});

	it('should remove event from resources', () => {
		(events2 as any).removeEventFromMap({ target: { id: 'remove-foo' }});
		expect(resources2.removeEvent).toBe('foo');
	});

	it('should save event list to resources', () => {
		(events as any).addEventItem();
		(events as any).addEventItem();
		(events as any).saveEventList();
		expect((events as any).resources.events.length).toBe(2);
	});

	it('should parse a date as start time', () => {
		expect((events as any).parseDate('18:00 31.8.2018', 'start').toISOString()).toBe('2018-08-31T15:00:00.000Z');
		expect((events as any).parseDate('18:00 31.8.2018', 'end').toISOString()).toBe('2018-08-31T15:00:59.999Z');
	});
});
