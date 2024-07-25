// KillAppModule.kt
package com.digiwell

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class KillAppModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "KillApp"
    }

    @ReactMethod
    fun kill() {
        android.os.Process.killProcess(android.os.Process.myPid())
    }
}
