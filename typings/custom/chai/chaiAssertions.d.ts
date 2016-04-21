declare var expect: Chai.ExpectStatic;
declare var assert: Chai.AssertStatic;

declare module Chai {
	interface ChaiStatic {
		Assertion: Assertion;
	}

	interface Assertion extends MomentAssertion {
		addMethod: Function;
	}

	interface MomentAssertion {
		sameMoment(value: any, message?: string): Assertion;
		equalMoment(value: any, message?: string): Assertion;
		afterMoment(value: any, message?: string): Assertion;
		beforeMoment(value: any, message?: string): Assertion;
	}
}