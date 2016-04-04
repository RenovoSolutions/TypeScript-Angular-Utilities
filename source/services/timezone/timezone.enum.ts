'use strict';

import * as _ from 'lodash';

// functions like an itemList but doesn't want name and value

export interface ITimezone {
	offset: string;
	display: string;
	momentName: string;
}

export interface ITimezones {
	AST: ITimezone;
	EST: ITimezone;
	CST: ITimezone;
	MST: ITimezone;
	PST: ITimezone;
	AKST: ITimezone;
	HAST: ITimezone;

	get(offset: string): ITimezone;
	all(): ITimezone[];
}

class Timezones implements ITimezones {
	AST: ITimezone = new Timezone ({
		offset: '-04:00',
		display: 'AST',
		momentName: 'Canada/Atlantic',
	});
	EST: ITimezone = new Timezone ({
		offset: '-05:00',
		display: 'EST',
		momentName: 'US/Eastern',
	});
	CST: ITimezone = new Timezone ({
		offset: '-06:00',
		display: 'CST',
		momentName: 'US/Central',
	});
	MST: ITimezone = new Timezone ({
		offset: '-07:00',
		display: 'MST',
		momentName: 'US/Mountain',
	});
	PST: ITimezone = new Timezone ({
		offset: '-08:00',
		display: 'PST',
		momentName: 'US/Pacific',
	});
	AKST: ITimezone = new Timezone ({
		offset: '-09:00',
		display: 'AKST',
		momentName: 'US/Alaska',
	});
	HAST: ITimezone = new Timezone ({
		offset: '-10:00',
		display: 'HAST',
		momentName: 'US/Hawaii',
	});

	items: ITimezone[];

	constructor() {
		this.items = [
			this.AST,
			this.EST,
			this.CST,
			this.MST,
			this.PST,
			this.AKST,
			this.HAST,
		];
	}

	get(offsetOrMomentName: string): ITimezone {
		return _.find(this.items, (item: ITimezone): boolean => {
			return (item.offset === offsetOrMomentName || item.momentName === offsetOrMomentName);
		});
	}

	all(): ITimezone[] {
		return this.items;
	}
}

class Timezone implements ITimezone {
	offset: string;
    display: string;
	momentName: string;

	constructor(data: ITimezone) {
		this.offset = data.offset;
		this.display = data.display;
		this.momentName = data.momentName;
	}
}

export let timezones: ITimezones = new Timezones();
