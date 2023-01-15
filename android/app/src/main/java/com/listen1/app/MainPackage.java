package com.listen1.app;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.listen1.app.utils.FileConfig;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

/**
 * @Description: java类作用描述
 * @Author: Void
 * @CreateDate: 2023/1/11 15:31
 * @UpdateDate: 2023/1/11 15:31
 */
public class MainPackage implements ReactPackage {
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext context) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new FileConfig(context));
        return modules;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactApplicationContext) {
        return Collections.emptyList();
    }
}
