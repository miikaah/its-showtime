export class ClockBaseComponent {
	protected id: string;

	protected prefixNumber(value: number): string {
		return value < 10 ? `0${value}` : `${value}`;
	}

	protected render(time: any) {
		document.getElementById(this.id).innerHTML = time;
	}
}
