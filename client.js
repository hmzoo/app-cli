import got from 'got';

const {data} = await got.post('https://srv-pre-website.cg72.fr/server-status', {
	json: {
		hello: 'world'
	}
}).json();

console.log(data);