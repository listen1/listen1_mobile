# Listen1 Mobile V0.7.4

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)

## 简介

一款支持多平台音乐播放和搜索的移动音乐 App。现有版本已支持网易云音乐，QQ 音乐，虾米音乐。还有丰富的歌单管理功能。使用 React Native 开发，基于 MIT 协议开源免费。

**支持 iOS 和 Android 平台**

[![imgur](https://i.imgur.com/zYyaK92.png)]()

## 特性

- 一个 App 播放多平台的音乐
- 搜索多平台音乐
- 浏览，播放多平台歌单
- 收藏音乐到自建歌单
- 夜间模式
- 备份，恢复(支持从`Listen1 chrome extension`导入数据)

## 安装

### iOS

iOS 只支持编译安装，请拥有开发者证书的开发者连接 iPhone 后，将项目文件中的证书换成自己的证书，然后执行命令安装。

### Andriod

下载 apk 安装, apk 下载地址请访问[项目 release 页面](https://github.com/listen1/listen1_mobile/releases)

## 编译

- Clone 或下载本项目代码
- `yarn` 安装依赖
- `yarn run link` 链接 React Native 的依赖库
- `yarn start:ios` 将在 iOS 模拟器上运行项目
- `yarn start:android` 将在安卓真机或模拟器（取决于手机是否连接）运行项目

Apk 打包

```
   cd .\android\
   ./gradlew assembleRelease
   react-native run-android --variant=release

```

## 代码基本结构

- api: 音乐平台相关资源 API
- asset: 图片等资源
- components: 可复用的组件
- views: 业务相关的 screen 组件
- modules: 组件使用的自定义函数库
- redux: redux 需要的 action 和 reducer 函数

## 鸣谢

- [git-point](https://github.com/gitpoint/git-point): github 的 RN 客户端，提供本项目开发环境搭建的结构支持。
- [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi): 网易 API，参考了网络协议部分代码。
- [yezihaohao/NeteaseCloudMusic](https://github.com/yezihaohao/NeteaseCloudMusic): 网易音乐 RN 端，参考了 RN 导航，播放部分的库代码实现。
- [soimort/you-get](https://github.com/soimort/you-get): 音乐下载命令行，参考了协议和法律相关声明（如下）。

开发过程还有很多开源软件提供了各种问题的解决方案，详见代码注释，篇幅原因不一一列出，感谢开源社区的各位开发者。

## 更新日志

`2019-08-09`

- 修复网易云音乐无法访问的 bug

`2019-07-31`

- 首次发布

## 法律相关

This software is distributed under the MIT license

In particular, please be aware that

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

Translated to human words:

_In case your use of the software forms the basis of copyright infringement, or you use the software for any other illegal purposes, the authors cannot take any responsibility for you._

We only ship the code here, and how you are going to use it is left to your own discretion.
