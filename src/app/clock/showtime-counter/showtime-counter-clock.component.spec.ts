import { ShowtimeCounterClock } from './showtime-counter-clock.component';

const resourceMock = jest.genMockFromModule('../../resource');

const showtime = new ShowtimeCounterClock('showtime-counter-clock', (resourceMock as any));

const fakeEndDate = new Date(2018, 7, 31, 17, 37);
const fakeEvent = { id: 'bar', name: 'foo', startDate: new Date(), endDate: fakeEndDate };

describe('ShowtimeCounterClock', () => {
	it('should create', () => {
		expect(showtime).toBeDefined();
	});

	describe('setTime', () => {
		it('should set default time', () => {
			const renderSpy = jest.spyOn((showtime as any), 'render');
			(showtime as any).setTime();
			expect(renderSpy).toHaveBeenCalledWith('<(^_^)>');
		});

		it('should call getTimeLeft', () => {
			const getTimeLeftSpy = jest.spyOn((showtime as any), 'getTimeLeft');
			(resourceMock as any).hasActualEvents = true;
			(showtime as any).setTime();
			expect(getTimeLeftSpy).toHaveBeenCalled();
		});
	});

	describe('getTimeLeft', () => {
		it.only('should return time in correct format', () => {
			(resourceMock as any).startTime = jest.fn().mockReturnValue(true);
			(resourceMock as any).currentEvent = fakeEvent;
			expect((showtime as any).getTimeLeft()).toBe('');
		});
	});
});
