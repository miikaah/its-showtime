export class ClockBaseComponent {
	protected id: string;

	protected render(time: any) {
		document.getElementById(this.id).innerHTML = time;
	}
}
