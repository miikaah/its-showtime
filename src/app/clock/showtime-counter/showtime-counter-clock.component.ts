import { ClockBaseComponent } from '@app/clock/clock-base.component';
import { R } from '@app/resource';

export class ShowtimeCounterClock extends ClockBaseComponent {
	constructor(protected id: string, private resources: R) {
		super();
		setInterval(this.setTime.bind(this), 500);
	}

	private setTime() {
		this.resources.eventsSize === 0 ? this.render('<(^_^)>') : this.render(this.getTimeLeft());
	}

	private getTimeLeft(): string {
		const now = new Date(Date.now());
		if (!this.resources.startTime) return;
		const startHours = this.resources.startTime.getHours();
		const startMinutes = (startHours * 60) + this.resources.startTime.getMinutes();
		return this.formatTime(startMinutes - ((now.getHours() * 60) + now.getMinutes()));
	}

	private formatTime(totalMinutes: number): string {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		if (hours < 1) return `${minutes} min`;
		if (hours < 2) return `${hours} h ${minutes} min`;
		return `${hours} h ${minutes} min`;
	}
}
