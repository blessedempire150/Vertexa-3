const firebaseConfig = {
  apiKey: "AIzaSyCvPOiAoflp_hnVFOYqcdtacbIS-rdnCqQ",
  authDomain: "vertexa3-d852f.firebaseapp.com",
  projectId: "vertexa3-d852f",
  storageBucket: "vertexa3-d852f.firebasestorage.app",
  messagingSenderId: "379061561522",
  appId: "1:379061561522:web:c264702092a54dc7ce81ab",
  measurementId: "G-PL0FT0744P"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

function saveToFirebase(){
  var uid = localStorage.getItem('vertexa_uid');
  if(!uid) return;
  var bal = Number(localStorage.getItem('vertexa_balance')||0);
  var paid = localStorage.getItem('vertexa_is_paid') || 'no';
  return db.collection('vertexa_users').doc(uid).set({
    balance: bal,
    is_paid: paid,
    updated: new Date().toString()
  }, {merge:true});
}

function loadFromFirebase(){
  var uid = localStorage.getItem('vertexa_uid');
  if(!uid) return;
  db.collection('vertexa_users').doc(uid).get().then((doc)=>{
    var d = doc.data();
    if(d){
      localStorage.setItem('vertexa_balance', d.balance || 0);
      localStorage.setItem('vertexa_is_paid', d.is_paid || 'no');
      localStorage.setItem('vertexa_name', d.name || localStorage.getItem('vertexa_name'));
      var b = document.getElementById('bal');
      if(b) b.textContent = '₦' + (d.balance || 0);
      var s = document.getElementById('st');
      if(s && d.is_paid=='yes') s.textContent = 'Paid Member ✅ • All Unlocked';
      var n = document.getElementById('nm');
      if(n) n.textContent = (d.name||'User') + ' 👋';
    }
  }).catch(function(e){ console.log(e.message); });
}