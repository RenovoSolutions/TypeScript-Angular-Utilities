import { HttpDigestService, IHttpDigestService } from './httpDigest.service';

describe('HttpDigestService', (): void => {
    let httpDigestService: IHttpDigestService;

    beforeEach((): void => {
        httpDigestService = new HttpDigestService();
    });

    it('should call the passed in function', (): void => {
        const mockFunc = sinon.spy();

        httpDigestService.startDigestCycle(mockFunc);

        sinon.assert.calledOnce(mockFunc);
    });

    it('should not call the passed in function if null', (): void => {
        const mockFunc = null;
        const mockFuncSpy = sinon.spy(mockFunc);

        httpDigestService.startDigestCycle(mockFunc);

        sinon.assert.notCalled(mockFuncSpy);
    });
})