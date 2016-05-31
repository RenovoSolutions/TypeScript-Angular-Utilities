/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', async(() => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   }
 * }));
 * ```
 */
function async(fn: Function): { (done?: MochaDone): void } {
	return () => new Promise<void>((finishCallback, failCallback) => {
		var AsyncTestZoneSpec = (<any>window).Zone['AsyncTestZoneSpec'];
		var testZoneSpec = new AsyncTestZoneSpec(finishCallback, failCallback, 'test');
		var testZone = (<any>window).Zone.current.fork(testZoneSpec);
		return testZone.run(fn);
	});
}

export default async;
