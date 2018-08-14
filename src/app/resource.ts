interface Resources {
	startTime?: string;
}

export class R {
	private static instance: R;
	private resources: Resources;

	private constructor() {
		this.modifyResources({
			startTime: '00:00'
		});
	}

	static getInstance() {
		if (!R.instance) R.instance = new R();
		return R.instance;
	}

	private modifyResources(resources: Resources) {
		this.resources = Object.freeze({ ...this.resources, ...resources });
	}

	get startTime(): string {
		return this.resources.startTime;
	}

	set startTime(time: string) {
		this.modifyResources({ startTime: time });
	}
}
