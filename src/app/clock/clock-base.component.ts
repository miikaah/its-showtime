import { Clock } from '@app/clock/clock.interface';

export class ClockBaseComponent implements Clock {
	id: string;

	prefixNumber(value: number): string {
		return value < 10 ? `0${value}` : `${value}`;
	}

	render(time: string) {
		document.getElementById(this.id).innerHTML = time;
	}
}
