import { mkdirSync, readFileSync, writeFileSync } from 'fs';

const validate = (type: 'day' | 'part', num: number, max: number) => {
  if (isNaN(num) || isNaN(max) || num < 1 || num > max + 1)
    throw new Error(
      `The ${type} must be number between 1 and ${max}, you entered ${num}`
    );
};

export const getArg = (argName: 'day' | 'part'): number => {
  const arg = process.argv.find((value) => value.startsWith(argName));
  const value = Number(arg?.split('=')[1]);
  validate(argName, value, argName === 'day' ? 25 : 2);
  return value;
};

export const formatDay = (day: number | string): string =>
  day.toString().padStart(2, '0');

/**
 * @typedef {Object} SplitOptions
 * @property {string|false} [delimiter='\n'] - a delimeter to split the input by (false will omit the splitting and return the entire input)
 * @property {funcion(string, number, string[]): *|false} [mapper=Number] - a function that will be used to map the splitted input (false will omit the mapping and return the splitted input)
 */
interface SplitOptions<T> {
  delimiter?: string;
  mapper?: ((e: string, i: number, a: string[]) => T) | false;
}

export function parseInput(): number[];
export function parseInput(options: { split: false }): string;
export function parseInput(options: {
  split: { delimiter?: string; mapper: false };
}): string[];
export function parseInput(options: { split: { delimiter: string } }): number[];
export function parseInput<T>(options: { split: SplitOptions<T> }): T[];
/**
 * Parse the input from {day}/input.txt
 * @param {SplitOptions} [split]
 */
export function parseInput<T>({
  split,
}: { split?: SplitOptions<T> | false } = {}) {
  const DAY = getArg('day');
  const input = readFileSync(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    `./src/day${formatDay(DAY)}/input.txt`,
    {
      encoding: 'utf-8',
    }
  );

  if (split === false) return input;

  const splitted = input.split(split?.delimiter ?? '\n');
  const mapper = split?.mapper;

  return mapper === false
    ? splitted
    : splitted.map((...args) => mapper?.(...args) ?? Number(args[0]));
}

const genTemplate = (part: 1 | 2) => `import { parseInput } from '../util';

const input = parseInput();

// TODO: Complete Part ${part}
`;

export const setupDay = (day: number) => {
  const dir = `./src/day${formatDay(day)}`;
  mkdirSync(dir);
  writeFileSync(`${dir}/input.txt`, '');
  writeFileSync(`${dir}/part1.ts`, genTemplate(1));
  writeFileSync(`${dir}/part2.ts`, genTemplate(2));
};
