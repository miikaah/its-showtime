import { R } from '@app/resource';

const resources = R.getInstance();

describe('Resources', () => {
	it('should create', () => {
		expect(resources).toBeDefined();
	});
});
