/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
import { formatDay, getArg } from './util';

const outputSolution = (day: number, part: number) => {
  console.log(`🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄`);
  console.log(`🎄                                  🎄`);
  console.log(`🎄       Day ${day} | Part ${part}             🎄`);
  console.log(`🎄                                  🎄`);
  console.log(`🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄`);
  console.log(
    `\nSolution: ${require(`./day${formatDay(day)}/part${part}.ts`).default}`
  );
};

const DAY = getArg('day');
const PART = getArg('part');

outputSolution(DAY, PART);
