import xFetch from './xFetch';

import config from './config';

export async function getAllMenus({open_id,token}) {

  return xFetch(`${config.configcenter.url}/${config.configcenter.appid}/${config.configcenter.env}/user/${open_id}/acl?istree=1`);
}