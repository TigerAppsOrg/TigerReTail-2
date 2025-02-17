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
