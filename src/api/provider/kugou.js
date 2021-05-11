import queryString from 'query-string';
import {getTokenUrl} from '../../utils/kugouUtils';
import AsyncStorage from '@react-native-community/async-storage';

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

async function requestAPI(url, data) {
  const token = await getToken();
  return await fetch(url, {
    method: 'get',
    headers: {
      referer: 'http://m.kugou.com',
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent':
        'Mozilla/5.0 (Linux; U; Android 8.1.0; zh-cn; BLA-AL00 Build/HUAWEIBLA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/8.9 Mobile Safari/537.36',
      cookie: `kg_dfid=${token.dfid};kg_dfid_collect=${token.collect};kg_mid=${token.mid}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      // console.error(error);
    });
}

async function getToken() {
  const kgKey = 'kg_token';
  let tokenString = await MyStorage.getData(kgKey);
  if (tokenString) {
    return JSON.parse(tokenString);
  }
  const t = await getTokenUrl();
  const dfid = await fetch(t.url, {
    method: 'post',
    body:
      'eyJhcHBDb2RlTmFtZSI6Ik1vemlsbGEiLCJhcHBOYW1lIjoiTmV0c2NhcGUiLCJhcHBWZXJzaW9uIjoiNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS83NS4wLjM3NzAuMTAwIFNhZmFyaS81MzcuMzYiLCJjb25uZWN0aW9uIjoib3RoZXIiLCJkb05vdFRyYWNrIjoiIiwiaGFyZHdhcmVDb25jdXJyZW5jeSI6OCwibGFuZ3VhZ2UiOiJlbiIsImxhbmd1YWdlcyI6ImVuLHpoLUNOLHpoIiwibWF4VG91Y2hQb2ludHMiOjAsIm1pbWVUeXBlcyI6ImFwcGxpY2F0aW9uL21zZXhjZWwsYXBwbGljYXRpb24vbXNwb3dlcnBvaW50LGFwcGxpY2F0aW9uL21zd29yZCxhcHBsaWNhdGlvbi9tc3dvcmQtdGVtcGxhdGUsYXBwbGljYXRpb24vcGRmLGFwcGxpY2F0aW9uL3ZuZC5jZXMtcXVpY2twb2ludCxhcHBsaWNhdGlvbi92bmQuY2VzLXF1aWNrc2hlZXQsYXBwbGljYXRpb24vdm5kLmNlcy1xdWlja3dvcmQsYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLGFwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbC5zaGVldC5tYWNyb0VuYWJsZWQuMTIsYXBwbGljYXRpb24vdm5kLm1zLWV4Y2VsLnNoZWV0Lm1hY3JvZW5hYmxlZC4xMixhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludCxhcHBsaWNhdGlvbi92bmQubXMtcG93ZXJwb2ludC5wcmVzZW50YXRpb24ubWFjcm9FbmFibGVkLjEyLGFwcGxpY2F0aW9uL3ZuZC5tcy1wb3dlcnBvaW50LnByZXNlbnRhdGlvbi5tYWNyb2VuYWJsZWQuMTIsYXBwbGljYXRpb24vdm5kLm1zLXdvcmQsYXBwbGljYXRpb24vdm5kLm1zLXdvcmQuZG9jdW1lbnQuMTIsYXBwbGljYXRpb24vdm5kLm1zLXdvcmQuZG9jdW1lbnQubWFjcm9FbmFibGVkLjEyLGFwcGxpY2F0aW9uL3ZuZC5tcy13b3JkLmRvY3VtZW50Lm1hY3JvZW5hYmxlZC4xMixhcHBsaWNhdGlvbi92bmQubXN3b3JkLGFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5wcmVzZW50YXRpb25tbC5wcmVzZW50YXRpb24sYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnRlbXBsYXRlLGFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0LGFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnRlbXBsYXRlLGFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLmRvY3VtZW50LGFwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC53b3JkcHJvY2Vzc2luZ21sLnRlbXBsYXRlLGFwcGxpY2F0aW9uL3ZuZC5wcmVzZW50YXRpb24tb3BlbnhtbCxhcHBsaWNhdGlvbi92bmQucHJlc2VudGF0aW9uLW9wZW54bWxtLGFwcGxpY2F0aW9uL3ZuZC5zcHJlYWRzaGVldC1vcGVueG1sLGFwcGxpY2F0aW9uL3ZuZC53b3JkcHJvY2Vzc2luZy1vcGVueG1sLGFwcGxpY2F0aW9uL3gtZ29vZ2xlLWNocm9tZS1wZGYsYXBwbGljYXRpb24veC1uYWNsLGFwcGxpY2F0aW9uL3gtcG5hY2wsdGV4dC9jc3YiLCJwbGF0Zm9ybSI6IldpbjMyIiwicGx1Z2lucyI6IkNocm9tZSBQREYgUGx1Z2luLENocm9tZSBQREYgVmlld2VyLEdvb2dsZeaWh+aho+OAgeihqOagvOWPiuW5u+eBr+eJh+eahE9mZmljZee8lui+keaJqeWxleeoi+W6jyxOYXRpdmUgQ2xpZW50IiwidXNlckFnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzc1LjAuMzc3MC4xMDAgU2FmYXJpLzUzNy4zNiIsImNvbG9yRGVwdGgiOjI0LCJwaXhlbERlcHRoIjoyNCwic2NyZWVuUmVzb2x1dGlvbiI6IjE5MjB4MTA4MCIsInRpbWV6b25lT2Zmc2V0IjotNDgwLCJzZXNzaW9uU3RvcmFnZSI6dHJ1ZSwibG9jYWxTdG9yYWdlIjp0cnVlLCJpbmRleGVkREIiOnRydWUsImNvb2tpZSI6dHJ1ZSwiYWRCbG9jayI6dHJ1ZSwiZGV2aWNlUGl4ZWxSYXRpbyI6MSwiaGFzTGllZE9zIjpmYWxzZSwiaGFzTGllZExhbmd1YWdlcyI6ZmFsc2UsImhhc0xpZWRSZXNvbHV0aW9uIjpmYWxzZSwiaGFzTGllZEJyb3dzZXIiOmZhbHNlLCJ3ZWJnbFJlbmRlcmVyIjoiQU5HTEUgKEFNRCBSYWRlb24oVE0pIFJYIFZlZ2EgMTEgR3JhcGhpY3MgRGlyZWN0M0QxMSB2c181XzAgcHNfNV8wKSIsIndlYmdsVmVuZG9yIjoiR29vZ2xlIEluYy4iLCJjYW52YXMiOiJhMjBiNDg4N2U5ZTI1Nzg4MDlhMDE0Y2VlN2YzNjgwZiIsImZvbnRzIjoiQXJpYWwsQXJpYWwgQmxhY2ssQXJpYWwgTmFycm93LEJvb2sgQW50aXF1YSxCb29rbWFuIE9sZCBTdHlsZSxDYWxpYnJpLENhbWJyaWEsQ2FtYnJpYSBNYXRoLENlbnR1cnksQ2VudHVyeSBHb3RoaWMsQ2VudHVyeSBTY2hvb2xib29rLENvbWljIFNhbnMgTVMsQ29uc29sYXMsQ291cmllcixDb3VyaWVyIE5ldyxHZW9yZ2lhLEhlbHZldGljYSxJbXBhY3QsTHVjaWRhIEJyaWdodCxMdWNpZGEgQ2FsbGlncmFwaHksTHVjaWRhIENvbnNvbGUsTHVjaWRhIEZheCxMdWNpZGEgSGFuZHdyaXRpbmcsTHVjaWRhIFNhbnMsTHVjaWRhIFNhbnMgVHlwZXdyaXRlcixMdWNpZGEgU2FucyBVbmljb2RlLE1pY3Jvc29mdCBTYW5zIFNlcmlmLE1vbm90eXBlIENvcnNpdmEsTVMgR290aGljLE1TIFBHb3RoaWMsTVMgUmVmZXJlbmNlIFNhbnMgU2VyaWYsTVMgU2FucyBTZXJpZixNUyBTZXJpZixQYWxhdGlubyBMaW5vdHlwZSxTZWdvZSBQcmludCxTZWdvZSBTY3JpcHQsU2Vnb2UgVUksU2Vnb2UgVUkgTGlnaHQsU2Vnb2UgVUkgU2VtaWJvbGQsU2Vnb2UgVUkgU3ltYm9sLFRhaG9tYSxUaW1lcyxUaW1lcyBOZXcgUm9tYW4sVHJlYnVjaGV0IE1TLFZlcmRhbmEsV2luZ2RpbmdzLFdpbmdkaW5ncyAyLFdpbmdkaW5ncyAzLEFnZW5jeSBGQixBbGdlcmlhbixCYXNrZXJ2aWxsZSBPbGQgRmFjZSxCYXVoYXVzIDkzLEJlbGwgTVQsQmVybGluIFNhbnMgRkIsQmVybmFyZCBNVCBDb25kZW5zZWQsQmxhY2thZGRlciBJVEMsQm9kb25pIE1ULEJvZG9uaSBNVCBCbGFjayxCb2RvbmkgTVQgQ29uZGVuc2VkLEJvb2tzaGVsZiBTeW1ib2wgNyxCcmFkbGV5IEhhbmQgSVRDLEJyb2Fkd2F5LEJydXNoIFNjcmlwdCBNVCxDYWxpZm9ybmlhbiBGQixDYWxpc3RvIE1ULENhbmRhcmEsQ2FzdGVsbGFyLENlbnRhdXIsQ2hpbGxlcixDb2xvbm5hIE1ULENvbnN0YW50aWEsQ29vcGVyIEJsYWNrLENvcHBlcnBsYXRlIEdvdGhpYyxDb3BwZXJwbGF0ZSBHb3RoaWMgTGlnaHQsQ29yYmVsLEN1cmx6IE1ULEVicmltYSxFZHdhcmRpYW4gU2NyaXB0IElUQyxFbGVwaGFudCxFbmdyYXZlcnMgTVQsRmFuZ1NvbmcsRmVsaXggVGl0bGluZyxGb290bGlnaHQgTVQgTGlnaHQsRm9ydGUsRnJlZXN0eWxlIFNjcmlwdCxGcmVuY2ggU2NyaXB0IE1ULEdhYnJpb2xhLEdpZ2ksR2lsbCBTYW5zIE1ULEdpbGwgU2FucyBNVCBDb25kZW5zZWQsR291ZHkgT2xkIFN0eWxlLEdvdWR5IFN0b3V0LEhhZXR0ZW5zY2h3ZWlsZXIsSGFycmluZ3RvbixIaWdoIFRvd2VyIFRleHQsSW1wcmludCBNVCBTaGFkb3csSW5mb3JtYWwgUm9tYW4sSm9rZXJtYW4sSnVpY2UgSVRDLEthaVRpLEtyaXN0ZW4gSVRDLEt1bnN0bGVyIFNjcmlwdCxNYWduZXRvLE1haWFuZHJhIEdELE1hbGd1biBHb3RoaWMsTWFybGV0dCxNYXR1cmEgTVQgU2NyaXB0IENhcGl0YWxzLE1pY3Jvc29mdCBIaW1hbGF5YSxNaWNyb3NvZnQgSmhlbmdIZWksTWljcm9zb2Z0IE5ldyBUYWkgTHVlLE1pY3Jvc29mdCBQaGFnc1BhLE1pY3Jvc29mdCBUYWkgTGUsTWljcm9zb2Z0IFlhSGVpLE1pY3Jvc29mdCBZaSBCYWl0aSxNaW5nTGlVX0hLU0NTLUV4dEIsTWluZ0xpVS1FeHRCLE1pc3RyYWwsTW9kZXJuIE5vLiAyMCxNb25nb2xpYW4gQmFpdGksTVMgUmVmZXJlbmNlIFNwZWNpYWx0eSxNUyBVSSBHb3RoaWMsTVYgQm9saSxOaWFnYXJhIEVuZ3JhdmVkLE5pYWdhcmEgU29saWQsTlNpbVN1bixPbGQgRW5nbGlzaCBUZXh0IE1ULE9ueXgsUGFsYWNlIFNjcmlwdCBNVCxQYXB5cnVzLFBhcmNobWVudCxQZXJwZXR1YSxQZXJwZXR1YSBUaXRsaW5nIE1ULFBsYXliaWxsLFBNaW5nTGlVLUV4dEIsUG9vciBSaWNoYXJkLFByaXN0aW5hLFJhdmllLFJvY2t3ZWxsLFJvY2t3ZWxsIENvbmRlbnNlZCxTaG93Y2FyZCBHb3RoaWMsU2ltSGVpLFNpbVN1bixTaW1TdW4tRXh0QixTbmFwIElUQyxTdGVuY2lsLFN5bGZhZW4sVGVtcHVzIFNhbnMgSVRDLFR3IENlbiBNVCxUdyBDZW4gTVQgQ29uZGVuc2VkLFZpbmVyIEhhbmQgSVRDLFZpdmFsZGksVmxhZGltaXIgU2NyaXB0LFdpZGUgTGF0aW4iLCJkdCI6IjIwMjAtMDgtMDMiLCJ0aW1lIjoiMjAyMC0wOC0wMyAxNzo1NTo0MyIsInVzZXJpZCI6IiIsIm1pZCI6ImMzOGE1MjA1Y2JhZTdiMWIwNDNmMDcyYTUxYzJjODkyIiwidXVpZCI6ImUwZDdmNDdlODdkZmFjOGM3ODU5MGIwYmI0NjU2MjUyIiwiYXBwaWQiOiIxMDE0Iiwid2ViZHJpdmVyIjpmYWxzZSwiY2FsbFBoYW50b20iOmZhbHNlLCJ0ZW1wS2dNaWQiOiIiLCJyZWZlcnJlciI6IiIsInNvdXJjZSI6Imh0dHBzOi8vd3d3Lmt1Z291LmNvbS8iLCJjbGllbnRBcHBpZCI6IiIsImNsaWVudHZlciI6IiIsImNsaWVudE1pZCI6IiIsImNsaWVudERmaWQiOiIiLCJjbGllbnRVc2VySWQiOiIiLCJhdWRpb0tleSI6IjEyNC4wNDM0NDc0NjUzNzM5In0=',
  })
    .then((res) => res.json())
    .then(({data}) => {
      return data.dfid;
    });
  const token = {collect: t.collect, dfid, mid: t.mid};
  await MyStorage.setData(kgKey, JSON.stringify(token));
  return token;
}
function getCookie() {
  const url = getTokenUrl({});
  return url;
}
function getSmallImageUrl(url) {
  return `${url}?param=140y140`;
}
function showPlaylist(offset) {
  const url = `http://m.kugou.com/plist/index?json=true&page=${offset}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const result = data.plist.list.info.map((item) => ({
        cover_img_url: item.imgurl ? item.imgurl.replace('{size}', '400') : '',
        title: item.specialname,
        id: `kgplaylist_${item.specialid}`,
        source_url: 'http://www.kugou.com/yy/special/single/{size}.html'.replace(
          '{size}',
          item.specialid,
        ),
      }));
      return {result, hasNextPage: !!data.plist.list.has_next};
    })
    .catch(() => {
      // console.error(error);
    });
}
function getNEScore(song) {
  if (!song) {
    return 0;
  }
  const privilege = song.privilege;

  if (song.program) {
    return 0;
  }

  if (privilege) {
    if (privilege.st != null && privilege.st < 0) {
      return 100;
    }
    if (
      privilege.fee > 0 &&
      privilege.fee !== 8 &&
      privilege.payed === 0 &&
      privilege.pl <= 0
    ) {
      return 10;
    }
    if (
      privilege.fee === 16 ||
      (privilege.fee === 4 && privilege.flag & 2048)
    ) {
      return 11;
    }
    if (
      (privilege.fee === 0 || privilege.payed) &&
      privilege.pl > 0 &&
      privilege.dl === 0
    ) {
      return 1e3;
    }
    if (privilege.pl === 0 && privilege.dl === 0) {
      return 100;
    }

    return 0;
  }

  if (song.status >= 0) {
    return 0;
  }
  if (song.fee > 0) {
    return 10;
  }

  return 100;
}

