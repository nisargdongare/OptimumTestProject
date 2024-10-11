package com.optimumtestproject

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.view.WindowManager
import android.app.Activity

class ScreenshotModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ScreenshotModule"
    }

    @ReactMethod
    fun toggleScreenshot(enable: Boolean, promise: Promise) {
        try {
            val activity = currentActivity
            if (activity != null) {
                if (enable) {
                    activity.window.setFlags(
                        WindowManager.LayoutParams.FLAG_SECURE,
                        WindowManager.LayoutParams.FLAG_SECURE
                    )
                } else {
                    activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                }
                val status = if (enable) "Enabled" else "Disabled"
                promise.resolve("Screenshot toggled to: $status")
            } else {
                promise.reject("No Activity", "Current activity is null")
            }
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}
