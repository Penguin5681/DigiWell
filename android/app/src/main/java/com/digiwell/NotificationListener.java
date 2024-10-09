package com.digiwell;

import android.app.Notification;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Base64;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;


public class NotificationListener extends NotificationListenerService {

    private static final String TAG = "NotificationListener";
    private static final String PREFS_NAME = "NotificationData";

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        Notification notification = sbn.getNotification();
        if (notification != null) {
            String packageName = sbn.getPackageName();
             Log.d("onNotificationPostedTAG", packageName);
             String appName = getAppName(packageName);
             String appIconBase64 = getAppIconBase64(notification);

             int notificationCount = getNotificationCount(packageName);
             notificationCount++;
             Log.d("NotificationCountTAG", Integer.toString(notificationCount));

            storeNotificationData(packageName, appName, appIconBase64, notificationCount);
        }
    }

    private String getAppIconBase64(Notification notification) {
        if (notification.getLargeIcon() == null) {
            Log.e(TAG, "Large icon is null");
            return null;
        }

        Drawable drawable = notification.getLargeIcon().loadDrawable(this);
        Bitmap bitmap = null;

        if (drawable instanceof BitmapDrawable) {
            bitmap = ((BitmapDrawable) drawable).getBitmap();
        } else {
            Log.e(TAG, "Large icon is not a BitmapDrawable");
            return null;
        }

        if (bitmap != null) {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
            String encodedIcon = Base64.encodeToString(byteArrayOutputStream.toByteArray(), Base64.DEFAULT);
            return encodedIcon;
        }
        return null;
    }

    private int getNotificationCount(String packageName) {
        SharedPreferences sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        return sharedPreferences.getInt(packageName + "_count", 0);
    }

    private void storeNotificationData(String packageName, String appName, String appIconBase64, int notificationCount) {
        SharedPreferences sharedPreferences = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();

        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("appName", appName);
            jsonObject.put("appIcon", appIconBase64);
            jsonObject.put("notificationCount", notificationCount);

            editor.putString(packageName, jsonObject.toString());
            editor.putString(packageName + "_appName", appName);
            editor.putString(packageName + "_appIcon", appIconBase64);
            editor.apply();
        } catch (JSONException e) {
            Log.e(TAG, "Error saving notification data", e);
        }
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        String packageName = sbn.getPackageName();
        Log.d("NotificationRemovalTAG", getAppName(packageName));
    }

    private String getAppName(String packageName) {
        try {
            return getPackageManager().getApplicationLabel(getPackageManager().getApplicationInfo(packageName, 0)).toString();
        } catch (PackageManager.NameNotFoundException e) {
            return packageName;
        }
    }
}
