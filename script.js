// const bar = document.getElementById('bar')
// const nav = document.getElementById('navbar')
// const close=document.getElementById('close')
const { default: mongoose } = require('mongoose');
const Mongo=require('mongoose');
//connect db
mongoose.connect('mongodb://localhost/test');
mongoose.connection.once('open',function(){
    console.log("connection has made");
}).on('error',function(){
    console.log('error',error)        
});
// if(bar){
// bar.addEventListener('click', ()=>{
// nav.classList.add('active')
// })
// if(close){
//     close.addEventListener('click', ()=>{
//        nav.classList.add('close');
        
//     })
// }
// }