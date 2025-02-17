/**
 * A discriminated union type for handling operation results with success and error cases.
 *
 * @template T The type of the success data
 * @template E The type of the error data
 *
 * @example
 * // Success case
 * const success: Result<number, string> = {
 *   ok: true,
 *   data: 42
 * };
 *
 * // Error case
 * const error: Result<number, string> = {
 *   ok: false,
 *   error: "Something went wrong"
 * };
 */
export type Result<T, E> =
    | {
          ok: true;
          data: T;
      }
    | {
          ok: false;
          error: E;
      };

export const GITHUB_LINK = "https://github.com/TigerAppsOrg/TigerRetail-2";

export const EMAIL_WHITELIST = [
    "dachshunduniverse@gmail.com",
    "joshuamotoaki@gmail.com",
    "epicminor360@gmail.com"
];
