/**
 * Describes an object what can be serialized into a query param string.
 */
export interface QueryParamObject {
  [key: string]: string | number | boolean | (string | number | boolean)[];
}
