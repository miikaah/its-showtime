import { R } from '@app/resource';

export class EventDisplayComponent {
	private currentEventRef: any;
	private nextEventRef: any;

	constructor(
			private currentEventId: string,
			private nextEventId: string,
			private resources: R) {
		this.currentEventRef = document.getElementById(this.currentEventId);
		this.nextEventRef = document.getElementById(this.nextEventId);
		this.render();
	}

	render() {
		this.currentEventRef.innerHTML = this.getCurrentEventName();
		this.nextEventRef.innerHTML = this.resources.eventsSize < 2 ? '' : this.getNextEventName();
	}

	update() {
		this.render();
	}

	private getCurrentEventName(): string {
		return (this.resources.currentEvent || {} as any).name || this.getNextEventName();
	}

	private getNextEventName(): string {
		return (this.resources.nextEvent || {} as any).name || '';
	}
}
