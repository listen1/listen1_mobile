package com.listen1.app;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public abstract class PermissionActivity extends AppCompatActivity {
    private String requestHint = "该操作需要权限才能继续";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String hint = getDialogHint();
        if (hint != null && !hint.isEmpty()) {
            requestHint = hint;
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode != 1001) return;
        if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            permissionResult(true, null);
        }
    }

    protected abstract String[] getPermissionArray();

    protected abstract String getDialogHint();

    /**
     * 返回权限处理结果
     *
     * @param state true：权限获取成功
     * @param msg   额外的消息字符串
     */
    protected abstract void permissionResult(boolean state, @Nullable String msg);

    protected void checkPermission() {
        if (getPermissionArray() == null || getPermissionArray().length == 0) {
            throw new RuntimeException("权限不能为空！");
        }
        for (String permission : getPermissionArray()) {
            if (ContextCompat.checkSelfPermission(getApplicationContext(), permission) != PackageManager.PERMISSION_DENIED)
                continue;
            if (ActivityCompat.shouldShowRequestPermissionRationale(this, permission)) {
                //用户之前拒绝了权限，且设置了不再提示
                createDialog("已设置拒绝授予权限且不在显示，请前往设置手动设置权限", "确定", (dialog, which) -> {
                    //当用户还是想用APP，跳转到APP设置界面，由用户手动授予权限
                    Intent mIntent = new Intent(
                            Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                            Uri.fromParts("package", getPackageName(), null)
                    );
                    startActivity(mIntent);
                });
                permissionResult(false, null);
            } else {
                createDialog(requestHint, "设置权限", (dialog, which) -> ActivityCompat.requestPermissions(this, getPermissionArray(), 1001));
            }
            return;
        }
        permissionResult(true, null);
    }

    /**
     * 创建请求权限弹窗，当用户允许时触发权限请求流程
     *
     * @param msg         弹窗内容
     * @param positiveBtn acceptBtn
     */
    private void createDialog(String msg, String positiveBtn, DialogInterface.OnClickListener listener) {
        AlertDialog permissionDialog = new AlertDialog.Builder(this)
                .setTitle("请求权限")
                .setMessage(msg)
                .setCancelable(false)
                .setPositiveButton(positiveBtn, listener)
                .setNegativeButton("取消", (dialog, which) -> finish())
                .create();
        if (permissionDialog.isShowing()) {
            permissionDialog.dismiss();
        }
        permissionDialog.show();
    }
}
