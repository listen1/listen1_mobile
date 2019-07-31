import CryptoJS from '../../vendor/cryptojs_aes';
import JSEncrypt from '../../vendor/jsencrypt';

const aesEncrypt = (text, key, iv) => {
  const keyutf = CryptoJS.enc.Utf8.parse(key);
  const ivBin = CryptoJS.enc.Utf8.parse(iv);
  const enc = CryptoJS.AES.encrypt(text, keyutf, {
    iv: ivBin,
    mode: CryptoJS.mode.CBC,
  });
  const encStr = enc.toString();

  return encStr;
  // return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(encStr));
};

const rsaEncrypt = (text, key) => {
  const rsaEncryptObject = new JSEncrypt({ padding: 'RSA_ZERO_PADDING' });

  rsaEncryptObject.setPublicKey(key);
  const secKey = rsaEncryptObject.encrypt(text);
  const buf = CryptoJS.enc.Base64.parse(secKey);

  return CryptoJS.enc.Hex.stringify(buf);
};

function getRandomBase62(length) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

  return result;
}
function reverseString(str) {
  return str
    .split('')
    .reverse()
    .join('');
}

export const weapi = object => {
  const iv = '0102030405060708';
  const presetKey = '0CoJUm6Qyw8W8jud';
  const publicKey =
    '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB\n-----END PUBLIC KEY-----';

  const text = JSON.stringify(object);
  const secretKey = getRandomBase62(16);

  // const secretKey = "1234123412341234";
  return {
    params: aesEncrypt(aesEncrypt(text, presetKey, iv), secretKey, iv),
    encSecKey: rsaEncrypt(reverseString(secretKey), publicKey),
  };
};
// module.exports = weapi;
// console.log(weapi({name:'secret'}))
