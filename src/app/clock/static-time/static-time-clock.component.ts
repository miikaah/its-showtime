import { ClockBaseComponent } from '@app/clock/clock-base.component';

export class StaticTimeClock extends ClockBaseComponent {
	constructor(id: string, date: Date) {
		super();
		this.id = id;
		this.render(date);
	}

	protected render(date: Date) {
		(document.getElementById(this.id) as any).value = this.formatTime(date);
	}

	private formatTime(date: Date): string {
		const time = date instanceof Date ? date : new Date();
		return `${this.prefixNumber(time.getHours())}:${this.prefixNumber(time.getMinutes())}`;
	}
}
