# react-native-check-app-install

Check installed app

## Installation

```sh
yarn add react-native-check-app-install
```
## Android
add to your `android/app/src/main/AndroidManifest.xml` file the following lines:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  ...
    <queries>
      <package android:name="com.whatsapp"/>
      <package android:name="com.facebook.katana"/>
      <package android:name="com.facebook.orca"/>
      <package android:name="com.skype.raider"/>
      <package android:name="com.tencent.mm"/>
      <package android:name="com.snapchat.android"/>
      <package android:name="com.twitter.android"/>
      <package android:name="com.google.android.youtube"/>
      <package android:name="com.netflix.mediaclient"/>
      <package android:name="com.instagram.android"/>
      <package android:name="com.spotify.mobile.android.ui"/>
      <package android:name="com.Slack"/>
      <package android:name="com.pinterest"/>
      <package android:name="com.ubercab"/>
      <package android:name="com.amazon.mShop.android.shopping"/>
      <package android:name="com.soundcloud.android"/>
      <package android:name="com.google.android.apps.maps"/>
      <package android:name="com.android.chrome"/>
      <package android:name="com.google.android.gm"/>
      <package android:name="com.google.android.apps.docs"/>
      <package android:name="com.dropbox.android"/>
      <package android:name="com.google.android.talk"/>
      <package android:name="com.evernote"/>
      <package android:name="org.videolan.vlc"/>
      <package android:name="com.tumblr"/>
      <package android:name="com.yahoo.mobile.client.android.flickr"/>
      <package android:name="com.linkedin.android"/>
      <package android:name="com.abnamro.nl.mobile.payments"/>
      <package android:name="nl.asnbank.asnbankieren"/>
      <package android:name="bankieren.ideal.ing.nl"/>
      <package android:name="bvm.bvmapp"/>
      <package android:name="nl.rabobank.identificeren"/>
      <package android:name="nl.rabobank.ideal"/>
      <package android:name="nl.regiobank.regiobankieren"/>
      <package android:name="nl.snsbank.snsbankieren"/>
      <package android:name="triodosmobilebanking"/>
      <package android:name="com.LoginApp"/>
      <package android:name="com.handelsbanken.mobile.android.ukpriv"/>
      <package android:name="com.revolut.revolut"/>
      <package android:name="com.ing.mobile"/>

      <provider android:authorities="com.facebook.katana.provider.PlatformProvider"/>

      <!-- intent for ING -->
      <intent>
        <action android:name="android.intent.action.VIEW"/>
        <data android:scheme="bankieren.ideal.ing.nl"/>
      </intent>
      <intent>
        <action android:name="android.intent.action.VIEW"/>
        <data android:scheme="com.ing.mobile"/>
      </intent>

      <!-- intent for Triodos Bank -->
      <intent>
        <action android:name="android.intent.action.VIEW"/>
        <data android:scheme="triodosmobilebanking"/>
      </intent>

      <!-- intent for Van Lanschot Bank -->
      <intent>
        <action android:name="android.intent.action.VIEW"/>
        <data android:scheme="authenticate"/>
      </intent>

      <!-- intent for Handelsbanken -->
      <intent>
        <action android:name="android.intent.action.VIEW"/>
        <data android:scheme="shb-nlpriv"/>
      </intent>

      <!-- If your app opens https URLs -->
      <intent>
        <action android:name="android.intent.action.VIEW"/>
        <data android:scheme="http"/>
      </intent>
      <intent>
        <action android:name="android.intent.action.VIEW"/>
        <data android:scheme="https"/>
      </intent>

      <!-- If your app makes calls -->
      <intent>
        <action android:name="android.intent.action.DIAL"/>
        <data android:scheme="tel"/>
      </intent>

      <!-- If your app emails -->
      <intent>
        <action android:name="android.intent.action.SEND"/>
        <data android:mimeType="*/*"/>
      </intent>
    </queries>
</manifest>

```

## Usage

```js

export default function App() {
  const [results, setList] = React.useState<{name: Apps; isInstalled: boolean; }[]>([]);

  React.useEffect(() => {
    const appCheckResultsPKG: { name: Apps; isInstalled: boolean; }[] = []
    let checkCounterPKG = 0;
    AppInstalled.getSupportedApps()
      .forEach((d) => {
        checkCounterPKG++;
        AppInstalled
          .check(d)
          .then((isInstalled) => {
            checkCounterPKG--;
            appCheckResultsPKG.push({name: d, isInstalled: isInstalled});
            if (checkCounterPKG === 0) {
              setList(appCheckResultsPKG);
            }
          });
      });

  }, []);
  console.log(results)

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={({item}) => (
          <View style={styles.box}>
            <Text style={[{color: item.isInstalled ? 'green' : 'red', flex: 1}]}>
              {item.name}
            </Text>
            <Text>
              {item.isInstalled ? '✔️' : '❌'}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.name}
        style={{width: '100%', flex: 1}}
      />
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
