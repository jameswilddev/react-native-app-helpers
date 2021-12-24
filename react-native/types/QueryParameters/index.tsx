import type { QueryParameter } from "../QueryParameter";

/**
 * A map of query parameter keys to values.
 */
export type QueryParameters = {
  /**
   * The mapped query parameter keys and values.
   */
  readonly [key: string]: QueryParameter;
};
