export interface Clock {
	id: string;
	render: (time?: string) => void;
	prefixNumber?: (value: number) => string;
}
