import { ClockBaseComponent } from '@app/clock/clock-base.component';
import { R } from '@app/resource';

export class ShowtimeCounterClock extends ClockBaseComponent {
	constructor(protected id: string, private resources: R) {
		super();
		setInterval(this.setTime.bind(this), 500);
	}

	private setTime() {
		this.resources.hasActualEvents ? this.render(this.getTimeLeft()) : this.render('<(^_^)>');
	}

	private getTimeLeft(): string {
		if (!this.resources.startTime) return;
		const seconds = this.getSecondsLeft();
		// Start countdown by seconds at 60 sec
		const minutes = seconds > 60 && seconds < 90 ? Math.ceil(seconds / 60) : Math.round(seconds / 60);
		return this.formatTime(minutes);
	}

	private formatTime(totalMinutes: number): string {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		const seconds = minutes < 2 ? Math.ceil(this.getSecondsLeft()) : NaN;
		if (seconds <= 60) return `${seconds} s`;
		if (hours < 1) return `${minutes} min`;
		if (hours === 1 && hours < 2 && minutes === 0) return `${hours} h`;
		if (hours === 1 && hours < 2) return `${hours} h ${minutes} min`;
		if (hours >= 24 && hours < 48) return '1 day';
		if (hours >= 48) return 'Many days';
		return `${hours} h ${minutes} min`;
	}

	private getSecondsLeft(): number {
		const currentEvent = this.resources.currentEvent;
		const time = currentEvent
			? currentEvent.startDate.getTime()
			: this.resources.nextEvent.startDate.getTime();
		const now = (new Date()).getTime();
		return (currentEvent ? currentEvent.endDate.getTime() - now : time - now) / 1000;
	}
}
