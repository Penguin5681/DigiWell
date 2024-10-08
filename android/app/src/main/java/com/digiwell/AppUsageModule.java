package com.digiwell;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ReactModule(name = AppUsageModule.NAME)
public class AppUsageModule extends ReactContextBaseJavaModule {

    public static final String NAME = "AppUsageModule";

    public AppUsageModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @ReactMethod
    public void getUsageStats(String period, Promise promise) {
        try {
            UsageStatsManager usageStatsManager = (UsageStatsManager) getReactApplicationContext().getSystemService(Context.USAGE_STATS_SERVICE);
            if (usageStatsManager == null) {
                throw new Exception("UsageStatsManager not available");
            }

            long endTime = System.currentTimeMillis();
            long startTime;

            switch (period) {
                case "daily":
                    startTime = endTime - 1000 * 60 * 60 * 24;
                    break;
                case "weekly":
                    startTime = endTime - 1000 * 60 * 60 * 24 * 7;
                    break;
                case "monthly":
                    startTime = endTime - 1000 * 60 * 60 * 24 * 30;
                    break;
                default:
                    startTime = endTime - 1000 * 60 * 60 * 24;
                    break;
            }

            // Log the start and end time for debugging
            Log.d("AppUsageModule", "Querying usage stats from " + startTime + " to " + endTime + " for period: " + period);

            // Use the correct interval constant for monthly data
            int intervalType = UsageStatsManager.INTERVAL_DAILY;
            if (period.equals("weekly")) {
                intervalType = UsageStatsManager.INTERVAL_WEEKLY;
            } else if (period.equals("monthly")) {
                intervalType = UsageStatsManager.INTERVAL_MONTHLY;
            }

            List<UsageStats> stats = usageStatsManager.queryUsageStats(intervalType, startTime, endTime);
            if (stats == null || stats.isEmpty()) {
                Log.d("AppUsageModule", "No usage stats found for period: " + period);
                promise.resolve(Arguments.createArray());
                return;
            }

            Map<String, WritableMap> appDataMap = new HashMap<>();
            PackageManager pm = getReactApplicationContext().getPackageManager();

            for (UsageStats usageStat : stats) {
                try {
                    ApplicationInfo appInfo = pm.getApplicationInfo(usageStat.getPackageName(), 0);
                    if ((appInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0) {
                        continue;
                    }

                    if (usageStat.getTotalTimeInForeground() == 0L) {
                        continue;
                    }

                    String packageName = usageStat.getPackageName();
                    WritableMap appData;

                    if (appDataMap.containsKey(packageName)) {
                        appData = appDataMap.get(packageName);
                        long existingTime = Long.parseLong(appData.getString("totalTimeInForeground"));
                        appData.putString("totalTimeInForeground", String.valueOf(existingTime + usageStat.getTotalTimeInForeground()));
                    } else {
                        appData = Arguments.createMap();
                        appData.putString("packageName", packageName);
                        appData.putString("appName", pm.getApplicationLabel(appInfo).toString());
                        appData.putString("totalTimeInForeground", String.valueOf(usageStat.getTotalTimeInForeground()));

                        Drawable icon = pm.getApplicationIcon(packageName);
                        appData.putString("icon", iconToBase64(icon));

                        appDataMap.put(packageName, appData);
                    }
                } catch (PackageManager.NameNotFoundException e) {
                    Log.e("AppUsageModule", "App not found: " + usageStat.getPackageName(), e);
                }
            }

            List<WritableMap> appDataList = new ArrayList<>(appDataMap.values());

            Collections.sort(appDataList, new Comparator<WritableMap>() {
                @Override
                public int compare(WritableMap o1, WritableMap o2) {
                    long time1 = Long.parseLong(o1.getString("totalTimeInForeground"));
                    long time2 = Long.parseLong(o2.getString("totalTimeInForeground"));
                    return Long.compare(time2, time1); 
                }
            });

            WritableArray result = Arguments.createArray();
            for (WritableMap appData : appDataList) {
                appData.putString("totalTimeInForeground", formatTime(Long.parseLong(appData.getString("totalTimeInForeground")))); 
                result.pushMap(appData);
            }

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("UNKNOWN_ERROR", e);
        }
    }

    private String formatTime(long timeInMillis) {
        long totalMinutes = timeInMillis / 1000 / 60;
        long hours = totalMinutes / 60;
        long minutes = totalMinutes % 60;

        if (hours > 0) {
            return hours + "h " + minutes + "m";
        } else {
            return minutes + "m";
        }
    }

    private String iconToBase64(Drawable icon) {
        Bitmap bitmap = drawableToBitmap(icon);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

    private Bitmap drawableToBitmap(Drawable drawable) {
        if (drawable instanceof BitmapDrawable) {
            return ((BitmapDrawable) drawable).getBitmap();
        }

        Bitmap bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);
        return bitmap;
    }
}
