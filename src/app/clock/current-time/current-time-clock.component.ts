import { ClockBaseComponent } from '@app/clock/clock-base.component';

export class CurrentTimeClock extends ClockBaseComponent {
	constructor(id: string) {
		super();
		this.id = id;
		setInterval(this.setTime.bind(this), 500);
	}

	private setTime() {
		const now = new Date(Date.now());
		this.render(`${this.prefixNumber(now.getHours())}:${this.prefixNumber(now.getMinutes())}`);
	}
}
