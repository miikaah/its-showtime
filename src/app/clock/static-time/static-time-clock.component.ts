import { ClockBaseComponent } from '@app/clock/clock-base.component';
import { prefixNumber } from '@app/utils';
import { R } from '@app/resource';

export class StaticTimeClock extends ClockBaseComponent {
	constructor(protected id: string, private time: 'startTime' | 'endTime', private resources: R) {
		super();
		this.update();
	}

	update() {
		this.render(this.resources[this.time]);
	}

	protected render(date: Date) {
		(document.getElementById(this.id) as any).value = this.formatTime(date);
	}

	private formatTime(date: Date): string {
		const time = date instanceof Date ? date : new Date();
		return `${prefixNumber(time.getHours())}:${prefixNumber(time.getMinutes())}`;
	}
}