function isPlayable(song) {
  return getNEScore(song) < 100;
}

function convert(allowAll) {
  return (songInfo) => ({
    id: `netrack_${songInfo.id}`,
    title: songInfo.name,
    artist: songInfo.ar[0].name,
    artist_id: `neartist_${songInfo.ar[0].id}`,
    album: songInfo.al.name,
    album_id: `nealbum_${songInfo.al.id}`,
    source: 'netease',
    source_url: `http://music.163.com/#/song?id=${songInfo.id}`,
    img_url: getSmallImageUrl(songInfo.al.picUrl),
    url: `netrack_${songInfo.id}`,
    disabled: allowAll ? false : !isPlayable(songInfo),
  });
}

function getPlaylist(playlistId) {
  const listId = playlistId.split('_')[0];
  const d = playlistId.split('_').pop();
  switch (listId) {
    case 'kgplaylist':
      return kg_get_playlist(d);
    case 'kgalbum':
      return kg_album(d);
    case 'kgartist':
      return kg_artist(d);
    default:
      return null;
  }
}

async function kg_artist(listId) {
  let target_url = `http://mobilecdnbj.kugou.com/api/v3/singer/info?singerid=${listId}`;
  const info = await fetch(target_url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let {data} = response;
      data = JSON.parse(data);
      return {
        cover_img_url: data.data.imgurl.replace('{size}', '400'),
        title: data.data.singername,
        id: `kgartist_${listId}`,
        source_url: 'http://www.kugou.com/singer/{id}.html'.replace(
          '{id}',
          listId,
        ),
      };
    });
  target_url = `http://mobilecdnbj.kugou.com/api/v3/singer/song?singerid=${listId}&page=1&pagesize=30`;

  const tracks = await fetch(target_url)
    .then((response) => {
      return response.json();
    })
    .then(({data}) => {
      return data.data.info.map((t) => kg_render_artist_result_item(t, info));
    });
  return {info, tracks};
}

