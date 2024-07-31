console.log("Welcome to Music App");

document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.container');
    const homeLink = document.getElementById('home-link');
    const subscribeLink = document.getElementById('subscribe-link');

    loadContent('home.html');

    homeLink.addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('home.html');
    });

    subscribeLink.addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('subscribe.html');
    });

    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => console.error('Error loading content:', error));
    }
});

let songIndex = 0;
let audioElement = new Audio('song1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');

let songs = [
    {songName: "NCS - Fearless", filePath: "song1.mp3", coverPath: "cover1.jpg"},
    {songName: "NCS - Invisible", filePath: "song2.mp3", coverPath: "cover2.jpg"},
]

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src ='song2.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
    })
})
document.getElementById('next').addEventListener('click',()=>{
    audioElement.src = 'song2.mp3';
    audioElement.currentTime=0;
    if (audioElement.paused) {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');}
    audioElement.play();
});

document.getElementById('previous').addEventListener('click',()=>{
    audioElement.src = 'song1.mp3';
    audioElement.currentTime=0;
    if (audioElement.paused) {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');}
    audioElement.play();
})

document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
    audioElement.volume = parseInt(e.target.value)/100;
})

const paymentStart = () => {
console.log("payment started...");
let amount = $("#payment_field").val();
console.log(amount);
if(amount == '' || amount == null){
alert("Amount is Required");
return;
}
};

$.ajax(
{
url:'/user/create_order',
data:JSON.stringify({amount:amount, info:'order_request'}),
contentType:'application/json',
type:'POST',
dataType:'json',
success:function(response){
console.log(response);
if(response.status == "created"){
let options={
key:"your_key",
amount:response.amount,
currency:"INR",
name:"Music Player",
description:"donation",
order_id:response.id,
handler:function(response){
console.log(response.razorpay_payment_id);
console.log(response.razorpay_order_id);
console.log(response.razorpay_signature);
console.log("payment successful");
},
"prefill": {
"name": "",
"email": "",
"contact": ""
},
"notes": {
"address": "Devansh Music Player"

},
"theme": {
"color": "#3399cc"
}
};

let rzp = new Razorpay(options);
rzp.on('payment.failed', function (response){
console.log(response.error.code);
console.log(response.error.description);
console.log(response.error.source);
console.log(response.error.step);
console.log(response.error.reason);
console.log(response.error.metadata.order_id);
console.log(response.error.metadata.payment_id);
alert("payment failed");
});
rzp.open();
}
},
error:function(error){
console.log(error);
alert("Something went wrong");
}
}
)