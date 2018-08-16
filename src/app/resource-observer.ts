import { Observer } from '@app/observer.interface';

export class ResourceObserver implements Observer {
	constructor(private fn: () => void) {}

	update() {
		this.fn();
	}
}
