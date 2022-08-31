import Router from 'next/router'
import { TIME_UNITS } from '@/enumerators/enumerators'

let defaultKeys = {
    method: 'GET',
    url: '/api'
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'credentials': 'include',
    'origin': '*',
}

const fetchApi = async function(api, keys = {}, body = undefined, reducer, doNotRedirect) {

    keys = reducer ? reducer(api, keys) : keys

    const keysObj = Object.assign({}, defaultKeys, keys)
    const keysArr = Object.keys(keysObj).filter((key) => key !== 'method' && key !== 'url')
    let delimiter = '?'
    let url = `${ keysObj.url }${ api }`

    for (let key of keysArr) {
        let value = keysObj[key]

        if (value !== undefined) {
            url += delimiter
            url += `${ key }=${ value }`
            delimiter = '&'
        }
    }
    const options = {
        'Content-Type': 'application/json',
        'cache': 'no-cache',
        headers,
        'method': keysObj.method,
    }
    keysObj.method !== 'GET' ?
        typeof body === 'object' ?
            options.body = JSON.stringify(body) :
            options.body = body :
        void(0)

    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(async (response) => {
                if (!doNotRedirect) {
                    const location = response.headers.get('location')
                    if (location) {
                        setTimeout(() => Router.push(location), TIME_UNITS.SECOND / 10)
                    }
                }
                const json = await response.json()
                resolve(json)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export default fetchApi