import {
  AppState,
  PermissionsAndroid,
  DeviceEventEmitter,
  EmitterSubscription,
  AppStateStatus,
  NativeEventSubscription,
  Platform,
  NativeEventEmitter,
} from 'react-native';
import Beacons from '@rodrigo7/react-native-beacons-manager';
import type {
  Beacon,
  BeaconRangingResponse,
  BeaconRegion,
} from '@rodrigo7/react-native-beacons-manager';

class BeaconService {
  private static beaconListener: EmitterSubscription | null = null;
  private static eventEmitter: NativeEventEmitter = new NativeEventEmitter(
    Beacons,
  );

  private static appStateListener: NativeEventSubscription | null | void = null;
  static init() {
    console.log(Platform.OS);
    if (Platform.OS === 'ios') {
      this.appStateListener = AppState.addEventListener(
        'change',
        this.handleAppStateChange,
      );
      BeaconService.initializeIOS();
    } else if (Platform.OS === 'android') {
      BeaconService.checkPermissionsAndroid()
        .then(() => {
          this.appStateListener = AppState.addEventListener(
            'change',
            this.handleAppStateChange,
          );
          BeaconService.initializeAndroid();
        })
        .catch(err => console.log(err));
    }
  }

  static close() {
    if (this.beaconListener) this.beaconListener.remove();
    if (this.appStateListener) this.appStateListener.remove();
  }

  private static async checkPermissionsAndroid() {
    return new Promise<void>(async (resolve, reject) => {
      /*const hasShownDisclosure = await fetchData('has-shown-disclosure');
      if (!hasShownDisclosure) return reject();*/

      const locationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const bluetoothScanGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      );
      if (
        bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED &&
        locationGranted === PermissionsAndroid.RESULTS.GRANTED
      )
        resolve();
    });
  }

  private static initializeIOS() {
    Beacons.requestWhenInUseAuthorization();
    Beacons.startRangingBeaconsInRegion({
      identifier: '',
      uuid: '790f084c-d069-4a20-8f16-04eea47f4ea2',
    }).catch(err => console.log(err)),
      console.log('hello');

    this.eventEmitter.addListener(
      'beaconsDidRange',
      (data: BeaconRangingResponse) => {
        console.log(data);
        data.beacons.map((beacon: Beacon) => {
          console.log(data);
          //this.handleBeaconTriggerDebounced(beacon);
        });
      },
    );
    console.log(this.eventEmitter.listenerCount('beaconsDidRange'));
  }

  private static initializeAndroid() {
    Beacons.detectIBeacons();
    //Beacons.detectEstimotes();
    Beacons.startRangingBeaconsInRegion({
      identifier: '',
    });

    Beacons.checkTransmissionSupported().then(res =>
      console.log('transmission supported', res),
    );
    DeviceEventEmitter.addListener('beaconsDidRange', data => {
      console.log(data);
      data.beacons.map((beacon: Beacon) => {});
    });
  }

  /**
   * Runs when device is moved within threshold distance of a beacon. Execution is then debounced for
   * 4 seconds from last attempt to run, so that action is not triggered more than once.
   *
   * @param {Beacon} beacon -
   */
  private static handleBeaconTrigger(beacon: Beacon) {
    let buffer = new ArrayBuffer(4);
    let view = new DataView(buffer);

    view.setInt16(0, beacon.minor, false);
    view.setInt16(2, beacon.major, false);
    let id = view.getInt32(0, false);

    switch (beacon.uuid.toLowerCase()) {
      default:
        return;
    }
  }

  private static runNexBoardAction(id: number) {}

  private static runNexIOAction(id: number) {}

  private static runNexPOSAction(id: number) {}

  /**
   * Handles the switching on/off the beacon functionality when app is put in background or
   * returned to foreground.
   *
   * @param {AppStateStatus} nextAppState - upcoming change to App State.
   */
  private static handleAppStateChange(nextAppState: AppStateStatus) {
    if (nextAppState.match(/inactive|background/)) {
      BeaconService.close();
    } else if (nextAppState.match(/active/)) {
      BeaconService.init();
    }
  }
}

export default BeaconService;
