export type StringFunction = { (value: string, number: number): string };

export type StringOrStringFunction = string | StringFunction;

export type ErrorMessageParams = { value: string; number: number };
