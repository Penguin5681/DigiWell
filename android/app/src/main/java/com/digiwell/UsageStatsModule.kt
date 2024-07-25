package com.digiwell

import android.app.AppOpsManager
import android.content.Context
import android.os.Build
import android.os.Process
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class UsageStatsModule(private val context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {
    init {
        reactContext = context
    }

    override fun getName(): String {
        return "UsageStatsModule"
    }

    @ReactMethod
    fun isUsageAccessPermissionGranted(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            val appOps = reactContext.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
            val mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, Process.myUid(), reactContext.packageName)
            promise.resolve(mode == AppOpsManager.MODE_ALLOWED)
        } else {
            promise.resolve(false)
        }
    }

    companion object {
        private lateinit var reactContext: ReactApplicationContext
    }
}
