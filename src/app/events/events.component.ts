import { R, Event } from '@app/resource';
import { prefixNumber } from '@app/utils';

export class EventsComponent {
	private isEventListVisible = false;
	private containerRef: any;
	private eventListRef: any;
	private eventIdBase = 'event-';
	private removeEventIdBase = 'remove-event-';

	constructor(
			private containerId: string,
			private eventListId: string,
			private openEventListId: string,
			private closeEventListId: string,
			private saveEventListId: string,
			private addEventId: string,
			private resources: R) {
		document.getElementById(this.openEventListId).addEventListener('click', this.toggleEventList.bind(this));
		document.getElementById(this.closeEventListId).addEventListener('click', this.toggleEventList.bind(this));
		document.getElementById(this.saveEventListId).addEventListener('click', this.saveEventList.bind(this));
		document.getElementById(this.addEventId).addEventListener('click', this.addEventItem.bind(this));
		this.containerRef = document.getElementById(this.containerId);
		this.eventListRef = document.getElementById(this.eventListId);
		this.render();
	}

	private toggleEventList() {
		this.isEventListVisible = !this.isEventListVisible;
		this.containerRef.style.display = this.isEventListVisible ? 'block' : 'none';
		if (!this.isEventListVisible) this.saveEventList();
	}

	private addEventItem() {
		const id = (new Date()).getTime();
		const nextId = `${this.eventIdBase}${id}`;
		const startDate = this.getNextStartDate();
		const endDate = new Date(new Date(startDate).setMinutes(startDate.getMinutes() + 59, 59, 999));
		this.addEventToMap({ id: nextId, name: '', startDate, endDate });
		this.renderEventItem(
			{ id: nextId, name: '', startDate, endDate },
			`${this.removeEventIdBase}${id}`
		);
	}

	private getNextStartDate(): Date {
		const event = this.resources.getLastEvent;
		const date = event ? new Date(event.endDate.getTime()) : new Date();
		if (event) date.setMinutes(date.getMinutes() + 1);
		return date;
	}

	private renderEventItem(event: Event, removeId: string) {
		// Cteate the wrapper item
		const eventItem = document.createElement('div');
		eventItem.className = 'event-item';
		eventItem.id = event.id;
		// Create the name input
		const eventItemName = document.createElement('input');
		eventItemName.className = 'event-item-name';
		eventItemName.placeholder = 'Event Name';
		eventItemName.value = event.name;
		// Create the start time input
		const eventItemStart = document.createElement('input');
		eventItemStart.className = 'event-item-start';
		eventItemStart.value = this.getFormattedDateString(event.startDate);
		// Create the end time input
		const eventItemEnd = document.createElement('input');
		eventItemEnd.className = 'event-item-end';
		eventItemEnd.value = this.getFormattedDateString(event.endDate);
		// Create the event remove button
		const eventItemRemove = document.createElement('button');
		eventItemRemove.innerHTML = 'X';
		eventItemRemove.className = 'remove-event-button';
		eventItemRemove.type = 'button';
		eventItemRemove.id = removeId;
		eventItemRemove.addEventListener('click', this.removeEventFromMap.bind(this));
		// Append the new elements
		eventItem.appendChild(eventItemName);
		eventItem.appendChild(eventItemStart);
		eventItem.appendChild(eventItemEnd);
		eventItem.appendChild(eventItemRemove);
		this.eventListRef.appendChild(eventItem);
	}

	private getFormattedDateString(date: Date): string {
		return `${prefixNumber(date.getHours())}:${prefixNumber(date.getMinutes())} ${
			date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
	}

	private addEventToMap(event: Event) {
		this.resources.addEvent = event;
	}

	private removeEventFromMap(event) {
		this.resources.removeEvent = event.target.id.split('remove-').pop();
		this.render();
	}

	private saveEventList() {
		const events: Event[] = [];
		this.eventListRef.childNodes.forEach((node) => {
			events.push(this.getEventFromElement(node.id, node));
		});
		this.resources.events = events;
		this.render();
	}

	private getEventFromElement(id: string, el): Event {
		return {
			id,
			name: el.querySelector('.event-item-name').value,
			startDate: this.parseDate(el.querySelector('.event-item-start').value, 'start'),
			endDate: this.parseDate(el.querySelector('.event-item-end').value, 'end')
		};
	}

	private parseDate(dateString: string, type: 'start' | 'end'): Date {
		const time = dateString.split(' ')[0].split(':');
		const date = dateString.split(' ').pop().split('.');
		// Year, month index, day, hour, minute, seconds, milliseconds
		return type === 'start' ?
			new Date(+date[2], +date[1] - 1, +date[0], +time[0], +time[1]) :
			new Date(+date[2], +date[1] - 1, +date[0], +time[0], +time[1], 59, 999);
	}

	private render() {
		// Remove existing nodes
		while (this.eventListRef.firstChild) this.eventListRef.removeChild(this.eventListRef.firstChild);
		// Render events to list
		for (const key of Object.keys(this.resources.events)) {
			const event = this.resources.events[key];
			this.renderEventItem(event, `${this.removeEventIdBase}${event.id.split('-').pop()}`);
		}
	}
}
