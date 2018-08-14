import { Clock } from '@app/clock/clock.interface';
import { ClockBaseComponent } from '@app/clock/clock-base.component';

export class CurrentTimeClock extends ClockBaseComponent implements Clock {
	constructor(id: string) {
		super();
		this.id = id;
		setInterval(this.setTime.bind(this), 500);
	}

	setTime() {
		const now = new Date(Date.now());
		this.render(`${this.prefixNumber(now.getHours())}:${this.prefixNumber(now.getMinutes())}`);
	}
}