async function kg_render_artist_result_item(item, info) {
  const track = {
    id: `kgtrack_${item.hash}`,
    title: '',
    artist: '',
    artist_id: info.id,
    album: '',
    album_id: `kgalbum_${item.album_id}`,
    source: 'kugou',
    source_url: `http://www.kugou.com/song/#hash=${item.hash}&album_id=${item.album_id}`,
    img_url: '',
    url: `kgtrack_${item.hash}`,
    lyric_url: item.hash,
  };
  const one = item.filename.split('-');
  track.title = one[1].trim();
  track.artist = one[0].trim();
  // Fix album name and img
  const target_url = `${
    'http://www.kugou.com/yy/index.php?' + 'r=play/getdata&hash='
  }${item.hash}`;
  await fetch(
    `http://mobilecdnbj.kugou.com/api/v3/album/info?albumid=${item.album_id}`,
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let {data} = response;
      data = JSON.parse(data);
      if (data.status && data.data !== undefined) {
        track.album = data.data.albumname;
      } else {
        track.album = '';
      }
    });

  await fetch(target_url)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      const res_data = JSON.parse(res.data);
      track.img_url = res_data.data.img;
    });
  return track;
}

async function kg_album(listId) {
  // eslint-disable-line no-unused-vars
  let target_url = `${
    'http://mobilecdnbj.kugou.com/api/v3/album/info?' + 'albumid='
  }${listId}`;

  const info = await fetch(target_url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let {data} = response;
      data = JSON.parse(data);

      return {
        cover_img_url: data.data.imgurl.replace('{size}', '400'),
        title: data.data.albumname,
        id: `kgalbum_${data.data.albumid}`,
        source_url: 'http://www.kugou.com/album/{id}.html'.replace(
          '{id}',
          data.data.albumid,
        ),
      };
    });
  target_url = `${
    'http://mobilecdnbj.kugou.com/api/v3/album/song?' + 'albumid='
  }${listId}&page=1&pagesize=-1`;
  const tracks = await fetch(target_url).then((res) => {
    let res_data = res.data;
    res_data = JSON.parse(res_data);
    return res_data.data.info.map((t) =>
      kg_render_album_result_item(t, info, listId),
    );
  });
  return {info, tracks};
}

