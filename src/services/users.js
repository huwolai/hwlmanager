import xFetch from './xFetch';
import config from './config';


export async function searchUsers({
    page_index,
    page_size,
    mobile
}) {

    return xFetch(`${config.shopapi.url}/users/?page_index=${page_index}&page_size=${page_size}&mobile=${mobile}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "app_id": `${config.shopapi.appid}`
        }
    })
}