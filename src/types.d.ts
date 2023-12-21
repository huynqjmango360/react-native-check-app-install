import type {AppList} from './constants';

declare module 'react-native-check-app-install' {

  export type AppName = keyof typeof AppList

  export default interface AppInstalledChecker {
    getSupportedApps: () => AppName[]
    check: (app: AppName) => Promise<boolean>
  }
}
