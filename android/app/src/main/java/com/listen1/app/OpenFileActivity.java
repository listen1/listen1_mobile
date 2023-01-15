package com.listen1.app;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.ParcelFileDescriptor;
import android.util.Log;
import androidx.annotation.Nullable;
import com.listen1.app.utils.FileConfig;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class OpenFileActivity extends PermissionActivity {
    private final String[] readStoragePermissions = new String[]{
            Manifest.permission.READ_EXTERNAL_STORAGE
    };
    private int openFileRequestCode = -1;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        openFileRequestCode = getIntent().getIntExtra("OPEN_FILE_REQUEST_CODE", -1);
        checkPermission();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != 1001) return;
        if (data == null) {
            backResult("", false);
            return;
        }
        byte[] bytes = new byte[50];
        StringBuilder builder = new StringBuilder();
        Uri uri = data.getData();
        new Thread() {
            @Override
            public void run() {
                super.run();
                FileInputStream fileInputStream = null;
                ParcelFileDescriptor descriptor = null;
                int endLength;
                try {
                    descriptor = getContentResolver().openFileDescriptor(uri, "r");
                    fileInputStream = new FileInputStream(descriptor.getFileDescriptor());
                    while ((endLength = fileInputStream.read(bytes)) > 0) {
                        builder.append(new String(bytes, 0, endLength));
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                    backResult("", false);
                } finally {
                    try {
                        if (descriptor != null) descriptor.close();
                        if (fileInputStream != null) fileInputStream.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    backResult(builder.toString(), false);
                }
            }
        }.start();
    }

    @Override
    protected String[] getPermissionArray() {
        return readStoragePermissions;
    }

    @Override
    protected String getDialogHint() {
        return "需要读写权限以继续流程";
    }

    /**
     * 权限请求结果回调
     */
    @Override
    protected void permissionResult(boolean state, @Nullable String msg) {
        Log.d("PermissionActivity", "state:" + state);
        if (!state) return;
        if (openFileRequestCode == FileConfig.readFileCode) {
            //打开文件管理器
            Intent mIntent = new Intent(Intent.ACTION_GET_CONTENT);
            mIntent.addCategory(Intent.CATEGORY_OPENABLE);
            mIntent.setType("application/json");
            startActivityForResult(mIntent, 1001);
        } else if (openFileRequestCode == FileConfig.writeFileCode) {
            writeContentToFile();
        }
    }

    private void backResult(String content, boolean writeState) {
        if (callback == null) return;
        Bundle mBundle = new Bundle();
        if (openFileRequestCode == FileConfig.readFileCode) {
            mBundle.putString("jsonContent", content);
        } else if (openFileRequestCode == FileConfig.writeFileCode) {
            mBundle.putBoolean("writeState", writeState);
        }
        callback.onResult(openFileRequestCode, mBundle);
        callback = null;
        finish();
    }

    private void writeContentToFile() {
        File dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        boolean state;
        if (!dir.exists()) dir.mkdirs();
        File exportJson = new File(dir, "listen1_backup.json");
        try {
            if (exportJson.exists()) {
                //如果文件存在，清空文件内容
                FileWriter fileWrite = new FileWriter(exportJson);
                fileWrite.write("");
                fileWrite.flush();
                fileWrite.close();
            } else {
                exportJson.createNewFile();
            }
            PrintWriter writer = new PrintWriter(new FileOutputStream(exportJson));
            writer.print(FileConfig.content);
            writer.close();
            state = true;
        } catch (IOException e) {
            e.printStackTrace();
            state = false;
        }
        backResult("", state);
    }

    private static ResultCallback callback = null;

    public static void newInstance(Activity activity, int openFileRequestCode, @Nullable ResultCallback callback) {
        OpenFileActivity.callback = callback;
        Intent mIntent = new Intent(activity, OpenFileActivity.class);
        mIntent.putExtra("OPEN_FILE_REQUEST_CODE", openFileRequestCode);
        activity.startActivity(mIntent);
    }
}
