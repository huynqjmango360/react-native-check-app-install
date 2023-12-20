package com.checkappinstall

import android.content.pm.PackageManager
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class CheckAppInstallModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

    val context = reactContext.applicationContext
  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun isPackageInstalled(packageName: String, callback: Callback) {
    val pm: PackageManager = this.context.packageManager
    try {
      pm.getPackageInfo(packageName, PackageManager.GET_ACTIVITIES)
      callback.invoke(true)
    } catch (e: Exception) {
      callback.invoke(false)
    }
  }

  companion object {
    const val NAME = "CheckAppInstall"
  }
}
