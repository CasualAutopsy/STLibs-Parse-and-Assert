import { STAssert, ExtAssert } from './src/main/st-assert.js';
import { STParse } from './src/main/st-parse.js';

declare global {
    var STPALib: {
        STAssert: typeof STAssert;
        ExtAssert: typeof ExtAssert;
        STParse: typeof STParse;
    }
}

export {};
