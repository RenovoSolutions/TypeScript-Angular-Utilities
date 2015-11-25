'use strict';

import * as _ from 'lodash';

export interface ITriggers {
	onChange: ITrigger;
	none: ITrigger;
}

export interface ITrigger {
	hasMatch(triggers: string): boolean;
	aliases: string[];
}

export class Trigger implements ITrigger {
	aliases: string[];

	constructor(aliases: string) {
		this.aliases = aliases.split(' ');
	}

	hasMatch(triggers: string): boolean {
		let triggerList: string[] = triggers.split(' ');
		return _.any(triggerList, (trigger: string): boolean => {
			return _.any(this.aliases, (alias: string): boolean => {
				return trigger === alias;
			});
		});
	}
}

export let triggers: ITriggers = {
	onChange: new Trigger('onChange'),
	none: new Trigger('none'),
};
