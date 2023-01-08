// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, getDoc, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";


// ██████╗ ███████╗██╗   ██╗    ████████╗███████╗███████╗████████╗██╗███╗   ██╗ ██████╗     ██████╗ ██████╗ 
// ██╔══██╗██╔════╝██║   ██║    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝     ██╔══██╗██╔══██╗
// ██║  ██║█████╗  ██║   ██║       ██║   █████╗  ███████╗   ██║   ██║██╔██╗ ██║██║  ███╗    ██║  ██║██████╔╝
// ██║  ██║██╔══╝  ╚██╗ ██╔╝       ██║   ██╔══╝  ╚════██║   ██║   ██║██║╚██╗██║██║   ██║    ██║  ██║██╔══██╗
// ██████╔╝███████╗ ╚████╔╝        ██║   ███████╗███████║   ██║   ██║██║ ╚████║╚██████╔╝    ██████╔╝██████╔╝
// ╚═════╝ ╚══════╝  ╚═══╝         ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═════╝ ╚═════╝ 
                                                                                                         
const firebaseConfig = {
  apiKey: "AIzaSyA7ZbnPBOQdoF7vKvOTuhLWWROmoQ8pTsI",
  authDomain: "pointsupply-dev.firebaseapp.com",
  projectId: "pointsupply-dev",
  storageBucket: "pointsupply-dev.appspot.com",
  messagingSenderId: "288815105119",
  appId: "1:288815105119:web:47373b3bd31be27fde07ea"
};


// ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗    ██████╗ ██████╗ 
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║    ██╔══██╗██╔══██╗
// ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██╔██╗ ██║    ██║  ██║██████╔╝
// ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██║╚██╗██║    ██║  ██║██╔══██╗
// ██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║    ██████╔╝██████╔╝
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═════╝ ╚═════╝                                                                                                   
// const firebaseConfig = {
//     apiKey: "AIzaSyA7bIt7XgCTdtT7i7zrt6sum7S_ByQrEhA",
//     authDomain: "loyalty-program-test.firebaseapp.com",
//     projectId: "loyalty-program-test",
//     storageBucket: "loyalty-program-test.appspot.com",
//     messagingSenderId: "588282118037",
//     appId: "1:588282118037:web:8d9d786a1bb8f9c185c09c",
//     measurementId: "G-KL35W6RQGP"
// };
//Standard Setup to Prevent Buttons showing
document.getElementById("dashboardLoginBtn").style.display = "none";
document.getElementById("dashboardRegisterBtn").style.display = "none";
document.getElementById("signOutBtn").style.display = "none";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const user = auth.currentUser;
const db = getFirestore(app);

