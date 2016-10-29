import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import Config from './src/common/Config';

export default express()
	.use(bodyParser.json())

	.get('/angular', (req,res)=> res.sendFile(path.join(__dirname, 'build-angular/index.html')) )
	.use('/angular/', express.static(path.join(__dirname, 'build-angular')))

	.get('/react', (req,res)=> res.sendFile(path.join(__dirname, 'build-react/index.html')) )
	.use('/react/', express.static(path.join(__dirname, 'build-react')))

	.post('/register', (req, res)=>
		setTimeout(()=> {
			console.log('/register', req.body);
			res.status(201).end();
		}, Math.floor(Math.random() * (Config.serverTimeout)) + 500))

	.listen(Config.port, ()=> console.log('server started at localhost:8080') );
