import { Clock } from '@app/clock/clock.interface';
import { ClockBaseComponent } from '@app/clock/clock-base.component';
import { R } from '@app/resource';

export class ShowtimeCounterClock extends ClockBaseComponent implements Clock {
	private startMinutes: number;

	constructor(id: string, r: R) {
		super();
		this.id = id;
		const startTimeParts = r.startTime.split(':');
		const startHours = +startTimeParts[0];
		const startMinutes = +startTimeParts[1];
		this.startMinutes = (startHours * 60) + startMinutes;
		setInterval(this.setTime.bind(this), 500);
	}

	private setTime() {
		this.render(this.getTime());
	}

	private getTime(): string {
		const now = new Date(Date.now());
		return this.formatTime(this.startMinutes - ((now.getHours() * 60) + now.getMinutes()));
	}

	private formatTime(totalMinutes: number): string {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		if (hours < 1) return `${minutes} min`;
		if (hours < 2) return `${hours} h ${minutes} min`;
		return `${hours} h ${minutes} min`;
	}
}
