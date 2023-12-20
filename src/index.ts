import { Linking, NativeModules, Platform } from 'react-native';
import { AppList } from './constants';
import type { AppInstalledChecker, Apps } from './types';

const CheckAppInstallModule = NativeModules.CheckAppInstall;

class AppInstalled {
  static getSupportedApps() {
    return Object.keys(AppList);
  }

  static check(app: Apps) {
    return Platform.select({
      default: () => { return this.isAppInstalledIOS(app); },
      android: () => { return this.isAppInstalledAndroid(app); }
    })();
  };

  static checkPackageName(packageName: string) {
    return new Promise<boolean>((resolve) => {
      CheckAppInstallModule?.isPackageInstalled(packageName, (isInstalled: boolean) => {
        resolve(isInstalled);
      });
    });
  }

  static checkURLScheme(urlScheme: string, query: string) {
    return new Promise<boolean>((resolve) => {
      Linking
        .canOpenURL(urlScheme + '://' + query || '')
        .then((isInstalled) => {
          resolve(isInstalled);
        })
        .catch((_) => {
          resolve(false);
        });
    });
  }

  static isAppInstalledAndroid(app: Apps) {
    return this.checkPackageName(AppList[app].packageName);
  }

  static isAppInstalledIOS(app: Apps) {
    return this.checkURLScheme(AppList[app].urlScheme, AppList[app].urlParams);
  }
}

export default AppInstalled as AppInstalledChecker

export * from './constants'
