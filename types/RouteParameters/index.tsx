import type { Json } from "../Json";

/**
 * A table mapping route keys to the parameters they accept.
 */
export type RouteParameters = {
  readonly [key: string]: Json;
};
