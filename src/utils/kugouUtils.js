import md5 from 'md5';
import CryptoJS from '../../vendor/cryptojs_aes';

const reg = new RegExp('-', 'g');

export function getConnectUrl() {
  var e = h(),
    t = 4,
    n = parseInt(new Date().getTime() / 1e3),
    i = S(),
    r = 0,
    a = guid().replace(reg, ''),
    o = '',
    s = '',
    c = {
      appid: e,
      platid: t,
      clientver: 0,
      clienttime: n,
      signature: '',
      mid: i,
      uuid: a,
      userid: r,
      dfid: o,
      'p.token': s,
    };
  c.signature = signatureParam(c, e);
  const bodyParam = JSON.stringify({uuid: a});
  const d = CryptoJS.enc.Utf8.parse(bodyParam);
  const u = CryptoJS.enc.Base64.stringify(d);
  return {
    url:
      'https://userservice.kugou.com/risk/v1/r_query_collect?appid=' +
      c.appid +
      '&platid=' +
      c.platid +
      '&clientver=' +
      c.clientver +
      '&clienttime=' +
      c.clienttime +
      '&signature=' +
      c.signature +
      '&mid=' +
      c.mid +
      '&userid=' +
      c.userid +
      '&uuid=' +
      c.uuid +
      '&dfid=' +
      c.dfid +
      '&p.token=' +
      c['p.token'],
    body: u,
  };
}
export function getTokenUrl() {
  const n = h(),
    i = 4,
    r = parseInt(new Date().getTime() / 1e3),
    a = S(),
    o = 0,
    c = '';
  //kg_mid a
  //kg_dfid
  //kg_dfid_collect  md5(r)
  const u = {
    appid: n,
    platid: i,
    clientver: 0,
    clienttime: r,
    signature: '',
    mid: a,
    uuid: guid().replace(reg, ''),
    userid: o,
    'p.token': c,
  };
  u.signature = signatureParam(u, n);
  return {
    collect: md5(r),
    mid: a,
    url:
      'https://userservice.kugou.com/risk/v1/r_register_dev?appid=' +
      u.appid +
      '&platid=' +
      u.platid +
      '&clientver=' +
      u.clientver +
      '&clienttime=' +
      u.clienttime +
      '&signature=' +
      u.signature +
      '&mid=' +
      u.mid +
      '&userid=' +
      u.userid +
      '&uuid=' +
      u.uuid +
      '&p.token=' +
      u['p.token'],
  };
}

function h() {
  // const e = document.getElementsByTagName('script');
  // if (e && e.length > 0) {
  //   for (var t = 0, n = e.length; t < n; t++) {
  //     var i = e[t].src;
  //     if (i.indexOf('verify/static/js/registerDev1.min.js?appid=') != -1) {
  //       var r = {},
  //         a = (i = i.split('?')[1]).split('&');
  //       for (t = 0; t < a.length; t++) {
  //         r[a[t].split('=')[0]] = unescape(a[t].split('=')[1]);
  //       }
  //       return r.appid;
  //     }
  //   }
  // }
  return 1014;
}

function signatureParam(e, t) {
  const n = new Array();
  for (const i in e) {
    e.hasOwnProperty(i) && i != 'signature' && n.push(e[i]);
  }
  let a = '';
  for (let r = n.sort(), o = 0, s = r.length; o < s; o++) {
    a += r[o];
  }
  return md5(t + a + t);
}

function S() {
  const e = guid();
  return md5(e);
  // try {
  //   Cookie.write('kg_mid', md5(e), 864e6, '/', 'kugou.com');
  // } catch (e) {}
  // return md5(e);
}
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
