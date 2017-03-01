import { SinonStatic } from 'sinon';

declare global {
  const sinon: SinonStatic;
}

import * as moment from "moment";

declare module "moment" {
    export type MomentFormatSpecification = string;
}

export = moment;
