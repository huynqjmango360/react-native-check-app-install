import * as React from 'react';

import {StyleSheet, View, Text, FlatList} from 'react-native';
import AppInstalled, {type AppName} from 'react-native-check-app-install';

export default function App() {
  const [results, setList] = React.useState<{name: AppName; isInstalled: boolean; }[]>([]);

  React.useEffect(() => {
    const appCheckResultsPKG: { name: AppName; isInstalled: boolean; }[] = []
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
  },
});
