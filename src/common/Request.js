/**
* Superagent can be used for more complex requests
* */
import Config from 'common/Config';

export default {
	post: (url, data)=> new Promise((resolve, reject)=>{
		let xhr = new XMLHttpRequest();
		let timeout = setTimeout(()=> reject('timeout'), Config.timeout);
		xhr.onreadystatechange = ()=> {
			if(xhr.readyState !== 4) return;
			clearTimeout(timeout);
			let status = xhr.status;
			if(status >= 500 && status <= 599) return reject(status);
			resolve(status);
		};
		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
		xhr.setRequestHeader('cache-control', 'no-cache');
		xhr.send(JSON.stringify(data));
	})
};
