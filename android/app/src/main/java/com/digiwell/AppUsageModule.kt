package com.digiwell

import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.os.Build
import android.util.Base64
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import java.io.ByteArrayOutputStream
import java.util.*

@ReactModule(name = AppUsageModule.NAME)
class AppUsageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "AppUsageModule"
    }

    override fun getName(): String {
        return NAME
    }

    @RequiresApi(Build.VERSION_CODES.LOLLIPOP)
    @ReactMethod
    fun getUsageStats(period: String, promise: Promise) {
        val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val endTime = System.currentTimeMillis()
        val startTime = when (period) {
            "daily" -> endTime - 1000 * 60 * 60 * 24
            "weekly" -> endTime - 1000 * 60 * 60 * 24 * 7
            "monthly" -> endTime - 1000 * 60 * 60 * 24 * 30
            else -> endTime - 1000 * 60 * 60 * 24
        }

        val stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime)
        val appDataList = mutableListOf<WritableMap>()

        for (usageStat in stats) {
            val pm = reactApplicationContext.packageManager
            try {
                val appInfo = pm.getApplicationInfo(usageStat.packageName, 0)
                if (usageStat.totalTimeInForeground == 0L) {
                    continue
                }

                // if ((appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0) {
                //    continue
                // }

                val appData = WritableNativeMap()
                appData.putString("packageName", usageStat.packageName)
                appData.putString("appName", pm.getApplicationLabel(appInfo).toString())
                appData.putString("totalTimeInForeground", formatTime(usageStat.totalTimeInForeground))

                val icon = pm.getApplicationIcon(usageStat.packageName)
                appData.putString("icon", iconToBase64(icon))

                appDataList.add(appData)

//                Log.d("AppUsageModule", "App: ${pm.getApplicationLabel(appInfo)}, Package: ${usageStat.packageName}, Time: ${usageStat.totalTimeInForeground}")
            } catch (e: PackageManager.NameNotFoundException) {}
        }

        appDataList.sortByDescending { it.getString("totalTimeInForeground") }

        val result = WritableNativeArray()
        for (appData in appDataList) {
            result.pushMap(appData)
        }

        promise.resolve(result)
    }

    private fun formatTime(timeInMillis: Long): String {
        val totalMinutes = timeInMillis / 1000 / 60
        val hours = totalMinutes / 60
        val minutes = totalMinutes % 60

        return if (hours > 0) {
            "${hours}h ${minutes}m"
        } else {
            "${minutes}m"
        }
    }


    private fun iconToBase64(icon: Drawable): String {
        val bitmap = drawableToBitmap(icon)
        val byteArrayOutputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
        val byteArray = byteArrayOutputStream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.DEFAULT)
    }

    private fun drawableToBitmap(drawable: Drawable): Bitmap {
        if (drawable is BitmapDrawable) {
            return drawable.bitmap
        }

        val bitmap = Bitmap.createBitmap(drawable.intrinsicWidth, drawable.intrinsicHeight, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(bitmap)
        drawable.setBounds(0, 0, canvas.width, canvas.height)
        drawable.draw(canvas)
        return bitmap
    }
}
