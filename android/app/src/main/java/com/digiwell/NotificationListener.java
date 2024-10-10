package com.digiwell;

import android.app.Notification;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Base64;
import android.util.Log;
import java.io.ByteArrayOutputStream;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

public class NotificationListener extends NotificationListenerService {
    private static final String TAG = "NotificationListener";
    private static final String PREFS_NAME = "NotificationData";
    private Context mContext;

    public NotificationListener(Context context) {
        this.mContext = context;
    }

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        String packageName = sbn.getPackageName();
        if (isSystemApp(packageName)) {
            Log.d(TAG, "Skipping system app: " + packageName);
            return;
        }

        Notification notification = sbn.getNotification();
        if (notification != null) {
            Log.d("onNotificationPostedTAG", packageName);
            String appName = getAppName(packageName);
            String appIconBase64 = getAppIconBase64(packageName);

            int notificationCount = getNotificationCount(packageName);
            notificationCount++;
            Log.d("NotificationCountTAG", appName + ": " + notificationCount);

            storeNotificationData(packageName, appName, appIconBase64, notificationCount);
        }
    }

    private boolean isSystemApp(String packageName) {
        try {
            ApplicationInfo appInfo = mContext.getPackageManager().getApplicationInfo(packageName, 0);
            return (appInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0;
        } catch (PackageManager.NameNotFoundException e) {
            Log.e(TAG, "Error checking if app is a system app", e);
            return false;
        }
    }

    private String getAppIconBase64(String packageName) {
        try {
            Drawable icon = mContext.getPackageManager().getApplicationIcon(packageName);
            Bitmap bitmap = ((BitmapDrawable) icon).getBitmap();
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
            byte[] byteArray = byteArrayOutputStream.toByteArray();
            return Base64.encodeToString(byteArray, Base64.DEFAULT);
        } catch (PackageManager.NameNotFoundException e) {
            Log.e(TAG, "Error getting app icon for " + packageName, e);
            return "";
        }
    }

    private int getNotificationCount(String packageName) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return sharedPreferences.getInt(packageName + "_count", 0);
    }

    private void storeNotificationData(String packageName, String appName, String appIconBase64, int notificationCount) {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();

        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("appName", appName);
            jsonObject.put("appIcon", appIconBase64);
            jsonObject.put("notificationCount", notificationCount);

            editor.putString(packageName, jsonObject.toString());
            editor.putInt(packageName + "_count", notificationCount);
            editor.apply();
        } catch (JSONException e) {
            Log.e(TAG, "Error saving notification data", e);
        }
    }

    public int getTotalNotificationCount() {
        SharedPreferences sharedPreferences = mContext.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        Map<String, ?> allEntries = sharedPreferences.getAll();
        int totalNotificationCount = 0;

        for (Map.Entry<String, ?> entry : allEntries.entrySet()) {
            if (entry.getKey().endsWith("_count")) {
                totalNotificationCount += sharedPreferences.getInt(entry.getKey(), 0);
            }
        }

        return totalNotificationCount;
    }

    private String getAppName(String packageName) {
        try {
            return mContext.getPackageManager().getApplicationLabel(mContext.getPackageManager().getApplicationInfo(packageName, 0)).toString();
        } catch (PackageManager.NameNotFoundException e) {
            return packageName;
        }
    }
}
