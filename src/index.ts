import { Linking, NativeModules, Platform } from 'react-native';
import { AppList } from './constants';

const CheckAppInstallModule = NativeModules.CheckAppInstall;

class AppInstalled {
  static getSupportedApps() {
    return Object.keys(AppList) as AppName[];
  }

  static check(app: AppName) {
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

  static isAppInstalledAndroid(app: AppName) {
    return this.checkPackageName(AppList[app].packageName);
  }

  static isAppInstalledIOS(app: AppName) {
    return this.checkURLScheme(AppList[app].urlScheme, AppList[app].urlParams);
  }
}

export default AppInstalled

export * from './types'

export * from './constants'