//  █████╗ ██╗   ██╗████████╗██╗  ██╗
// ██╔══██╗██║   ██║╚══██╔══╝██║  ██║
// ███████║██║   ██║   ██║   ███████║
// ██╔══██║██║   ██║   ██║   ██╔══██║
// ██║  ██║╚██████╔╝   ██║   ██║  ██║
// ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
var uid;
var userEmail;
var admin;
onAuthStateChanged(auth, async user => {
    var signUpWandButton = document.getElementById("signUpWandButton");
    if(user != null) {
        // The user object has basic properties such as display name, email, etc.
        userEmail = user.email;
        const emailVerified = user.emailVerified;
        
        uid = user.uid;
        document.getElementById("dashboardDisplayEmail").textContent = userEmail;
        document.getElementById("dashboardLoginBtn").style.display = "none";
        document.getElementById("dashboardRegisterBtn").style.display = "none";
        if (signUpWandButton) {
            signUpWandButton.style.display = "none";
        }
        document.getElementById("signOutBtn").style.display = "unset";
        
        const docRef = doc(db, "loyalty-members", userEmail);
        var docSnap = await getDoc(docRef);
        var x;
        
        if (docSnap.exists()) {
            x = docSnap.data();
            var referrer_full_name = docSnap.data().referrer_full_name;
            if (x["admin"]){
                document.getElementById("adminDashboardLink").style.display = "block";
                document.getElementById("clientDashboardLink").style.display = "none";
                admin = x["admin"];
            } else {
                console.log("non admin");
                if(window.location.href.includes("client")){
                    document.getElementById("referrerEmail").value = userEmail;
                    document.getElementById("referrerFullName").value = referrer_full_name;
                    console.log("referrer full name: " + referrer_full_name);
                }
                console.log("User Email " + userEmail);
                document.getElementById("adminDashboardLink").style.display = "none";
                document.getElementById("clientDashboardLink").style.display = "block";
                if(window.location.href.includes("admin")) {
                    window.location.href = "./"
                }
            }

            //TODO: Update client-view to referral-dashboard/form
            if (window.location.href.includes("client-view")) {
                populateReferralTable(db);
            }
            if (window.location.href.includes("admin-view")) {
                populateAdminTable(db);
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } else {
        console.log(window.location.href);
        if(window.location.href.includes("view")){
            window.location.href = "./";
        }
        document.getElementById("signOutBtn").style.display = "none";
        document.getElementById("dashboardLoginBtn").style.display = "unset";
        document.getElementById("dashboardRegisterBtn").style.display = "unset";
        document.getElementById("dashboardDisplayEmail").textContent = "";
        if (signUpWandButton) {
            signUpWandButton.style.display = "unset";
        }
        console.log("logged out");
    }
    if(window.location.href.includes("copy")){
        populateHomePageContents(db); //TODO: Current they have to log in to view the landing page. ACTION ITEM: YOU NEED TO RECONFIGURE FIREBASE RULES
    }
});

document.getElementById("myBtn").addEventListener("click", registerNewUserAccount);
function registerNewUserAccount() {
    var referrer_full_name = document.getElementById("fullNameRegister").value;
    var email = document.getElementById("usernameRegister").value;
    var password = document.getElementById("passwordRegister").value;
    var password2 = document.getElementById("passwordRegister2").value;
    var passwordFlag = false;
    var passRegexPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
    console.log("registering");
    console.log(passRegexPattern.test(password));
    if(password.length < 7 || !passRegexPattern.test(password)) {
        document.getElementById("passwordValidationError").style.color = "red";
        passwordFlag = false;
    } else {
        document.getElementById("passwordValidationError").style.color = "unset";
        passwordFlag = true;
    }

    if(passwordFlag) {
        if (password == password2) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
                addToCollectionData(referrer_full_name, email);
                // await sendEmailVerification(userCredential.user);
                // ...
                document.getElementById("closeRegisterModalBtn").click();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
            document.getElementById("passwordMismatchError").style.display = "none";
        } else {
            document.getElementById("passwordMismatchError").style.display = "block";
        }
    }
}

document.getElementById("loginBtn").addEventListener("click", signInUser);
function signInUser (){
    var email = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        document.getElementById("closeLoginModalBtn").click();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById("loginErrorMessage").style.display = "block";
    });
}

document.getElementById("signOutBtn").addEventListener("click", signOutUser);
function signOutUser(){
    signOut(auth).then(() => {
        document.getElementById("adminDashboardLink").style.display = "none";
        document.getElementById("clientDashboardLink").style.display = "none";
        window.location.href = "./";
    }).catch((error) => {
        window.location.href = "./";
    });   
}

document.getElementById("resetPasswordBtn").addEventListener("click", generateResetPasswordForm);
function generateResetPasswordForm() {
    document.getElementById("passwordLoginGroup").style.display = "none";
    document.getElementById("loginModalLabel").textContent = "Reset Password for WayFwd Loyalty Rewards";
    document.getElementById("loginBtn").style.display = "none"
    var resetPasswordBtn = document.getElementById("resetPasswordBtn");
    resetPasswordBtn.textContent = "Reset Password";
    document.getElementById("resetPasswordBtn").addEventListener("click", sendResetUserPasswordEmail);
}

