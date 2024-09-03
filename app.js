
import express from 'express';
import router from './router.js';
import cors from 'cors';

const portaHttp = 3000 ; 
const app = express();
app.use(express.json());
app.use(cors());
app.use(router)

app.listen(portaHttp, ()=>{
    console.log(`Escutando na porta: ${portaHttp}`);
})
