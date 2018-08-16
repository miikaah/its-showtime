export interface Event {
	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
}

export interface Resources {
	events: Event[];
}

export class R {

	private constructor() {
		// Read resources from local storage
		this.resources = JSON.parse(localStorage.getItem('resources')) || { events: [] };
		this.convertEventStringsToDates();
	}

	get startTime(): Date | undefined {
		return this.eventsSize === 0 ? new Date() : (this.getNextOrCurrentEvent() || {} as any).startDate;
	}

	get endTime(): Date | undefined {
		return this.eventsSize === 0 ? new Date() : (this.getNextOrCurrentEvent() || {} as any).endDate;
	}

	get eventsSize(): number {
		return this.resources.events.length;
	}

	get events(): Event[] {
		return this.resources.events;
	}

	set events(events: Event[]) {
		this.modifyResources({ events });
	}

	set addEvent(event: Event) {
		this.modifyResources({ events: [...this.resources.events, event] });
	}

	set removeEvent(id: string) {
		this.modifyResources({ events: this.resources.events.filter((e) => e.id !== id) });
	}
	private static instance: R;
	private resources: Resources;

	static getInstance() {
		if (!R.instance) R.instance = new R();
		return R.instance;
	}

	private convertEventStringsToDates() {
		for (const event of this.resources.events) {
			event.startDate = new Date(event.startDate);
			event.endDate = new Date(event.endDate);
		}
	}

	private getNextOrCurrentEvent(): Event | undefined {
		const now = (new Date()).getTime();
		for (const event of this.resources.events) {
			if (this.hasCurrentEvent(event, now)) return event;
			if (this.hasUpcomingEvent(event, now)) return event;
		}
	}

	private hasUpcomingEvent(event: Event, now: number): boolean {
		return event.startDate.getTime() > now;
	}

	private hasCurrentEvent(event: Event, now: number): boolean {
		return event.startDate.getTime() <= now && event.endDate.getTime() >= now;
	}

	private modifyResources(resources: Resources) {
		this.resources = Object.freeze({ ...this.resources, ...resources });
		this.sortEventsByStartDate();
		// Save resources to local storage
		localStorage.setItem('resources', JSON.stringify(this.resources));
	}

	private sortEventsByStartDate() {
		this.resources.events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
	}
}
