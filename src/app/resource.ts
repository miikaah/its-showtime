export class R {
	private static instance: R;
	private resources: {
		startTime: string;
	};

	private constructor() {
		this.resources = {
			startTime: '00:00'
		};
	}

	static getInstance() {
		if (!R.instance) R.instance = new R();
		return R.instance;
	}

	get startTime(): string {
		return Object.freeze(this.resources.startTime);
	}

	set startTime(time: string) {
		this.resources.startTime = time;
	}
}
