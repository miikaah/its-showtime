import { Clock } from '@app/clock/clock.interface';
import { ClockBaseComponent } from '@app/clock/clock-base.component';

export class StaticTimeClock extends ClockBaseComponent implements Clock {
	constructor(id: string, time: string) {
		super();
		this.id = id;
		this.render(time);
	}

	private render(time: string) {
		document.getElementById(this.id).value = time;
	}
}
