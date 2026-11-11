import { STAssert, ExtAssert } from './src/main/st-assert.js';
import { STParse } from './src/main/st-parse.js';

declare global {
    var STPALib: {
        STAssert: typeof STAssert;
        ExtAssert: typeof ExtAssert;
        STParse: typeof STParse;
    }

    type JSONTypes = string | number | boolean | object | null | (string | number | boolean | object | null)[];

    type JSONSchema = Record<string, JSONTypes>;
}

export {};