function sendResetUserPasswordEmail(){
    var email = document.getElementById("usernameLogin").value;
    sendPasswordResetEmail(auth, email)
    .then(() => {
        document.getElementById("loginModalLabel").textContent = "Please check your email for a password reset email.";
        document.getElementById("resetPasswordBtn").style.display = "none";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}

//  █████╗ ██████╗ ██████╗     ██████╗  █████╗ ████████╗ █████╗ 
// ██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
// ███████║██║  ██║██║  ██║    ██║  ██║███████║   ██║   ███████║
// ██╔══██║██║  ██║██║  ██║    ██║  ██║██╔══██║   ██║   ██╔══██║
// ██║  ██║██████╔╝██████╔╝    ██████╔╝██║  ██║   ██║   ██║  ██║
// ╚═╝  ╚═╝╚═════╝ ╚═════╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
                              
async function addToCollectionData(referrer_full_name, referralEmail) {
    console.log("adding data");
    console.log(referrer_full_name);
    console.log(referralEmail);
    try {
        await setDoc(doc(db, "loyalty-members", referralEmail), {
            admin: false,
            referrer_full_name: referrer_full_name
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function updateNumberOfSessions(documentId, currentSessionValue){
    const numberOfSessionsRef = doc(db, "referrals", documentId);

    await updateDoc(numberOfSessionsRef, {
        numberOfSessions: currentSessionValue
    });
}


// ██╗     ██╗███████╗████████╗    ██████╗  ██████╗  ██████╗███████╗
// ██║     ██║██╔════╝╚══██╔══╝    ██╔══██╗██╔═══██╗██╔════╝██╔════╝
// ██║     ██║███████╗   ██║       ██║  ██║██║   ██║██║     ███████╗
// ██║     ██║╚════██║   ██║       ██║  ██║██║   ██║██║     ╚════██║
// ███████╗██║███████║   ██║       ██████╔╝╚██████╔╝╚██████╗███████║
// ╚══════╝╚═╝╚══════╝   ╚═╝       ╚═════╝  ╚═════╝  ╚═════╝╚══════╝
                                                                 
// const querySnapshot = await getDocs(collection(db, "referrals")); 
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id}`);
//         var docObject = doc.data();
//         console.log(docObject);
//         console.log(docObject.email);
// });

async function populateReferralTable(db) {
    const filterByReferrerRef = collection(db, "referrals");
    console.log("Referrals: " + userEmail);
    const q = query(filterByReferrerRef, where("referrer_email", "==", userEmail));
    const filterReferralsSnapshot = await getDocs(q);
    var count = 0;
    var totalCreditsEarned = 0;
    filterReferralsSnapshot.forEach((doc) => {
        console.log(count++ + ": " + doc.id, " => ", doc.data());
        var first_name = doc.data().name;
        var referral_email = doc.data().email;
        var referral_phone = doc.data().phonenumber;
        var numberOfSessions = doc.data().numberOfSessions; //TODO: Fill this in from the admin POV = must be done manually by the admin. 5 sessions x $5
        var earnedFromReferral = 10 * numberOfSessions;
        totalCreditsEarned += earnedFromReferral;
        var referralStatus = "";
        if(numberOfSessions > 0) { 
            referralStatus = `<div class="badge badge-success">Complete</div>`
        } else {
            referralStatus = `<div class="badge badge-warning">Incomplete</div>`
        }
        
        var rowTemplateHTML =   `<tr>
                                <td class="text-center">${earnedFromReferral}</td>
                                <td>
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left flex2">
                                                <div class="widget-heading">${first_name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="text-center flex2">
                                                <div class="widget-heading">
                                                    <a href="sms://${referral_phone},9792579942?body=Hey ${first_name}, I just referred you to my personal trainer, Joe, I%27ve added him in this group text!"><i class="fa fa-fw" aria-hidden="true" title="Send Text"></i></a>
                                                    <a href="tel:${referral_phone}">${referral_phone}</a>
                                                </div>
                                                <div class="widget-subheading opacity-7"><a href="mailto:${referral_email}?cc=joe@wayfwdfitness.com&subject=Personal%20Training%20Referral&body=Hi ${first_name}, I hope you%27re excited for training! I just referred you to my trainer, Joe, who is CC%27d in this email.">${referral_email}</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    ${referralStatus}
                                </td>
                            </tr>`
    document.getElementById("referralTable").innerHTML += (rowTemplateHTML);
    });
    document.getElementById("creditsEarnedValue").textContent = totalCreditsEarned;
}

//ADMIN
// const querySnapshot = await getDocs(collection(db, "referrals")); 
//     var count = 0;
//     querySnapshot.forEach((doc) => {
//         // console.log(`${doc.id}`);
//         var first_name = doc.data().name;
//         var referral_email = doc.data().email;
//         var referral_phone = doc.data().phonenumber;
        
// });
 document.addEventListener('click',function(e){
    var elementId = e.target.id;
    var rowNumber = elementId.substring(elementId.length - 1);
    // console.log("rowNumber: " + rowNumber);
    if (e.target.classList.contains('decreaseSessionButtons')) {
        decreaseSessionNumber(rowNumber);
    }
    if (e.target.classList.contains('increaseSessionButtons')) {
        increaseSessionNumber(rowNumber)
    }
});
function increaseSessionNumber(rowNumber){//TODO: Sync to FB
    var numberOfSessionsElement = document.getElementById("numberOfSessionsElement" + rowNumber);
    var previousSessionValue = numberOfSessionsElement.textContent;
    console.log(previousSessionValue++);
    numberOfSessionsElement.textContent = previousSessionValue;
    var documentId = numberOfSessionsElement.dataset.sessionnumber;
    console.log("doc.id: " + documentId);
    updateNumberOfSessions(documentId,previousSessionValue);
}
function decreaseSessionNumber(rowNumber){
    var numberOfSessionsElement = document.getElementById("numberOfSessionsElement" + rowNumber);
    var previousSessionValue = numberOfSessionsElement.textContent;
    console.log(previousSessionValue--);
    if (previousSessionValue >= 0) {
        numberOfSessionsElement.textContent = previousSessionValue;
        var documentId = numberOfSessionsElement.dataset.sessionnumber;
        console.log("doc.id: " + documentId);
        updateNumberOfSessions(documentId,previousSessionValue);
    }
}


async function populateAdminTable(db) {
    const filterByReferrerRef = collection(db, "referrals");
    // const q = query(filterByReferrerRef, where("referrer", "==", userEmail));
    const filterReferralsSnapshot = await getDocs(filterByReferrerRef);
    var count = 0;
    filterReferralsSnapshot.forEach((doc) => {
        console.log(count++ + ": " + doc.id, " => ", doc.data());
        var first_name = doc.data().name;
        var referral_email = doc.data().email;
        var referral_phone = doc.data().phonenumber;
        var referrer_email = doc.data().referrer_email;
        var referrer_full_name = doc.data().referrer_full_name;
        var numberOfSessions = doc.data().numberOfSessions; //TODO: Fill this in from the admin POV = must be done manually by the admin. 5 sessions x $5
        //on ADMIN page use a setinterval or something to wait until buttons appear.
        var referralStatus =    `
        <div class="widget-content p-0">
            <div class="widget-content-wrapper">
                <div class="widget-content-left flex2">
                    <div class="widget-heading">
                        <button class="mr-1 btn-transition btn btn-outline-primary decreaseSessionButtons" id="decreaseSessionButton${count}">-</button>
                        <span data-sessionnumber="${doc.id}" id="numberOfSessionsElement${count}">${numberOfSessions}</span>
                        <button class="ml-1 btn-transition btn btn-outline-primary increaseSessionButtons" id="increaseSessionButton${count}">+</button>
                    </div>
                    <div class="widget-subheading opacity-7" style="visibility: hidden;height:0px">PLACEHOLDER</div>
                </div>
            </div>
        </div>
        `;
        var rowTemplateHTML =   `<tr>
                                <td class="text-center">${count}</td>
                                <td>
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left flex2">
                                                <div class="widget-heading">${first_name}</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="text-center flex2">
                                                <div class="widget-heading">
                                                    <a href="tel:${referral_phone}"><i class="fa fa-fw" aria-hidden="true" title="Call Phone"></i></a>
                                                    <a href="tel:${referral_phone}">${referral_phone}</a>
                                                </div>
                                                <div class="widget-subheading opacity-7"><a href="mailto:${referral_email}">${referral_email}</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    ${referralStatus}
                                </td>
                                <td>
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="text-center flex2">
                                                <div class="widget-heading">${referrer_full_name}</div>
                                                <div class="widget-subheading opacity-7"><a href="mailto:${referrer_email}">${referrer_email}</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>`
    document.getElementById("referralTable").innerHTML += (rowTemplateHTML);    
    });
}


async function populateHomePageContents(){
    // var subdomain = window.location.hostname; //TODO: When expanding use this to find correct URL for each business
    // console.log(subdomain);
    const filterBySiteRef = collection(db, "wayfwd-settings");
    const filterSettingsSnapshot = await getDocs(filterBySiteRef);

    filterSettingsSnapshot.forEach((doc) => {
        var dataset = doc.data();
        var keys = Object.keys(doc.data());        

        //PerkSection
        var perksContent = dataset["Perks"];
        populatePerksSection(perksContent);

        //FAQSection
        var FAQContent = dataset["FAQ"];
        populateFAQSection(FAQContent);
        // for (var i = 0 ; i < keys.length ; i++) {
        //     cardTitleContent = dataset[keys[i]][`${keys[i]}Title`];
        //     cardSubtitleContent = dataset[keys[i]][`${keys[i]}Subtitle`];
        //     cardBodyContent = dataset[keys[i]][`${keys[i]}Body`];
            
        //     if (admin) {
        //         editContentsBtnTemplate = `
        //         <button type="button" class="btn-shadow p-1 btn btn-primary btn-sm" data-toggle="modal" data-target="#${keys[i]}EditModal">
        //             <i class="pe-7s-note"> </i>
        //             <span class="mr-1">Edit</span>
        //         </button>`;

        //         var editModalTemplate = `
        //         <div class="modal fade" id="${keys[i]}EditModal" tabindex="-1" role="dialog" aria-labelledby="${keys[i]}EditModalLabel" aria-hidden="true">
        //             <div class="modal-dialog" role="document">
        //                 <div class="modal-content">
        //                     <div class="modal-header">
        //                         <h5 class="modal-title" id="${keys[i]}EditModalLabel">Editing <strong>${cardTitleContent}</strong> Contents</h5>
        //                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                             <span aria-hidden="true">&times;</span>
        //                         </button>
        //                     </div>
        //                     <div class="modal-body" id="${keys[i]}EditModalBody">
        //                         <div class="input-group">
        //                             <div class="input-group-prepend"><span class="input-group-text" style="width: 85px; background: #e0fff2;">Title</span></div>
        //                             <input placeholder="${cardTitleContent}" value="${cardTitleContent}" id="${keys[i]}TitleEdit" type="text" class="form-control">
        //                         </div>
        //                         <div class="input-group">
        //                             <div class="input-group-prepend"><span class="input-group-text" style="width: 85px; background: #e0fff2;">Subtitle</span></div>
        //                             <input placeholder="${cardSubtitleContent}" value="${cardSubtitleContent}" id="${keys[i]}SubtitleEdit" type="text" class="form-control">
        //                         </div>
        //                         <div class="input-group">
        //                             <div class="input-group-prepend"><span class="input-group-text" style="width: 85px; background: #e0fff2;">Body</span></div>
        //                             <input placeholder="${cardBodyContent}" value="${cardBodyContent}" id="${keys[i]}BodyEdit" type="text" class="form-control">
        //                         </div>
        //                     </div>
        //                     <div class="modal-footer">
        //                         <button id="closeEditPerk${keys[i]}Btn" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        //                         <button id="saveEditPerk${keys[i]}Btn" data-card="${keys[i]}" type="button" class="btn btn-primary">Save</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>`
        //         document.getElementById("allModalsGroup").innerHTML += editModalTemplate;
        //         //TODO: Refresh on Save? This may cause of reads
        //         //Reduce the write amount
        //     }
        //     var cardTemplate = `<div class="col-md-4">
        //                             <div class="main-card mb-3 card">
        //                                 <div class="card-body">
        //                                     <h5 id="${keys[i]}TitleContent" class="card-title">${cardTitleContent}</h5>
        //                                     <h6 id="${keys[i]}Subtitle" class="card-subtitle">${cardSubtitleContent}</h6>
        //                                     <p id="${keys[i]}Body">${cardBodyContent}</p>
        //                                     ${editContentsBtnTemplate}
        //                                 </div>
        //                             </div>
        //                         </div>`
        //     document.getElementById("cardContentsRow").innerHTML += cardTemplate;
        // }
    })
}

function populatePerksSection(perksContent) {
    var cardKeys = Object.keys(perksContent);
    var cardContentsRow = document.getElementById("cardContentsRow");
    for (var cardCount = 0 ; cardCount < cardKeys.length ; cardCount++) {
        console.log(cardKeys[cardCount]);
        var currentCard = cardKeys[cardCount];
        var cardTitleContent = perksContent[currentCard][`${currentCard}Title`];
        var cardSubtitleContent = perksContent[currentCard][`${currentCard}Subtitle`];
        var cardBodyContent = perksContent[currentCard][`${currentCard}Body`];
        var editContentsBtnTemplate = "";

        if (admin) {
            editContentsBtnTemplate = `
            <button type="button" class="btn-shadow p-1 btn btn-primary btn-sm" data-toggle="modal" data-target="#${currentCard}EditModal">
                <i class="pe-7s-note"> </i>
                <span class="mr-1">Edit</span>
            </button>`;

            var editModalTemplate = `
            <div class="modal fade" id="${currentCard}EditModal" tabindex="-1" role="dialog" aria-labelledby="${currentCard}EditModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="${currentCard}EditModalLabel">Editing <strong>${cardTitleContent}</strong> Contents</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="${currentCard}EditModalBody">
                            <div class="input-group">
                                <div class="input-group-prepend"><span class="input-group-text" style="width: 85px; background: #e0fff2;">Title</span></div>
                                <input placeholder="${cardTitleContent}" value="${cardTitleContent}" id="${currentCard}TitleEdit" type="text" class="form-control">
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend"><span class="input-group-text" style="width: 85px; background: #e0fff2;">Subtitle</span></div>
                                <input placeholder="${cardSubtitleContent}" value="${cardSubtitleContent}" id="${currentCard}SubtitleEdit" type="text" class="form-control">
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend"><span class="input-group-text" style="width: 85px; background: #e0fff2;">Body</span></div>
                                <input placeholder="${cardBodyContent}" value="${cardBodyContent}" id="${currentCard}BodyEdit" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button id="closeEditPerk${currentCard}Btn" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button id="saveEditPerk${currentCard}Btn" data-card="${currentCard}" type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>`
            document.getElementById("allModalsGroup").innerHTML += editModalTemplate;
            //TODO: Refresh on Save? This may cause of reads
            //Reduce the write amount
        }
        var cardTemplate = `<div class="col-md-4">
                                <div class="main-card mb-3 card">
                                    <div class="card-body">
                                        <h5 id="${currentCard}TitleContent" class="card-title">${cardTitleContent}</h5>
                                        <h6 id="${currentCard}Subtitle" class="card-subtitle">${cardSubtitleContent}</h6>
                                        <p id="${currentCard}Body">${cardBodyContent}</p>
                                        ${editContentsBtnTemplate}
                                    </div>
                                </div>
                            </div>`
        cardContentsRow.innerHTML += cardTemplate;
    }
}

function populateFAQSection(FAQContent) {
    var qCount = 0;
    var FAQNumKeys = Object.keys(FAQContent);
    var FAQID = document.getElementById("accordion");
    
    for (qCount = 0 ; qCount < FAQNumKeys.length ; qCount++) {
        var question = FAQContent[FAQNumKeys[qCount]]["Question"];
        var answer = FAQContent[FAQNumKeys[qCount]]["Answer"];
        var editBtn = "";
        if(admin) {
            editBtn = `
            <button type="button" class="btn-shadow p-1 btn btn-primary btn-sm" data-toggle="modal" data-target="#${FAQNumKeys[qCount]}EditModal">
                <i class="pe-7s-note"> </i>
            </button>
            `;
            var editModalTemplate = `
            <div class="modal fade" id="${FAQNumKeys[qCount]}EditModal" tabindex="-1" role="dialog" aria-labelledby="${FAQNumKeys[qCount]}EditModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Editing <strong>${question}</strong> Contents</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="input-group">
                                <div class="input-group-prepend"><span class="input-group-text" style="width: 85px; background: #e0fff2;">Question</span></div>
                                <input placeholder="${question}" value="${question}" id="${FAQNumKeys[qCount]}QuestionEdit" type="text" class="form-control">
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend"><span class="input-group-text" style="width: 85px; background: #e0fff2;">Answer</span></div>
                                <input placeholder="${answer}" value="${answer}" id="${FAQNumKeys[qCount]}AnswerEdit" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button id="closeEdit${FAQNumKeys[qCount]}Btn" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button id="saveEdit${FAQNumKeys[qCount]}Btn" data-qa-num="${FAQNumKeys[qCount]}" type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>`
        document.getElementById("allModalsGroup").innerHTML += editModalTemplate;
        }
        var FAQTemplate = `
            <div class="card">
                <div id="headingOne" class="card-header">
                    <button type="button" data-toggle="collapse" data-target="#collapseOne${qCount+1}" aria-expanded="true"  aria-controls="collapseOne" class="text-left m-0 p-0 btn btn-link btn-block">
                        <h5 class="m-0 p-0" id="${FAQNumKeys[qCount]}Question">${question}</h5>
                        ${editBtn}
                    </button>
                </div>
                <div data-parent="#accordion" id="collapseOne${qCount+1}" aria-labelledby="headingOne" class="collapse show">
                    <div class="card-body" id="${FAQNumKeys[qCount]}Answer">${answer}</div>
                </div>
            </div>`;
        FAQID.innerHTML += FAQTemplate;
    }
}

document.addEventListener('click',function(e){
    if(e.target && e.target.id.includes(`saveEditPerk`)){
        let cardName = e.target.dataset.card;
        saveEditPerkModal(cardName);
    }
});

async function saveEditPerkModal(cardName) {
    var titleContents = document.getElementById(`${cardName}TitleEdit`).value;
    var subtitleContents = document.getElementById(`${cardName}SubtitleEdit`).value;
    var bodyContents = document.getElementById(`${cardName}BodyEdit`).value;
    
    const homepagePerkRef = doc(db, "wayfwd-settings", "homepage");

    var updateCardContentsObj = {
        [`Perks.${cardName}`] : {
            [`${cardName}Title`]: titleContents,
            [`${cardName}Subtitle`]: subtitleContents,
            [`${cardName}Body`]: bodyContents
        }
    }
    await updateDoc(homepagePerkRef, updateCardContentsObj);
}


document.addEventListener('click',function(e){
    if(e.target && e.target.id.includes(`saveEditQA`)){
        let currentQNum = e.target.dataset.qaNum;
        saveEditFAQModal(currentQNum);
    }
});

async function saveEditFAQModal(currentQNum) {
    var question = document.getElementById(`${currentQNum}QuestionEdit`).value;
    var answer = document.getElementById(`${currentQNum}AnswerEdit`).value;    
    
    const homepageFAQRef = doc(db, "wayfwd-settings", "homepage");

    var updateFAQContentsObj = {
        [`FAQ.${currentQNum}`]: {
            Question: question,
            Answer: answer,
        }
    }
    await updateDoc(homepageFAQRef, updateFAQContentsObj);
}