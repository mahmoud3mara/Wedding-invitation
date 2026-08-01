// ======================
// تشغيل وإيقاف الموسيقى
// ======================

function toggleAudio(){

const music=document.getElementById("music");

const btn=document.getElementById("audioBtn");

if(music.paused){

music.play();

btn.innerHTML="⏸️ إيقاف الموسيقى";

}else{

music.pause();

btn.innerHTML="🎵 تشغيل الموسيقى";

}

}

// ======================
// فتح الظرف
// ======================

function openInvitation(){

const top=document.querySelector(".envelope-top");

const seal=document.getElementById("seal");

const screen=document.getElementById("envelope-screen");

top.style.transform="rotateX(180deg)";

seal.style.transform="translateX(-50%) scale(.3)";

seal.style.opacity="0";

setTimeout(()=>{

screen.style.transition="1.5s";

screen.style.opacity="0";

},1500);

setTimeout(()=>{

screen.style.display="none";

document.getElementById("music").play().catch(()=>{});

},2800);

}

// ======================
// مشاركة الدعوة
// ======================

function shareSite(){

if(navigator.share){

navigator.share({

title:"دعوة زفاف كريم وهدير",

text:"يشرفنا حضوركم ❤️",

url:window.location.href

});

}else{

navigator.clipboard.writeText(window.location.href);

alert("تم نسخ الرابط ❤️");

}

}

// ======================
// العداد
// ======================

const targetDate=new Date("2026-08-19 21:00:00");

function updateCountdown(){

const now=new Date();

const diff=targetDate-now;

if(diff<=0){

document.getElementById("countdown").innerHTML="🎉 اليوم هو يوم الزفاف 🎉";

return;

}

const days=Math.floor(diff/(1000*60*60*24));

const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));

const minutes=Math.floor((diff%(1000*60*60))/(1000*60));

const seconds=Math.floor((diff%(1000*60))/1000);

document.getElementById("countdown").innerHTML=

`${days} يوم

<br>

${hours} ساعة

<br>

${minutes} دقيقة

<br>

${seconds} ثانية`;

}

setInterval(updateCountdown,1000);

updateCountdown();

// ======================
// ظهور الصور
// ======================

const photos=document.querySelectorAll(".photo");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.2});

photos.forEach(photo=>observer.observe(photo));

// ======================
// تكبير الصور
// ======================

const lightbox=document.getElementById("lightbox");

const lightboxImg=document.getElementById("lightbox-img");

photos.forEach(photo=>{

photo.onclick=()=>{

lightbox.style.display="flex";

lightboxImg.src=photo.src;

};

});

document.getElementById("close-btn").onclick=()=>{

lightbox.style.display="none";

};

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.style.display="none";

}

};

// ======================
// قلوب طائرة
// ======================

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

const icons=["❤️","🤍","🌸","❦"];

heart.innerHTML=icons[Math.floor(Math.random()*icons.length)];

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(20+Math.random()*25)+"px";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),8000);

}

setInterval(createHeart,700);
// ======================
// تأكيد الحضور
// ======================

function attend(){

document.getElementById("guest-form").style.display="block";

document.getElementById("attendance-result").innerHTML=

"💛 نتشرف بحضوركم، برجاء كتابة الاسم ورسالة تهنئة.";

}

function notAttend(){

document.getElementById("guest-form").style.display="none";

document.getElementById("attendance-result").innerHTML=

"🌹 شكرًا لإبلاغنا، نتمنى رؤيتكم في مناسبة سعيدة.";

}

// ======================
// إرسال التهنئة
// ======================

function submitWish(){

const name=document.getElementById("guest-name").value.trim();

const message=document.getElementById("guest-message").value.trim();

if(name===""||message===""){

alert("من فضلك اكتب الاسم ورسالة التهنئة ❤️");

return;

}

const scriptURL="https://script.google.com/macros/s/AKfycbwMEoobxx1Qb6M5IKO3UivgGyYR5AXS1tNp3eTrxtA4il-AQhwfPDIODXp3Js5H1V1Tcg/exec";

const formData=new URLSearchParams();

formData.append("name",name);

formData.append("message",message);

fetch(scriptURL,{

method:"POST",

mode:"no-cors",

body:formData

})

.then(()=>{

document.getElementById("attendance-result").innerHTML=

`💛 شكرًا ${name} على تهنئتك الجميلة.`;

document.getElementById("guest-name").value="";

document.getElementById("guest-message").value="";

showToast("💌 تم إرسال التهنئة بنجاح");

})

.catch(()=>{

showToast("❌ حدث خطأ أثناء الإرسال");

});

}

// ======================
// رسالة الترحيب بالرابط
// ======================

const params=new URLSearchParams(window.location.search);

const guest=params.get("guest");

if(guest){

const welcome=document.createElement("div");

welcome.style.position="fixed";

welcome.style.top="20px";

welcome.style.left="50%";

welcome.style.transform="translateX(-50%)";

welcome.style.background="#ffffff";

welcome.style.padding="15px 25px";

welcome.style.borderRadius="40px";

welcome.style.boxShadow="0 10px 30px rgba(0,0,0,.2)";

welcome.style.zIndex="9999";

welcome.style.fontSize="20px";

welcome.innerHTML=`🌹 أهلاً وسهلاً ${guest}`;

document.body.appendChild(welcome);

setTimeout(()=>{

welcome.remove();

},6000);

}

// ======================
// Toast
// ======================

function showToast(message){

const toast=document.getElementById("toastMessage");

toast.innerHTML=message;

toast.style.display="block";

toast.style.opacity="1";

setTimeout(()=>{

toast.style.opacity="0";

setTimeout(()=>{

toast.style.display="none";

},500);

},5000);

}

// ======================
// رسالة البداية
// ======================

window.addEventListener("load",()=>{

setTimeout(()=>{

showToast("🤍 بارك الله لهما وبارك عليهما وجمع بينهما في خير");

},3500);

});

// ======================
// تأثير بسيط عند تحريك الماوس
// ======================

document.addEventListener("mousemove",(e)=>{

const hero=document.querySelector(".hero-content");

const x=(e.clientX-window.innerWidth/2)/80;

const y=(e.clientY-window.innerHeight/2)/80;

hero.style.transform=`translate(${x}px,${y}px)`;

});

// ======================
// منع السحب على الصور
// ======================

document.querySelectorAll("img").forEach(img=>{

img.setAttribute("draggable","false");

});

// ======================
// نهاية الملف
// ======================
