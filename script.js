// =====================
// شاشة التحميل
// =====================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loading-screen")
        .style.display = "none";

    }, 2000);

});


// ==========================
// تشغيل/إيقاف الموسيقى
// ==========================
function toggleAudio() {
  const music = document.getElementById("music");
  const btn = document.getElementById("audioBtn");

  if (music.paused) {
    music.play();
    btn.innerHTML = "Pause Music"; // الكلمة لما تكون الموسيقى شغالة
  } else {
    music.pause();
    btn.innerHTML = "Play Music"; // الكلمة لما تكون الموسيقى واقفة
  }
}


// =====================
// مشاركة الموقع
// =====================
function shareSite() {
  if (navigator.share) {
    // هذه الميزة تعمل على معظم الموبايلات والمتصفحات الحديثة
    navigator.share({
      title: 'Wedding Invitation',
      text: "You're invited to Kareem & Hadeer wedding ❤️",
      url: window.location.href,
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  } else {
    // لو المتصفح قديم، هنخليه ينسخ الرابط للمستخدم
    alert("Copied to clipboard: " + window.location.href);
    navigator.clipboard.writeText(window.location.href);
  }
}


// =====================
// العداد التنازلي
// غير التاريخ هنا
// =====================

const targetDate =
new Date("2026-08-17 21:00:00");

function updateCountdown() {

    const now =
    new Date();

    const diff =
    targetDate - now;

    if(diff <= 0){

        document
        .getElementById("countdown")
        .innerHTML =
        "🎉 Today Is The Big Day 🎉";

        return;
    }

    const days =
    Math.floor(
        diff /
        (1000 * 60 * 60 * 24)
    );

    const hours =
    Math.floor(
        (diff %
        (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );

    const minutes =
    Math.floor(
        (diff %
        (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    const seconds =
    Math.floor(
        (diff %
        (1000 * 60))
        /
        1000
    );

    document
    .getElementById("countdown")
    .innerHTML =

    `${days} Days
    ${hours} Hours
    ${minutes} Minutes
    ${seconds} Seconds`;

}

setInterval(
    updateCountdown,
    1000
);

updateCountdown();


// =====================
// ظهور الصور أثناء النزول
// =====================

const photos =
document.querySelectorAll(".photo");

const observer =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target
            .classList
            .add("show");

        }

    });

},
{
    threshold:0.2
}

);

photos.forEach(photo=>{

    observer.observe(photo);

});


// =====================
// تكبير الصور
// =====================

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightbox-img");

photos.forEach(photo=>{

    photo.addEventListener(
    "click",

    ()=>{

        lightbox.style.display =
        "flex";

        lightboxImg.src =
        photo.src;

    });

});

document
.getElementById("close-btn")
.addEventListener(

"click",

()=>{

    lightbox.style.display =
    "none";

});

lightbox.addEventListener(

"click",

(e)=>{

    if(
        e.target === lightbox
    ){

        lightbox.style.display =
        "none";

    }

});


// =====================
// القلوب الطائرة
// =====================

function createHeart(){

    const heart =
    document.createElement("div");

    heart.classList.add("heart");

    const icons = [

        "❤️",
        "💕",
        "💖",
        "🌸"

    ];

    heart.innerHTML =

    icons[
    Math.floor(
    Math.random() *
    icons.length
    )
    ];

    heart.style.left =

    Math.random() *
    100 +
    "vw";

    heart.style.fontSize =

    (
    20 +
    Math.random()*25
    ) + "px";

    document.body
    .appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },8000);

}

setInterval(
    createHeart,
    700
);


// =====================
// رسالة ترحيب من الرابط
// مثال:
// index.html?guest=maro
// =====================

const params =
new URLSearchParams(
window.location.search
);

const guest =
params.get("guest");

if(guest){

    const welcome =
    document.createElement("div");

    welcome.style.position =
    "fixed";

    welcome.style.top =
    "20px";

    welcome.style.left =
    "50%";

    welcome.style.transform =
    "translateX(-50%)";

    welcome.style.background =
    "white";

    welcome.style.padding =
    "12px 25px";

    welcome.style.borderRadius =
    "30px";

    welcome.style.boxShadow =
    "0 5px 20px rgba(0,0,0,.2)";

    welcome.style.zIndex =
    "9999";

    welcome.innerHTML =
    `Welcome ${guest} ❤️`;

    document.body
    .appendChild(welcome);

}
    function attend(){

document.getElementById(
"guest-form"
).style.display = "block";

document.getElementById(
"attendance-result"
).innerHTML =

" Please leave your name and wishes.❤️";

}

function notAttend(){

document.getElementById(
"guest-form"
).style.display = "none";

document.getElementById(
"attendance-result"
).innerHTML =

" Thank you for letting us know.❤️";

}
function submitWish() {
  const name = document.getElementById("guest-name").value;
  const message = document.getElementById("guest-message").value;

  // التحقق من أن الحقول ليست فارغة
  if (name.trim() === "" || message.trim() === "") {
    alert("Please enter your name and message.");
    return;
  }

  // رابط الـ Web App المربوط بملف الـ Google Sheets
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwMEoobxx1Qb6M5IKO3UivgGyYR5AXS1tNp3eTrxtA4il-AQhwfPDIODXp3Js5H1V1Tcg/exec';

  // تجهيز البيانات
  const formData = new URLSearchParams();
  formData.append('name', name);
  formData.append('message', message);

  // عملية الإرسال
  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then(() => {
    // رسالة الشكر على الموقع
    document.getElementById("attendance-result").innerHTML = 
      `Thank you ${name} for your lovely wishes!❤️ `;
    // تفريغ الحقول بعد الإرسال
    document.getElementById("guest-form").reset();
  })
  .catch(error => console.error('Error!', error));
}


function showToast(message) {
    const toast = document.getElementById("toastMessage");
    toast.innerHTML = message;
    toast.style.display = "block";
    
    setTimeout(function() {
        toast.style.display = "none";
    }, 10000); // الرسالة ستختفي بعد 10 ثواني
}

// تظهر الرسالة تلقائياً أول ما الموقع يفتح
window.addEventListener("load", function() {
    showToast(" ❤️اللَّهُمَّ ‌صَلِّ ‌عَلَى ‌مُحَمَّدٍ ‌وَعَلَى ‌آلِ ‌مُحَمَّدٍ» «بارَكَ اللَّهُ لَكم ، وبارَكَ عليْكم ، وجمعَ بينَكما في خيرٍ.» ");
});