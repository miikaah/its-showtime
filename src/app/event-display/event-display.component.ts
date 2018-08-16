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
		this.currentEventRef.innerHTML = this.getCurrentOrNextEventName();
		this.nextEventRef.innerHTML = this.getCurrentEventName() ? this.getNextEventName() : '';
	}

	update() {
		this.render();
	}

	private getCurrentOrNextEventName(): string {
		return this.getCurrentEventName() || this.getNextEventName();
	}

	private getCurrentEventName(): string {
		return (this.resources.currentEvent || {} as any).name;
	}

	private getNextEventName(): string {
		return (this.resources.nextEvent || {} as any).name || '';
	}
}
