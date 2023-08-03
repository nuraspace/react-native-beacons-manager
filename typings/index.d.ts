declare module '@rodrigo7/react-native-beacons-manager' {

  class Beacons {
    ///////////////////////////////////////////////////////
    // iOS only
    ///////////////////////////////////////////////////////

    requestAlwaysAuthorization(): void;

    requestWhenInUseAuthorization(): void;

    allowsBackgroundLocationUpdates(
      allow: boolean
    ): void;

    getAuthorizationStatus(
      callback: (status: AuthorizationStatus) => any
    ): any;

    startUpdatingLocation(): void;

    stopUpdatingLocation(): void;

    shouldDropEmptyRanges(
      drop: boolean
    ): void;

    ///////////////////////////////////////////////////////
    // android only
    ///////////////////////////////////////////////////////
    ARMA_RSSI_FILTER: string;
    RUNNING_AVG_RSSI_FILTER: string;
    PARSER_IBEACON: string;
    PARSER_ESTIMOTE: string;
    PARSER_ALTBEACON: string;
    PARSER_EDDYSTONE_TLM: string;
    PARSER_EDDYSTONE_UID: string;
    PARSER_EDDYSTONE_URL: string;

    setHardwareEqualityEnforced(
      flag: boolean
    ): void;

    detectIBeacons(): void;

    detectAltBeacons(): void;

    detectEstimotes(): void;

    detectEddystoneUID(): void;

    detectEddystoneURL(): void;

    detectEddystoneTLM(): void;

    detectCustomBeaconLayout(
      parser: number
    ): void;

    setBackgroundScanPeriod(
      period: number
    ): void;

    setBackgroundBetweenScanPeriod(
      period: number
    ): void;

    setForegroundScanPeriod(
      period: number
    ): void;

    setRssiFilter(
      filterType: number,
      avgModifier: number
    ): void;

    getRangedRegions(): Promise<any>;

    getMonitoredRegions(): Promise<Array<BeaconRegion>>;

    checkTransmissionSupported(): Promise<number>;

    ///////////////////////////////////////////////////////
    // common iOS and Android
    ///////////////////////////////////////////////////////

    startMonitoringForRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** IOS ONLY */
    startRangingBeaconsInRegion(
      region: BeaconRegion
    ): Promise<BeaconRangingResponse>;

    /** ANDROID ONLY */
    startRangingBeaconsInRegion(
      // We can't simply reuse BeaconRegion as BeaconRegion.uuid is mandatory, whereas the uuid in this method is optional
      region: {
        identifier: string,
        uuid?: string
      }
    ): Promise<BeaconRangingResponse>;

    /** ANDROID ONLY */
    startRangingBeaconsInRegion(
      regionId: string,
      beaconsUUID?: string
    ): Promise<BeaconRangingResponse>;

    stopMonitoringForRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** IOS ONLY */
    stopRangingBeaconsInRegion(
      region: BeaconRegion
    ): Promise<any>;

    /** ANDROID ONLY */
    stopRangingBeaconsInRegion(
      regionId: string,
      beaconsUUID?: string
    ): Promise<any>;

    /** ANDROID ONLY */
    stopRangingBeaconsInRegion(
      // We can't simply reuse BeaconRegion as BeaconRegion.uuid is mandatory, whereas the uuid in this method is optional
      region: {
        identifier: string,
        uuid?: string
      }
    ): Promise<any>;

    requestStateForRegion(
      region: BeaconRegion
    ): void;
  }

  const beacons: Beacons;
  export default beacons;

  export interface BeaconRegion {
    identifier: string,
    uuid: string,
    minor?: number,
    major?: number
  }

  export type AuthorizationStatus =
    | 'authorizedAlways'
    | 'authorizedWhenInUse'
    | 'denied'
    | 'notDetermined'
    | 'restricted';

  export type Beacon = {
    distance: number;
    major: number;
    minor: number;
    proximity: 'immediate' | 'near' | 'far';
    rssi: number;
    uuid: string;
  }

  export type BeaconRangingResponse = {
    beacons: Beacon[];
    identifier: string;
    uuid: string;
  }
}