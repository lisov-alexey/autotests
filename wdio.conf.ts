import type { Options } from '@wdio/types'
export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './test/tsconfig.json',
            transpileOnly: true
        }
    },
    
    specs: [
        './e2e-tests/projects/enotes/specs/**/*.ts'
    ],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],

    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 5000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'jasmine',
    reporters: ['spec'],
    jasmineOpts: {
        defaultTimeoutInterval: 60000,
        expectationResultHandler: function(passed, assertion) {
        }
    },
}
