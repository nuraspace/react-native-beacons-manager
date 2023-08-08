package com.beaconstest;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    //Bugsnag.start(this);
    SoLoader.init(this, /* native exopackage */ false);
    //initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    //ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

    // ELATEC CODE
    /*try {
      appProperties = setUpProperties();
      PhoneData.BLUETOOTH_MAC_ADDRESS = BluetoothAdapter.getDefaultAdapter().getAddress();
      PhoneData.ANDROID_ID_AS_HEX_STRING = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);
    } catch (Exception e) {
      Log.v("elatec", e.getLocalizedMessage());
    }*/
    // END ELATEC CODE
  }

  // ELATEC CODE
  /*private static final String TAG = "elnex";

  private final BehaviorSubject<ConnectionStatus> connectionStatus = BehaviorSubject.createDefault(ConnectionStatus.BleDisconnected);

  public int currentRssiFromSlider = -65;

  public static boolean isBluetoothEnabled() {
    BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    if (bluetoothAdapter != null) {
      return bluetoothAdapter.isEnabled();
    } else
      //if the BT adapter is null, unlikely that BT is working.
      return false;
  }
  private Properties appProperties;

  private Properties setUpProperties() {
    Properties properties = new Properties();
    AssetManager assetManager = getApplicationContext().getAssets();
    InputStream inputStream = null;
    try {
      inputStream = assetManager.open("app.properties");
      Log.d(TAG, "file app.properties open");
    } catch (IOException e) {
      e.printStackTrace();
    }
    try {
      properties.load(inputStream);
      Log.d(TAG, "appProperties loaded");
    } catch (IOException e) {
      e.printStackTrace();
    }
    return properties;
  }

  public String getAppProperty(String key) {
    if (appProperties.containsKey(key)) {
      return appProperties.getProperty(key);
    }
    else throw new IllegalArgumentException(MessageFormat.format("Missing value for key {0}!", key));
  }

  public BehaviorSubject<ConnectionStatus> getConnectionStatus() {
    return connectionStatus;
  }

  public ElatecDevice getBleDevice() {
    return mBleDevice;
  }

  public void setBleDevice(ElatecDevice device) {
    mBleDevice = device;
  }

  private ElatecDevice mBleDevice;*/
  // END ELATEC CODE
}
