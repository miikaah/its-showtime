import { ClockBaseComponent } from '@app/clock/clock-base.component';
import { R } from '@app/resource';

export class ShowtimeCounterClock extends ClockBaseComponent {
	private startMinutes: number;

	constructor(id: string, private resources: R) {
		super();
		this.id = id;
		const startTime = this.resources.startTime;
		if (!startTime) {
			this.render('<(^_^)>');
			return this;
		}
		const startHours = this.resources.startTime.getHours();
		const startMinutes = this.resources.startTime.getMinutes();
		this.startMinutes = (startHours * 60) + startMinutes;
		setInterval(this.setTime.bind(this), 500);
	}

	private setTime() {
		this.render(this.getTimeLeft());
	}

	private getTimeLeft(): string {
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
