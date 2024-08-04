package com.digiwell

import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.drawable.Drawable
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
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
        val result = WritableNativeArray()

        for (usageStat in stats) {
            val appInfo = WritableNativeMap()
            appInfo.putString("packageName", usageStat.packageName)
            appInfo.putDouble("totalTimeInForeground", usageStat.totalTimeInForeground.toDouble())

            val pm = reactApplicationContext.packageManager
            try {
                val icon = pm.getApplicationIcon(usageStat.packageName)
                appInfo.putString("icon", iconToBase64(icon))
            } catch (e: PackageManager.NameNotFoundException) {
                appInfo.putString("icon", "")
            }

            result.pushMap(appInfo)
        }

        promise.resolve(result)
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
