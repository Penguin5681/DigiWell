/* package com.digiwell
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
  override fun getMainComponentName(): String = "DigiWell"
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
          SplashScreen.show(this)
          super.onCreate(savedInstanceState)
      }
} */



package com.digiwell

import android.os.Bundle
import android.provider.Settings
import android.content.Intent
import android.util.Log
import org.devio.rn.splashscreen.SplashScreen
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "DigiWell"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this)
        super.onCreate(savedInstanceState)

        if (!isNotificationListenerEnabled()) {
            requestNotificationListenerPermission()
        }
    }

    private fun isNotificationListenerEnabled(): Boolean {
        val pkgName = packageName
        val flat = Settings.Secure.getString(contentResolver, "enabled_notification_listeners") ?: return false
        return flat.contains(pkgName)
    }

    private fun requestNotificationListenerPermission() {
        val intent = Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)
        startActivityForResult(intent, NOTIFICATION_LISTENER_SETTINGS_REQUEST)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == NOTIFICATION_LISTENER_SETTINGS_REQUEST) {
            if (isNotificationListenerEnabled()) {
                Log.d("MainActivity", "Notification listener permission granted")
            } else {
                Log.d("MainActivity", "Notification listener permission not granted")
            }
        }
    }

    companion object {
        private const val NOTIFICATION_LISTENER_SETTINGS_REQUEST = 1
    }
}

