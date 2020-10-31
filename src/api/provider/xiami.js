/* xiami api */
import { AsyncStorage } from 'react-native';
import md5 from 'md5';
import queryString from 'query-string';

class MyStorage {
  static setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // console.log(error);
    }

    return null;
  };
  static getData = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      // console.log(error);
      return null;
    }
  };
  static deleteData = async (key) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      // console.log(error);

      return null;
    }
  };
}

function getCookieValue(cookie, key) {
  const regex = new RegExp(`${key}=([^;]+);`);
  const result = regex.exec(cookie);

  if (result !== null && result.length > 1) {
    return result[1];
  }

  return null;
}

async function getToken() {
  const xiamiKey = 'xm_token';

  await MyStorage.deleteData(xiamiKey);
  let tokenString = await MyStorage.getData(xiamiKey);

  if (tokenString !== null) {
    return JSON.parse(tokenString);
  }
  const url = 'https://www.xiami.com/api/list/collect';

  const response = await fetch(url);

  const setCookieField = response.headers.get('set-cookie');
  const key = getCookieValue(setCookieField, 'xm_sg_tk');
  const sig = getCookieValue(setCookieField, 'xm_sg_tk.sig');
  const token = { xm_sg_tk: key, 'xm_sg_tk.sig': sig };

  tokenString = JSON.stringify(token);
  await MyStorage.setData(xiamiKey, tokenString);

  return token;
}

function getUrl(api, params, tokenKey) {
  const paramsString = JSON.stringify(params);
  const origin = `${tokenKey.split('_')[0]}_xmMain_${api}_${paramsString}`;
  const sign = md5(origin);
  const baseUrl = 'https://www.xiami.com';

  return encodeURI(`${baseUrl + api}?_q=${paramsString}&_s=${sign}`);
}

function xmGetLowQualityImgUrl(url) {
  return `${url}?x-oss-process=image/resize,m_fill,limit_0,s_330/quality,q_80`;
}

function caesar(location) {
  const num = location[0];
  const avgLength = Math.floor(location.slice(1).length / num);
  const remainder = location.slice(1).length % num;

  const result = [];

  for (let i = 0; i < remainder; i += 1) {
    const line = location.slice(
      i * (avgLength + 1) + 1,
      (i + 1) * (avgLength + 1) + 1
    );

    result.push(line);
  }

  for (let i = 0; i < num - remainder; i += 1) {
    const line = location
      .slice((avgLength + 1) * remainder)
      .slice(i * avgLength + 1, (i + 1) * avgLength + 1);

    result.push(line);
  }

  const s = [];

  for (let i = 0; i < avgLength; i += 1) {
    for (let j = 0; j < num; j += 1) {
      s.push(result[j][i]);
    }
  }

  for (let i = 0; i < remainder; i += 1) {
    s.push(result[i].slice(-1));
  }

  return unescape(s.join('')).replace(/\^/g, '0');
}

function handleProtocolRelativeUrl(url) {
  const regex = /^.*?\/\//;
  const result = url.replace(regex, 'http://');

  return result;
}

async function requestAPI(api, params) {
  const token = await getToken();
  const url = getUrl(api, params, token.xm_sg_tk);

  const response = await fetch(url, {
    headers: {
      cookie: `xm_sg_tk=${token.xm_sg_tk}; xm_sg_tk.sig=${token['xm_sg_tk.sig']}`,
    },
  });

  return response.json();
}

function xmConvertSong(songInfo, artistFieldName) {
  const track = {
    id: `xmtrack_${songInfo.song_id}`,
    title: songInfo.song_name,
    artist: songInfo[artistFieldName],
    artist_id: `xmartist_${songInfo.artist_id}`,
    album: songInfo.album_name,
    album_id: `xmalbum_${songInfo.album_id}`,
    source: 'xiami',
    source_url: `http://www.xiami.com/song/${songInfo.song_id}`,
    img_url: songInfo.album_logo,
    url: `xmtrack_${songInfo.song_id}`,
    lyric_url: songInfo.lyric,
  };

  return track;
}

