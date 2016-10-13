import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import MD5 from '../utils/md5';

const errorMessages = (res) => `${res.status} ${res.statusText}`;

function check401(res) {
  if (res.status === 401) {
    location.href = '/401';
  }
  return res;
}

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({...res,
    jsonResult
  }));
}

function errorMessageParse(res) {
  const {
    err_code,
    err_msg
  } = res.jsonResult;
  if (err_code && err_code != 200) {
    return Promise.reject(err_msg);
  }
  return res;
}

function xFetch(url, options) {
  const opts = {
    ...options
  };
  opts.headers = {
    ...opts.headers
  };

  url = addUrlPara('open_id', cookie.get('open_id'), url)
    // opts.headers = {
    //   ...opts.headers,utils
    //   authorization: cookie.get('authorization') || '',
    // };
    // 


  return fetch(url, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse);
}

function addUrlPara(name, value, url) {
  var currentUrl = url.split('#')[0];
  if (/\?/g.test(currentUrl)) {
    if (/name=[-\w]{4,25}/g.test(currentUrl)) {
      currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
    } else {
      currentUrl += "&" + name + "=" + value;
    }
  } else {
    currentUrl += "?" + name + "=" + value;
  }
  if (url.split('#')[1]) {
    url = currentUrl + '#' + url.split('#')[1];
  } else {
    url = currentUrl;
  }
  return url
}

export default xFetch;