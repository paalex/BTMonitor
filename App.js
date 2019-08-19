/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import EasyBluetooth from 'easy-bluetooth-classic';
import _ from 'lodash';

const MAC_ADDRESS = "00:90:68:56:7E:D4";
const SERVICE_UUID = "00001101-0000-1000-8000-00805F9B34FB";

const deviceToConnect = {
  address: "00:90:68:56:7E:D4",
  name: "SPP-CA",
  rssi: -78,
  uuids: [
    "00001101-0000-1000-8000-00805f9b34fb", "00000000-0000-1000-8000-00805f9b34fb",
    "00000000-0000-1000-8000-00805f9b34fb"
  ]
}

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Location for Bluetooth',
        message:
          'Location is required for Bluetooth ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Bluetooth');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

function onDataRead(data) {
  console.log("data", data);
}

async function initBT() {
  var config = {
    "uuid": SERVICE_UUID,
    "deviceName": "Bluetooth Example Project",
    "bufferSize": 1024,
    "characterDelimiter": "\n"
  }

  await EasyBluetooth.init(config)
    .catch(function (ex) {
      console.warn(ex);
    });
  console.log('done init BT')
  EasyBluetooth.addOnDataReadListener((data) => {
    onDataRead(data)
  });
  // EasyBluetooth.startScan()
  //   .then(function (devices) {
  //     console.log("all devices found:");
  //     const monitorDevice = _.find(devices, device => {
  //       debugger
  //       return device.address === MAC_ADDRESS
  //     });
  //     console.log('monitorDevice', monitorDevice);
  //   })
  //   .catch(function (ex) {
  //     console.warn(ex);
  //   });
  EasyBluetooth.connect(deviceToConnect)
    .then((dt) => {

      console.log("Connected!", dt);
    })
    .catch((ex) => {
      console.warn(ex);
    })

}

const App = () => {
  requestLocationPermission()
    .then(() => initBT())
    .catch(e => console.log(e))
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
