import { View, Text } from 'react-native';
import React from 'react';

import { ListEditor } from '../../components';

const playlistArray = [
  {
    cover_img_url:
      'http://p2.music.126.net/rFsK0ZtwGjzpFyjdLKkICw==/109951164215718820.jpg?param=140y140',
    title: '纯音 ‖ 午间小憩 听那风铃轻摇欲睡',
    id: 'myplaylist_9a7ad113-7791-da6b-cc7b-4d29dc3847dd',
    source_url: 'http://music.163.com/#/playlist?id=2878202769',
  },
  {
    title: '新建歌单',
    id: 'myplaylist_ca3c4c9b-731c-4d4d-6eb8-399ab63e7344',
    cover_img_url: './assets/images/logo.png',
  },
  {
    cover_img_url:
      'http://p.qpic.cn/music_cover/PiajxSqBRaEISibhtdxpkLprufpT7OzywmaqswkO73oqwhKaGbtQOc1A/600?n=1',
    title: '我们来谈一场，不分手的恋爱',
    id: 'myplaylist_04c110a1-a227-2b9f-9fe7-de18c7cbcc22',
    source_url: 'http://y.qq.com/#type=taoge&id=7083697328',
  },
  {
    cover_img_url:
      'http://pic.xiami.net/images/collect/351/51/927839351_1563199389_GWEK.jpg?x-oss-process=image/resize,m_fill,limit_0,s_330/quality,q_80',
    title: '珍藏旧唱片——上华',
    id: 'myplaylist_be85639a-413c-30d0-51f5-1149b1289dfe',
    source_url: 'http://www.xiami.com/collect/927839351',
  },
];

class SortPlayground extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListEditor
          renderRow={d => (
            <Text style={{ flex: 1, marginLeft: 10 }}>{d.title}</Text>
          )}
          data={playlistArray}
          ref={component => {
            this._listEditor = component;
          }}
        />
      </View>
    );
  }
}

export default SortPlayground;