function xmConvertSong2(songInfo) {
  // eslint-disable-line no-unused-vars
  const track = {
    id: `xmtrack_${songInfo.songId}`,
    title: songInfo.songName,
    artist: songInfo.artistName,
    artist_id: `xmartist_${songInfo.artistId}`,
    album: songInfo.albumName,
    album_id: `xmalbum_${songInfo.albumId}`,
    source: 'xiami',
    source_url: `http://www.xiami.com/song/${songInfo.songId}`,
    img_url: songInfo.albumLogo,
    url: `xmtrack_${songInfo.songId}`,
    // 'lyric_url': song_info.lyricInfo.lyricFile
  };

  if (songInfo.lyricInfo) {
    track.lyric_url = songInfo.lyricInfo.lyricFile;
  }

  return track;
}

function showPlaylist(offset) {
  const page = offset / 30 + 1;
  const pageSize = 60;
  const api = '/api/list/collect';
  const params = {
    pagingVO: {
      page,
      pageSize,
    },
    dataType: 'system',
  };

  return requestAPI(api, params).then((data) => {
    const playlists = data.result.data.collects.map((d) => {
      const playlist = {
        cover_img_url: '',
        title: '',
        id: '',
        source_url: '',
      };

      playlist.cover_img_url = xmGetLowQualityImgUrl(d.collectLogo);
      playlist.title = d.collectName;
      playlist.id = `xmplaylist_${d.listId}`;
      playlist.source_url = `http://www.xiami.com/collect/${d.listId}`;

      return playlist;
    });

    return { result: playlists };
  });
}

function getPlaylist(playlistId) {
  const listId = playlistId.split('_').pop();
  const api = '/api/collect/getCollectStaticUrl';
  const params = {
    listId: parseInt(listId, 10),
  };

  return requestAPI(api, params).then((response) => {
    const collect_url = response.result.data.data.data.url;

    return fetch(collect_url)
      .then((response) => response.json())
      .then((collect_response) => {
        let data = collect_response;
        const info = {
          cover_img_url: xmGetLowQualityImgUrl(data.resultObj.collectLogo),
          title: data.resultObj.collectName,
          id: `xmplaylist_${listId}`,
          source_url: `http://www.xiami.com/collect/${listId}`,
        };
        const tracks = data.resultObj.songs.map((item) => xmConvertSong2(item));

        return {
          tracks,
          info,
        };
      });
  });
}
function search(keyword, curpage) {
  const data = {
    v: '2.0',
    key: keyword,
    page: curpage,
    limit: 20,
    r: 'search/songs',
    app_key: 1,
  };

  const url = `http://api.xiami.com/web?${queryString.stringify(data)}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      referer: 'http://h.xiami.com/',
    },
  })
    .then((response) => response.json())
    .then((response) => {
      const tracks = response.data.songs.map((item) =>
        xmConvertSong(item, 'artist_name')
      );

      return {
        result: tracks,
        total: response.data.total,
      };
    });
}

// eslint-disable-next-line no-unused-vars
function search2(keyword, curpage) {
  const api = '/api/search/searchSongs';
  const pageSize = 60;
  const params = {
    pagingVO: {
      page: curpage,
      pageSize,
    },
    key: keyword,
  };

  // console.log(api, params);

  return requestAPI(api, params).then((data) => {
    // console.log(data);
    const tracks = data.result.data.songs.map((item) =>
      xmConvertSong2(item, 'artistName')
    );

    return {
      tracks,
      total: data.result.data.pagingVO.pages,
    };
  });
}

function bootstrapTrack(trackId) {
  const url = `http://emumo.xiami.com/song/playlist/id/${trackId.slice(
    'xmtrack_'.length
  )}/object_name/default/object_id/0/cat/json`;

  return fetch(url, {
    headers: {
      Referer: 'https://www.xiami.com',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data.data.trackList == null) {
        return '';
      }
      const { location } = data.data.trackList[0];
      // eslint-disable-next-line
      const songUrl = handleProtocolRelativeUrl(caesar(location));

      // console.log(songUrl);

      return songUrl;
    });
}

function parseUrl(url) {
  let result = null;
  const match = /\/\/www.xiami.com\/collect\/([0-9]+)/.exec(url);

  if (match != null) {
    const playlistId = match[1];

    result = {
      type: 'playlist',
      id: `xmplaylist_${playlistId}`,
    };
  }

  return result;
}

const meta = { name: '虾米', platformId: 'xm', enName: 'xiami' };

export default {
  meta,
  showPlaylist,
  getPlaylist,
  search,
  bootstrapTrack,
  parseUrl,
};
