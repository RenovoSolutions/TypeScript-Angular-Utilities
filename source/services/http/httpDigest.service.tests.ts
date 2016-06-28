import {HttpDigestService} from './httpDigest.service';

describe('HttpDigestService', (): void => {
	it('should call the passed in function', (): void => {
        const httpDigestService = new HttpDigestService();
        const functionToCall = sinon.spy();

        httpDigestService.startDigestCycle(functionToCall);

        sinon.assert.calledOnce(functionToCall);
    });

	it('should not call the passed in function if null', (): void => {
        const httpDigestService = new HttpDigestService();
        const functionToNotCall = null;
        const functionSpy = sinon.spy(functionToNotCall);

        httpDigestService.startDigestCycle(functionToNotCall);

        sinon.assert.notCalled(functionSpy);
	});
});
