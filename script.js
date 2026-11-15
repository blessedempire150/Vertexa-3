// VERTEXA Global Theme + Language - Apply for all pages
(function(){
  var t=localStorage.getItem('vertexa_theme')||'vertexa';
  var TH={vertexa:"#6A00FF",light:"#111111",dark:"#6A00FF",ocean:"#0077FF",sunset:"#FF6A00",forest:"#0A7A42",pink:"#FF2E88",blackgold:"#D4AF37"};
  var c=TH[t]||"#6A00FF";
  var s=document.createElement('style'); s.innerHTML='.btn-purple{background:'+c+'!important;} .inspo-top{background:'+c+'!important;}';
  document.head.appendChild(s);
})();var ADMIN_EMAIL="admin@vertexa.com";
var firebaseConfig={apiKey:"AIzaSyCvPOiAoflp_hnVFOYqcdtacbIS-rdnCqQ",authDomain:"vertexa3-d852f.firebaseapp.com",projectId:"vertexa3-d852f",storageBucket:"vertexa3-d852f.firebasestorage.app",messagingSenderId:"379061561522",appId:"1:379061561522:web:c264702092a54dc7ce81ab",measurementId:"G-PL0FT0744P"};
try{firebase.initializeApp(firebaseConfig);window.db=firebase.firestore();window.auth=firebase.auth();}catch(e){console.log(e);}
function showMsg(m){var e=document.getElementById('loginMsg');if(e)e.textContent=m;}
function doSignup(){
var email=document.getElementById('loginEmail').value.trim().toLowerCase();
var pass=document.getElementById('loginPass').value;
if(!email||!pass){showMsg('Put email and password');return;}
if(!window.auth){showMsg('Firebase no connect');return;}
window.auth.createUserWithEmailAndPassword(email,pass).then(function(res){
return window.db.collection('users').doc(res.user.uid).set({email:email,createdAt:new Date().toISOString(),unlocked:false,refs:0,passed:[],balance:0});
}).then(function(){showMsg('Account created! Now tap Login');alert('Account created! Now Login');}).catch(function(err){showMsg(err.message);});
}
function doLogin(){
var email=document.getElementById('loginEmail').value.trim().toLowerCase();
var pass=document.getElementById('loginPass').value;
if(!window.auth){showMsg('Firebase no connect');return;}
window.auth.signInWithEmailAndPassword(email,pass).then(function(){
if(email===ADMIN_EMAIL){window.location.href='admin.html';}else{window.location.href='student.html';}
}).catch(function(err){showMsg(err.message);});
}
var lb=document.getElementById('loginBtn');if(lb)lb.addEventListener('click',doLogin);
var sb=document.getElementById('signupBtn');if(sb)sb.addEventListener('click',doSignup);