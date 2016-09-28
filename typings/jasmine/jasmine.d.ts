declare var describe: { (name: string, specs: { (): any }) };
declare var it: { (name: string, spec: { (done?: Function): any }) };
declare var beforeEach: { (setup: { (): any }) };
declare var afterEach: { (cleanup: { (): any }) };
