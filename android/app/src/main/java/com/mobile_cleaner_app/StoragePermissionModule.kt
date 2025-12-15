package com.mobile_cleaner_app

import android.app.Activity
import android.app.AlertDialog // <--- Required for the Dialog
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class StoragePermissionModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "StoragePermissionModule"
    }

    @ReactMethod
    fun hasManageExternalStoragePermission(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            val hasPermission = Environment.isExternalStorageManager()
            promise.resolve(hasPermission)
        } else {
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun requestManageExternalStoragePermission(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            try {
                if (!Environment.isExternalStorageManager()) {
                    val activity: Activity? = reactApplicationContext.currentActivity

                    if (activity == null) {
                        promise.reject("ACTIVITY_ERROR", "Current activity is null")
                        return
                    }

                    // UI operations must run on the Main Thread
                    activity.runOnUiThread {
                        AlertDialog.Builder(activity)
                            .setTitle("Permission Required")
                            .setMessage("To function correctly, this app needs access to manage all files. Please allow this in settings.")
                            .setPositiveButton("Open Settings") { _, _ ->
                                // User clicked "Open Settings"
                                try {
                                    val intent = Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION)
                                    intent.addCategory("android.intent.category.DEFAULT")
                                    intent.data = Uri.parse("package:${reactApplicationContext.packageName}")
                                    activity.startActivity(intent)
                                    // Resolve true to indicate the user agreed to open settings
                                    promise.resolve(true)
                                } catch (e: Exception) {
                                    promise.reject("ERROR", "Failed to open settings: ${e.message}")
                                }
                            }
                            .setNegativeButton("Cancel") { dialog, _ ->
                                // User clicked "Cancel"
                                dialog.dismiss()
                                // Resolve false to indicate the user cancelled
                                promise.resolve(false)
                            }
                            .setCancelable(false) // Prevent clicking outside to close
                            .show()
                    }
                } else {
                    promise.resolve(true) // Already granted
                }
            } catch (e: Exception) {
                promise.reject("ERROR", e.message)
            }
        } else {
            promise.resolve(false)
        }
    }
}