async function kg_get_playlist(listId) {
  const target_url = `http://m.kugou.com/plist/list/${listId}?json=true`;

  return await fetch(target_url)
    .then((response) => {
      return response.json();
    })
    .then(async (data) => {
      const info = {
        cover_img_url: data.info.list.imgurl
          ? data.info.list.imgurl.replace('{size}', '400')
          : '',
        title: data.info.list.specialname,
        id: `kgplaylist_${data.info.list.specialid}`,
        source_url: 'http://www.kugou.com/yy/special/single/{size}.html'.replace(
          '{size}',
          data.info.list.specialid,
        ),
      };
      const tracks = await Promise.all(
        data.list.list.info.map(
          async (item) => await kg_render_playlist_result_item(item),
        ),
      );
      return {
        info,
        tracks: tracks,
      };
    });
}

async function kg_render_playlist_result_item(item) {
  let target_url = `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${item.hash}`;

  const track = {
    id: `kgtrack_${item.hash}`,
    title: '',
    artist: '',
    artist_id: '',
    album: '',
    album_id: `kgalbum_${item.album_id}`,
    source: 'kugou',
    source_url: `http://www.kugou.com/song/#hash=${item.hash}&album_id=${item.album_id}`,
    img_url: '',
    url: `xmtrack_${item.hash}`,
    lyric_url: item.hash,
  };
  // Fix song info

  await fetch(target_url, {headers: {referer: 'http://www.kugou.com/'}})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.errorCode === 1002) {
        return;
      }
      track.title = data.songName;
      track.artist = data.singerId === 0 ? '未知' : data.singerName;
      track.artist_id = `kgartist_${data.singerId}`;
      if (data.imgUrl !== undefined) {
        track.img_url = data.imgUrl.replace('{size}', '400');
      } else {
        // track['img_url'] = data.imgUrl.replace('{size}', '400');
      }
      // Fix album
    });
  target_url = `http://mobilecdnbj.kugou.com/api/v3/album/info?albumid=${item.album_id}`;
  fetch(target_url)
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      const {data: res_data} = res;
      if (res_data.errorCode === 1002) {
        return;
      }
      if (
        res_data.status &&
        res_data.data !== undefined &&
        res_data.data !== null
      ) {
        track.album = res_data.data.albumname;
      } else {
        track.album = '';
      }
    });
  return track;
}

