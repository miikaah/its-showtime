import { StyleChanger } from './style-changer.component';
import { R } from '@app/resource';

const styleChanger = new StyleChanger(
	'showtime-counter-clock',
	'event-name-current',
	R.getInstance()
);

describe('StyleChanger', () => {
	it('should create', () => {
		expect(styleChanger).toBeDefined();
	});
});
