import { R, Event } from '@app/resource';

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
			private addEventId: string,
			private resources: R) {
		document.getElementById(openEventListId).addEventListener('click', this.toggleEventList.bind(this));
		document.getElementById(closeEventListId).addEventListener('click', this.toggleEventList.bind(this));
		document.getElementById(addEventId).addEventListener('click', this.addEventItem.bind(this));
		this.containerRef = document.getElementById(containerId);
		this.eventListRef = document.getElementById(eventListId);
	}

	private toggleEventList() {
		this.isEventListVisible = !this.isEventListVisible;
		this.containerRef.style.display = this.isEventListVisible ? 'block' : 'none';
	}

	private addEventItem() {
		const nextId = this.resources.events.size + 1;
		const nextStart = this.getNextEventStartTime();
		const nextEnd = '12:34';
		this.addEventToMap({ id: nextId, name: '', start: nextStart, end: nextEnd });

		const eventItem = document.createElement('div');
		eventItem.className = 'event-item';
		eventItem.id = `${this.eventIdBase}${nextId}`;
		// Create the name input
		const eventItemName = document.createElement('input');
		eventItemName.className = 'event-item-name';
		eventItemName.placeholder = 'Event Name';
		// Create the start time input
		const eventItemStart = document.createElement('input');
		eventItemStart.className = 'event-item-start';
		eventItemStart.value = nextStart;
		// Create the end time input
		const eventItemEnd = document.createElement('input');
		eventItemEnd.className = 'event-item-end';
		eventItemEnd.value = nextEnd;
		// Create the event remove button
		const eventItemRemove = document.createElement('button');
		eventItemRemove.innerHTML = 'X';
		eventItemRemove.className = 'remove-event-button';
		eventItemRemove.type = 'button';
		eventItemRemove.id = `${this.removeEventIdBase}${nextId}`;
		// Append the new elements
		eventItem.appendChild(eventItemName);
		eventItem.appendChild(eventItemStart);
		eventItem.appendChild(eventItemEnd);
		eventItem.appendChild(eventItemRemove);
		this.eventListRef.appendChild(eventItem);
	}

	private getNextEventStartTime(): string {
		const lastEvent = Array.from(this.resources.events.values()).pop();
		if (!lastEvent || lastEvent.end === '23:59') return '00:00';
		console.log(lastEvent.end);
		const lastEventParts = lastEvent.end.split(':');
		const minutes = parseInt(lastEventParts.pop(), 10);
		return `${lastEventParts[0]}:${minutes + 1}`;
	}

	private addEventToMap(event: Event) {
		this.resources.addEvent = { id: event.id, event };
		console.log(this.resources.events);
	}
}
