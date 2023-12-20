import type {AppList} from './constants';

export type Apps = keyof typeof AppList

export interface AppInstalledChecker {
  getSupportedApps: () => Apps[]
  check: (app: Apps) => Promise<boolean>
}
