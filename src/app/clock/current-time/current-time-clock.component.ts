import { ClockBaseComponent } from '@app/clock/clock-base.component';
import { prefixNumber } from '@app/utils';

export class CurrentTimeClock extends ClockBaseComponent {
	constructor(protected id: string) {
		super();
		setInterval(this.setTime.bind(this), 500);
	}

	private setTime() {
		const now = new Date();
		this.render(`${prefixNumber(now.getHours())}:${prefixNumber(now.getMinutes())}`);
	}
}
