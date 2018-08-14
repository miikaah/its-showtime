export interface Event {
	id: string;
	name: string;
	start: string;
	end: string;
}

export interface Resources {
	startTime?: string;
	events?: Map<string, Event>;
}

export class R {
	private static instance: R;
	private resources: Resources;

	private constructor() {
		this.modifyResources({
			startTime: '00:00',
			events: new Map<string, Event>();
		});
	}

	static getInstance() {
		if (!R.instance) R.instance = new R();
		return R.instance;
	}

	private modifyResources(resources: Resources) {
		this.resources = Object.freeze({ ...this.resources, ...resources });
	}

	get startTime(): string {
		return this.resources.startTime;
	}

	set startTime(time: string) {
		this.modifyResources({ startTime: time });
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
