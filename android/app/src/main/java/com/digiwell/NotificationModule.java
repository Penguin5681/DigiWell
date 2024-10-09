package com.digiwell;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;

import org.json.JSONObject;

import java.util.Map;

public class NotificationModule extends ReactContextBaseJavaModule {

    public NotificationModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }

    @ReactMethod
    public void getNotificationData(Promise promise) {
        SharedPreferences sharedPreferences = getReactApplicationContext().getSharedPreferences("NotificationData", Context.MODE_PRIVATE);
        Map<String, ?> allEntries = sharedPreferences.getAll();

        JSONObject notificationData = new JSONObject();

        try {
            for (Map.Entry<String, ?> entry : allEntries.entrySet()) {
                if (entry.getKey().endsWith("_count")) {
                    String packageName = entry.getKey().replace("_count", "");
                    int count = (Integer) entry.getValue();
                    String appName = sharedPreferences.getString(packageName + "_appName", "");
                    String encodedIcon = sharedPreferences.getString(packageName + "_appIcon", "");

                    byte[] decodedString = Base64.decode(encodedIcon, Base64.DEFAULT);
                    Bitmap decodedIcon = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);

                    JSONObject appData = new JSONObject();
                    appData.put("appName", appName);
                    appData.put("notificationCount", count);
                    appData.put("appIcon", decodedIcon);

                    Log.d("getNotificationData(): ", appName);
                    Log.d("getNotificationData(): ", Integer.toString(count));

                    notificationData.put(packageName, appData);
                }
            }
            promise.resolve(notificationData.toString());
        } catch (Exception e) {
            promise.reject("ERROR", e);
        }
    }
}
