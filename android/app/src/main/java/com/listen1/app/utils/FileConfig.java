package com.listen1.app.utils;

import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.listen1.app.OpenFileActivity;
import com.listen1.app.ResultCallback;

import javax.annotation.Nonnull;
/**
 * @Description: 歌曲配置的文件备份和恢复
 * @Author: Void
 * @CreateDate: 2023/1/11 15:22
 * @UpdateDate: 2023/1/11 15:22
 */
public class FileConfig extends ReactContextBaseJavaModule implements ResultCallback {
    public static final int readFileCode = 101;
    public static final int writeFileCode = 102;
    public static String content;
    private Callback resultCallback;
    private Callback errorCallback;

    public FileConfig(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName() {
        return "FileImportConfig";
    }

    @Override
    public void onResult(int requestCode, Bundle bundle) {
        if (requestCode == readFileCode) {
            String content = bundle.getString("jsonContent");
            if (content == null || content.isEmpty()) {
                errorCallback.invoke("read fail");
            } else {
                Log.d(getName(), content);
                resultCallback.invoke(content);
            }
        } else if (requestCode == writeFileCode) {
            resultCallback.invoke(bundle.getBoolean("writeState"));
        }
    }

    @ReactMethod
    public void readFile(Callback resultCallback, Callback errorCallback) {
        this.resultCallback = resultCallback;
        this.errorCallback = errorCallback;
        OpenFileActivity.newInstance(getCurrentActivity(), readFileCode, this);
    }

    @ReactMethod
    public void writeFile(String content, Callback resultCallback) {
        this.resultCallback = resultCallback;
        FileConfig.content = content;
        OpenFileActivity.newInstance(getCurrentActivity(), writeFileCode, this);
    }
}
