export const URL = 'http://localhost:8080/';
export default async function cultiFetch(path: string, object?: any) {
    const response = await fetch(URL + path, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: object && JSON.stringify(object),
    });
    if (!response.ok) {
        console.log('Error:', response);
        throw Error(response.statusText);
    }
    const json = await response.json();
    if (json.mensaje !== 'Logueado' && json.mensaje !== 'OK' && json.mensaje !== 'Ok') {
        console.log('Error:', json);
        throw Error(json.error || json.mensaje);
    }
    return json;
}
