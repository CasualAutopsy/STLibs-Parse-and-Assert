import '../../../../global';
import '../STLibs-Unstable-Context/libs';

declare global {
    type JSONTypes = string | number | boolean | object | null | (string | number | boolean | object | null)[];

    type JSONSchema = Record<string, JSONTypes>;
}

export {};
