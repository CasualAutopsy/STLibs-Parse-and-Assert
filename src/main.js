import { STAssert, ExtAssert } from './main/st-assert.js';
import { STParse } from './main/st-parse.js';

import assertCMDs from './main/cmds/assert-cmds.js';

globalThis.STPALib = {
    STAssert,
    ExtAssert,
    STParse,
};

assertCMDs();