async function kg_render_album_result_item(item, info, album_id) {
  const track = {
    id: `kgtrack_${item.hash}`,
    title: '',
    artist: '',
    artist_id: '',
    album: info.title,
    album_id: `kgalbum_${album_id}`,
    source: 'kugou',
    source_url: `http://www.kugou.com/song/#hash=${item.hash}&album_id=${album_id}`,
    img_url: '',
    url: `xmtrack_${item.hash}`,
    lyric_url: item.hash,
  };
  // Fix other data
  const target_url = `${
    'http://m.kugou.com/app/i/getSongInfo.php?' + 'cmd=playInfo&hash='
  }${item.hash}`;
  await fetch(target_url)
    .then((response) => {
      return response.json();
    })
    .then(({data}) => {
      track.title = data.songName;
      track.artist = data.singerId === 0 ? '未知' : data.singerName;
      track.artist_id = `kgartist_${data.singerId}`;
      track.img_url = data.imgUrl.replace('{size}', '400');
    });
  return track;
}

async function bootstrapTrack(trackId) {
  const song_id = trackId.slice('kgtrack_'.length);
  let target_url = `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${song_id}`;

  return fetch(target_url, {
    headers: {
      referer: 'http://m.kugou.com',
      'content-type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.url;
    });
}

async function search(keyword, curpage) {
  const target_url = `http://songsearch.kugou.com/song_search_v2?keyword=${keyword}&page=${curpage}`;
  return requestAPI(target_url).then(({data}) => {
    const tracks = data.lists.map((t) => kg_render_search_result_item(t));
    return {
      result: tracks,
      total: data.total,
    };
  });
}

function kg_render_search_result_item(item) {
  const track = kg_convert_song(item);
  // Add singer img
  const url = `http://www.kugou.com/yy/index.php?r=play/getdata&hash=${track.lyric_url}`;
  requestAPI(url).then((data) => {
    track.img_url = data.data.img;
  });
  return track;
}

function kg_convert_song(song) {
  const track = {
    id: `kgtrack_${song.FileHash}`,
    title: song.SongName,
    artist: '',
    artist_id: '',
    album: song.AlbumName,
    album_id: `kgalbum_${song.AlbumID}`,
    source: 'kugou',
    source_url: `http://www.kugou.com/song/#hash=${song.FileHash}&album_id=${song.AlbumID}`,
    img_url: '',
    url: `kgtrack_${song.FileHash}`,
    lyric_url: song.FileHash,
  };
  let singer_id = song.SingerId;
  let singer_name = song.SingerName;
  if (song.SingerId instanceof Array) {
    [singer_id] = singer_id;
    [singer_name] = singer_name.split('、');
  }
  track.artist = singer_name;
  track.artist_id = `kgartist_${singer_id}`;
  return track;
}

function parseUrl(url) {
  let result = null;

  const r = /\/\/music\.163\.com\/playlist\/([0-9]+)/g.exec(url);

  if (r !== null) {
    return {
      type: 'playlist',
      id: `neplaylist_${r[1]}`,
    };
  }

  if (
    url.search('//music.163.com/#/m/playlist') !== -1 ||
    url.search('//music.163.com/#/playlist') !== -1 ||
    url.search('//music.163.com/playlist') !== -1 ||
    url.search('//music.163.com/#/my/m/music/playlist') !== -1
  ) {
    const parsed = queryString.parseUrl(url);

    result = {
      type: 'playlist',
      id: `neplaylist_${parsed.query.id}`,
    };
  }

  return result;
}

const meta = {name: '酷狗', platformId: 'kg', enName: 'kugou'};

export default {
  meta,
  showPlaylist,
  getPlaylist,
  bootstrapTrack,
  search,
  parseUrl,
};
