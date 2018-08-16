import { R } from '@app/resource';

export class StyleChanger {
	COLOR_TEXT = '#fff';
	COLOR_BG = '#000';
	COLOR_HIGHLIGHT = '#f00';
	COLOR_HIGHLIGHT_TEXT = '#fff';

	constructor(
		private showtimeId: string,
		private eventNameId: string,
		private resources: R
	) {}

	update() {
		console.log('update');
		if (this.resources.currentEvent) {
			document.getElementById(this.showtimeId).style.color = this.COLOR_HIGHLIGHT;
			document.getElementById(this.eventNameId).style.color = this.COLOR_HIGHLIGHT;
		} else {
			document.getElementById(this.showtimeId).style.color = this.COLOR_TEXT;
			document.getElementById(this.eventNameId).style.color = this.COLOR_TEXT;
		}
	}
}
