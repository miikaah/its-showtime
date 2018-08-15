export interface Event {
	id: string;
	name: string;
	startDate: Date;
	endDate: Date;
}

export interface Resources {
	events?: Map<string, Event>;
}

export class R {
	private static instance: R;
	private resources: Resources;

	private constructor() {
		this.modifyResources({
			events: new Map<string, Event>([
				['1', { id: '1', name: '', startDate: new Date(2018, 7, 15, 18), endDate: new Date(2018, 7, 15, 19)}]
			])
		});
	}

	static getInstance() {
		if (!R.instance) R.instance = new R();
		return R.instance;
	}

	private modifyResources(resources: Resources) {
		this.resources = Object.freeze({ ...this.resources, ...resources });
	}

	get startTime(): Date {
		return this.resources.events.size === 0 ? new Date() : (this.getNextOrCurrentEvent() || {} as any).startDate;
	}

	get endTime(): Date {
		return this.resources.events.size === 0 ? new Date() : (this.getNextOrCurrentEvent() || {} as any).endDate;
	}

	private getNextOrCurrentEvent(): Event {
		const now = (new Date()).getTime();
		// Map is sorted by startDate
		for (let i = 0; i < this.resources.events.size; i++) {
			const event = this.resources.events.values().next().value;
			if (this.hasUpcomingEvent(event, now)) return event;
			if (this.hasCurrentEvent(event, now)) return event;
		}
	}

	private hasUpcomingEvent(event: Event, now: number): boolean {
		return event.startDate.getTime() > now;
	}

	private hasCurrentEvent(event: Event, now: number): boolean {
		return event.startDate.getTime() <= now && event.endDate.getTime() >= now;
	}

	get events(): Map<string, Event> {
		return this.resources.events;
	}

	set addEvent(options: { id: string, event: Event }) {
		this.resources.events.set(options.id, options.event);
	}

	set removeEvent(id: string) {
		this.resources.events.delete(id);
	}
}
