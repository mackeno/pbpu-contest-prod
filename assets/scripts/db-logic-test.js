// ██████╗ ██╗   ██╗██╗     ███████╗███████╗       ██╗       ████████╗██╗██████╗ ███████╗
// ██╔══██╗██║   ██║██║     ██╔════╝██╔════╝       ██║       ╚══██╔══╝██║██╔══██╗██╔════╝
// ██████╔╝██║   ██║██║     █████╗  ███████╗    ████████╗       ██║   ██║██████╔╝███████╗
// ██╔══██╗██║   ██║██║     ██╔══╝  ╚════██║    ██╔═██╔═╝       ██║   ██║██╔═══╝ ╚════██║
// ██║  ██║╚██████╔╝███████╗███████╗███████║    ██████║         ██║   ██║██║     ███████║
// ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝    ╚═════╝         ╚═╝   ╚═╝╚═╝     ╚══════╝
// functions use lower camel case + describe the action => Scenario + Example: Creating user with email and password => function createUserWithEmailAndPassword 
// variables use lower camel case + describe what it stores => 
// global variables will use hyphenation
// HTML IDs will use lower case + hyphenation + "id" + describe the element => Example: ID="register-email-input-id"
// classes will user lower case + hyphenation + "id"  

// Naming Conventions
/*
Database Objects => Ex. variableName_DB; // Always append with "_DB" if it is referring to the database
Global Variables => Ex. gVariableName //prepend with a "g". g stands for global
If it is a constant used captials -> Ex. let MAX = 10 //MAX is always going to be 10 and should not be changed, therefore denote it with captials
*/

// ██╗  ██╗███████╗ █████╗ ██████╗ ██╗███╗   ██╗ ██████╗        ██████╗ ███████╗███████╗ █████╗ ██╗   ██╗██╗  ████████╗
// ██║  ██║██╔════╝██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ ██╗    ██╔══██╗██╔════╝██╔════╝██╔══██╗██║   ██║██║  ╚══██╔══╝
// ███████║█████╗  ███████║██║  ██║██║██╔██╗ ██║██║  ███╗╚═╝    ██║  ██║█████╗  █████╗  ███████║██║   ██║██║     ██║   
// ██╔══██║██╔══╝  ██╔══██║██║  ██║██║██║╚██╗██║██║   ██║██╗    ██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║   ██║██║     ██║   
// ██║  ██║███████╗██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝╚═╝    ██████╔╝███████╗██║     ██║  ██║╚██████╔╝███████╗██║   
// ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝        ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   

// ░█▀▀░█░█░█▀▄░█░█░█▀▀░█▀█░█▀▄░▀█▀░█▀█░█▀▀░░░░░░░█▀█░█▀█░█▀▀░█▀▀░█▀█
// ░▀▀█░█░█░█▀▄░█▀█░█▀▀░█▀█░█░█░░█░░█░█░█░█░░▀░░░░█▀▀░█▀█░█░█░█░█░█▀█
// ░▀▀▀░▀▀▀░▀▀░░▀░▀░▀▀▀░▀░▀░▀▀░░▀▀▀░▀░▀░▀▀▀░░▀░░░░▀░░░▀░▀░▀▀▀░▀▀▀░▀░▀


// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
    getAnalytics
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    setDoc,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    updateDoc,
    FieldValue,
    deleteField
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

// ██████╗ ███████╗██╗   ██╗    ████████╗███████╗███████╗████████╗██╗███╗   ██╗ ██████╗     ██████╗ ██████╗ 
// ██╔══██╗██╔════╝██║   ██║    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██║████╗  ██║██╔════╝     ██╔══██╗██╔══██╗
// ██║  ██║█████╗  ██║   ██║       ██║   █████╗  ███████╗   ██║   ██║██╔██╗ ██║██║  ███╗    ██║  ██║██████╔╝
// ██║  ██║██╔══╝  ╚██╗ ██╔╝       ██║   ██╔══╝  ╚════██║   ██║   ██║██║╚██╗██║██║   ██║    ██║  ██║██╔══██╗
// ██████╔╝███████╗ ╚████╔╝        ██║   ███████╗███████║   ██║   ██║██║ ╚████║╚██████╔╝    ██████╔╝██████╔╝
// ╚═════╝ ╚══════╝  ╚═══╝         ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═════╝ ╚═════╝ 
// const firebaseConfig = {
//     apiKey: "AIzaSyA7ZbnPBOQdoF7vKvOTuhLWWROmoQ8pTsI",
//     authDomain: "pointsupply-dev.firebaseapp.com",
//     projectId: "pointsupply-dev",
//     storageBucket: "pointsupply-dev.appspot.com",
//     messagingSenderId: "288815105119",
//     appId: "1:288815105119:web:47373b3bd31be27fde07ea"
// };


// ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗    ██████╗ ██████╗ 
// ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║    ██╔══██╗██╔══██╗
// ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██╔██╗ ██║    ██║  ██║██████╔╝
// ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║   ██║██║   ██║██║╚██╗██║    ██║  ██║██╔══██╗
// ██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║    ██████╔╝██████╔╝
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═════╝ ╚═════╝                                                                                                   
const firebaseConfig = {
    apiKey: "AIzaSyCl8hk14ZDEsv68v-BBumHhFlNyXFYpYqM",
    authDomain: "plantbasedpowerup-5d74d.firebaseapp.com",
    projectId: "plantbasedpowerup-5d74d",
    storageBucket: "plantbasedpowerup-5d74d.appspot.com",
    messagingSenderId: "524055807424",
    appId: "1:524055807424:web:0121d4e63d5d47d7b73425"
};
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
var gUserEmail;
var gAdmin;
var gGoalThresholds;
onAuthStateChanged(auth, async user => {
    var signUpWandButton = document.getElementById("signUpWandButton");
    if (user != null) {
        // The user object has basic properties such as display name, email, etc.
        gUserEmail = user.email;
        const emailVerified = user.emailVerified;
        document.getElementById("dashboardDisplayEmail").textContent = gUserEmail;
        document.getElementById("dashboardLoginBtn").style.display = "none";
        document.getElementById("dashboardRegisterBtn").style.display = "none";
        if (signUpWandButton) {
            signUpWandButton.style.display = "none";
        }
        document.getElementById("signOutBtn").style.display = "unset";

        const docRef = doc(db, "loyalty-members", gUserEmail);
        var docSnap = await getDoc(docRef);
        gGoalThresholds = docSnap.data()["goals"];

        var loyaltyMemberData;
        if (docSnap.exists()) {
            loyaltyMemberData = docSnap.data();
            var referrer_full_name = docSnap.data().referrer_full_name;
            if (loyaltyMemberData["admin"]) {
                document.getElementById("adminDashboardLink").style.display = "block";
                document.getElementById("clientDashboardLink").style.display = "none";
                gAdmin = loyaltyMemberData["admin"];
            } else {
                if (window.location.href.includes("client")) {
                    document.getElementById("referrerEmail").value = gUserEmail;
                    document.getElementById("referrerFullName").value = referrer_full_name;
                    console.log("referrer full name: " + referrer_full_name);
                }
                document.getElementById("adminDashboardLink").style.display = "none";
                // document.getElementById("clientDashboardLink").style.display = "block";
                if (window.location.href.includes("admin")) {
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
            if (window.location.href.includes("progress-tracker.html")) {
                populateUserProgressView();
                getUserPointsData();
                let milestones = docSnap.data()["milestones"];
                if (docSnap.data()["milestones"] != null) {
                    Object.keys(docSnap.data()["milestones"]).forEach(milestone => {
                        document.getElementById(`${milestone}Checkbox`).checked = milestones[milestone]["achieved"];
                    });
                }
                document.getElementById("proteinThresholdSettings").value = gGoalThresholds["protein"];
                document.getElementById("waterThresholdSettings").value = gGoalThresholds["water"];
                document.getElementById("fiberThresholdSettings").value = gGoalThresholds["fiber"];
                document.getElementById("stepsThresholdSettings").value = gGoalThresholds["steps"];
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such data!");
        }
    } else {
        console.log(window.location.href);
        if (window.location.href.includes("view")) {
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
    if (window.location.href.includes("copy")) {
        populateHomePageContents(db);
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
    referrer_full_name = referrer_full_name.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //Prevent HTML/JS Injection
    email = email.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //Prevent HTML/JS Injection
    password = password.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //Prevent HTML/JS Injection
    password2 = password2.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //Prevent HTML/JS Injection
    //console.log("full name injection test = " + referrer_full_name);  //TODO: Delete after Denny Reviews
    //console.log("email injection test = " + email);  //TODO: Delete after Denny Reviews
    //console.log("pw injection test = " + password);  //TODO: Delete after Denny Reviews
    //console.log("pw injection test = " + password2);  //TODO: Delete after Denny Reviews
    console.log("registering");
    console.log(passRegexPattern.test(password));
    if (password.length < 7 || !passRegexPattern.test(password)) {
        document.getElementById("passwordValidationError").style.color = "red";
        passwordFlag = false;
    } else {
        document.getElementById("passwordValidationError").style.color = "unset";
        passwordFlag = true;
    }

    if (passwordFlag) {
        if (password == password2) {
            createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    addToCollectionData(referrer_full_name, email.toLowerCase());
                    addToCollectionData2(email.toLowerCase());
                    // await sendEmailVerification(userCredential.user);
                    // ...
                    document.getElementById("closeRegisterModalBtn").click();

                    await setTimeout(() => {
                        (location.reload()) //comment for tests || uncomment for production
                    }, 1500);
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

function signInUser() {
    var email = document.getElementById("usernameLogin").value;
    var password = document.getElementById("passwordLogin").value;
    email = email.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //Prevent HTML/JS Injection
    password = password.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //Prevent HTML/JS Injection
    //console.log("Email injection test = " + email);  //TODO: Delete after Denny Reviews
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            document.getElementById("closeLoginModalBtn").click();
            location.reload();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("loginErrorMessage").style.display = "block";
        });
}

document.getElementById("signOutBtn").addEventListener("click", signOutUser);

function signOutUser() {
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
    document.getElementById("loginModalLabel").textContent = "Reset Password for plant-based power-up contest";
    document.getElementById("loginBtn").style.display = "none"
    var resetPasswordBtn = document.getElementById("resetPasswordBtn");
    resetPasswordBtn.textContent = "Reset Password";
    document.getElementById("resetPasswordBtn").addEventListener("click", sendResetUserPasswordEmail);
}

function sendResetUserPasswordEmail() {
    var email = document.getElementById("usernameLogin").value;
    email = email.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //Prevent HTML/JS Injection
    //console.log("Email injection test = " + email);  //TODO: Delete after Denny Reviews
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
    let thresholdSettingsObj = {
        ["goals"]: {
            exercise: 1,
            goals: 1,
            protein: 100,
            fiber: 30,
            water: 150,
            steps: 10000,
        }
    }
    let milestonesSettingsObj = {
        ["milestones"]: {
            milestone_7: {
                achieved: false
            },
            milestone_14: {
                achieved: false
            },
            milestone_28: {
                achieved: false
            },
            milestone_42: {
                achieved: false
            },
            milestone_66: {
                achieved: false
            },
            milestone_85: {
                achieved: false
            }
        }
    }
    try {
        await setDoc(doc(db, "loyalty-members", referralEmail), {
            admin: false,
            points: 0,
            referrer_full_name: referrer_full_name
        });
        await updateDoc(doc(db, "loyalty-members", gUserEmail), thresholdSettingsObj);
        await updateDoc(doc(db, "loyalty-members", gUserEmail), milestonesSettingsObj);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function addToCollectionData2(referralEmail) {    
    try {
        await setDoc(doc(db, "progress_tracker", referralEmail), {
            exercise: "",
            fiber: "",
            protein: "",
            water: "",
            steps: "",
            goals: ""
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    try {
        
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function updateNumberOfSessions(documentId, currentSessionValue) {
    const numberOfSessionsRef = doc(db, "referrals", documentId);

    await updateDoc(numberOfSessionsRef, {
        numberOfSessions: currentSessionValue
    });
}



// ██╗     ██╗███████╗████████╗    ██████╗  ██████╗  ██████╗███████╗ Place the name of functions here to help reference and an example of what calls it
// ██║     ██║██╔════╝╚══██╔══╝    ██╔══██╗██╔═══██╗██╔════╝██╔════╝ line 117: populateReferralTable()
// ██║     ██║███████╗   ██║       ██║  ██║██║   ██║██║     ███████╗
// ██║     ██║╚════██║   ██║       ██║  ██║██║   ██║██║     ╚════██║
// ███████╗██║███████║   ██║       ██████╔╝╚██████╔╝╚██████╗███████║
// ╚══════╝╚═╝╚══════╝   ╚═╝       ╚═════╝  ╚═════╝  ╚═════╝╚══════╝

async function populateReferralTable(db) {
    const filterByReferrerRef = collection(db, "referrals");
    console.log("Referrals: " + gUserEmail);
    const q = query(filterByReferrerRef, where("referrer_email", "==", gUserEmail));
    const filterReferralsSnapshot = await getDocs(q);
    var count = 0;
    var totalCreditsEarned = 0;
    filterReferralsSnapshot.forEach((doc) => {
        console.log(count++ + ": " + doc.id, " => ", doc.data());
        var first_name = doc.data().name;
        var referral_email = doc.data().email;
        var referral_phone = doc.data().phonenumber;
        var numberOfSessions = doc.data().numberOfSessions;
        var earnedFromReferral = 10 * numberOfSessions;
        totalCreditsEarned += earnedFromReferral;
        var referralStatus = "";
        if (numberOfSessions > 0) {
            referralStatus = `<div class="badge badge-success">Complete</div>`
        } else {
            referralStatus = `<div class="badge badge-warning">Incomplete</div>`
        }

        var rowTemplateHTML = `<tr>
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

document.addEventListener('click', function (e) {
    var elementId = e.target.id;
    var rowNumber = elementId.substring(elementId.length - 1);
    if (e.target.classList.contains('decreaseSessionButtons')) {
        decreaseSessionNumber(rowNumber);
    }
    if (e.target.classList.contains('increaseSessionButtons')) {
        increaseSessionNumber(rowNumber)
    }
});

function increaseSessionNumber(rowNumber) {
    var numberOfSessionsElement = document.getElementById("numberOfSessionsElement" + rowNumber);
    var currentSessionValue = numberOfSessionsElement.textContent;
    numberOfSessionsElement.textContent = currentSessionValue;
    var documentId = numberOfSessionsElement.dataset.sessionnumber;
    updateNumberOfSessions(documentId, currentSessionValue);
}

function decreaseSessionNumber(rowNumber) {
    var numberOfSessionsElement = document.getElementById("numberOfSessionsElement" + rowNumber);
    var currentSessionValue = numberOfSessionsElement.textContent;
    if (currentSessionValue >= 0) {
        numberOfSessionsElement.textContent = currentSessionValue;
        var documentId = numberOfSessionsElement.dataset.sessionnumber;
        console.log("doc.id: " + documentId);
        updateNumberOfSessions(documentId, currentSessionValue);
    }
}


// ██████╗  ██████╗ ██╗███╗   ██╗████████╗███████╗     █████╗  ██████╗ ██████╗██╗   ██╗██████╗  █████╗ ██╗     
// ██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝██╔════╝    ██╔══██╗██╔════╝██╔════╝██║   ██║██╔══██╗██╔══██╗██║     
// ██████╔╝██║   ██║██║██╔██╗ ██║   ██║   ███████╗    ███████║██║     ██║     ██║   ██║██████╔╝███████║██║     
// ██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║   ╚════██║    ██╔══██║██║     ██║     ██║   ██║██╔══██╗██╔══██║██║     
// ██║     ╚██████╔╝██║██║ ╚████║   ██║   ███████║    ██║  ██║╚██████╗╚██████╗╚██████╔╝██║  ██║██║  ██║███████╗
// ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝


async function getUserPointsData() {
    const pointsDataRef = doc(db, "loyalty-members", gUserEmail);
    const pointsData = await getDoc(pointsDataRef);
    document.getElementById("pointsBalanceId").textContent = pointsData.data()["points"];
    return pointsData.data()["points"];
}

async function updateUserPoints(updateByPoints) {
    //current points ✅
    //add x points to total
    //update db ✅
    const pointsDataRef = doc(db, "loyalty-members", gUserEmail);
    getUserPointsData().then(async (currentPoints) => {
        currentPoints += Math.round((updateByPoints) * 100) / 100;
        currentPoints = Math.round((currentPoints) * 100) / 100
        await updateDoc(pointsDataRef, {
            points: currentPoints
        });
        document.getElementById("pointsBalanceId").textContent = currentPoints;
    });

}


//Rewards Section

// ██████╗ ███████╗██╗    ██╗ █████╗ ██████╗ ██████╗ ███████╗    ███████╗███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝██║    ██║██╔══██╗██╔══██╗██╔══██╗██╔════╝    ██╔════╝██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ██████╔╝█████╗  ██║ █╗ ██║███████║██████╔╝██║  ██║███████╗    ███████╗█████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██╗██╔══╝  ██║███╗██║██╔══██║██╔══██╗██║  ██║╚════██║    ╚════██║██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║███████╗╚███╔███╔╝██║  ██║██║  ██║██████╔╝███████║    ███████║███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝    ╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

// ░█▀█░█▀█░▀█▀░█▀▀░░░█░█░░░█▀█░█░░░█▀▀░█░█ in the meantime to test the code I placed it in an if loop.
// ░█░█░█░█░░█░░█▀▀░░░░▀█░░░█▀█░█░░░█▀▀░▄▀▄ TODO: when you get the chance, move this into a function
// ░▀░▀░▀▀▀░░▀░░▀▀▀░░░░░▀░░░▀░▀░▀▀▀░▀▀▀░▀░▀
if (window.location.href.includes("rewards.html")) {
    const filterByRewardsRef = collection(db, "reward-test");
    const filterRewardsSnapshot = await getDocs(filterByRewardsRef);
    filterRewardsSnapshot.forEach((doc) => {
        var rewardPoints = doc.data().rewardPoints;
        document.getElementById("userRewardPoints").innerHTML = rewardPoints; //Displays User Reward Points on Header

        //If user has less than 50 reward points, gray out button
        if (doc.data().rewardPoints < 50) {
            document.getElementById("btnReward50").style.backgroundColor = "gray";
            document.getElementById("btnReward50").style.borderColor = "gray";
            document.getElementById("btnReward50").disabled = true;
        }

        //If user has less than 90 reward points, gray out button
        if (doc.data().rewardPoints < 90) {
            document.getElementById("btnReward90").style.backgroundColor = "gray";
            document.getElementById("btnReward90").style.borderColor = "gray";
            document.getElementById("btnReward90").disabled = true;

            // document.getElementById("btnReward90").addEventListener("click", disableBTN);    //TODO: Code to test reward button is inactive. Can delete once reviewed.
            // function disableBTN(){
            //     console.log("button active");
            // }; 
        }

        //If user has less than 130 reward points, gray out button
        if (doc.data().rewardPoints < 130) {
            document.getElementById("btnReward130").style.backgroundColor = "gray";
            document.getElementById("btnReward130").style.borderColor = "gray";
            document.getElementById("btnReward130").disabled = true;
        }

        document.getElementById("btnReward50").addEventListener("click", redeemReward);
        async function redeemReward() {
            // const userRewardPointsUpdate = doc(db, "reward-test", documentId);
            rewardPoints = rewardPoints - 50;
            // await updateDoc(filterByRewardsRef, {
            //     rewardPoints: rewardPoints
            // });
            console.log("deduct 50 reward points =" + rewardPoints);
        }
    });
}










if (window.location.href.includes("rewards")) {
    document.getElementById("testDisplayRewardBtn").addEventListener("click", populateRewards);
}
async function populateRewards() {
    const filterByRewardsRef = collection(db, "reward-test");
    const filterRewardsSnapshot = await getDocs(filterByRewardsRef);
    filterRewardsSnapshot.forEach((doc) => {
        var rewardPoints = doc.data().rewardPoints;
        console.log("Reward Points = " + rewardPoints);
        document.getElementById("userRewardPoints").innerHTML = rewardPoints;
    });
}





async function populateAdminTable(db) {
    const filterByReferrerRef = collection(db, "referrals");
    // const q = query(filterByReferrerRef, where("referrer", "==", gUserEmail));
    const filterReferralsSnapshot = await getDocs(filterByReferrerRef);
    var count = 0;
    filterReferralsSnapshot.forEach((doc) => {
        console.log(count++ + ": " + doc.id, " => ", doc.data());
        var first_name = doc.data().name;
        var referral_email = doc.data().email;
        var referral_phone = doc.data().phonenumber;
        var referrer_email = doc.data().referrer_email;
        var referrer_full_name = doc.data().referrer_full_name;
        var numberOfSessions = doc.data().numberOfSessions;

        var referralStatus = `
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
        var rowTemplateHTML = `<tr>
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


async function populateHomePageContents() {
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
    })
}

function populatePerksSection(perksContent) {
    var cardKeys = Object.keys(perksContent);
    var cardContentsRow = document.getElementById("cardContentsRow");
    for (var cardCount = 0; cardCount < cardKeys.length; cardCount++) {
        console.log(cardKeys[cardCount]);
        var currentCard = cardKeys[cardCount];
        var cardTitleContent = perksContent[currentCard][`${currentCard}Title`];
        var cardSubtitleContent = perksContent[currentCard][`${currentCard}Subtitle`];
        var cardBodyContent = perksContent[currentCard][`${currentCard}Body`];
        var editContentsBtnTemplate = "";

        if (gAdmin) {
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

    for (qCount = 0; qCount < FAQNumKeys.length; qCount++) {
        var question = FAQContent[FAQNumKeys[qCount]]["Question"];
        var answer = FAQContent[FAQNumKeys[qCount]]["Answer"];
        var editBtn = "";
        if (gAdmin) {
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

document.addEventListener('click', function (e) {
    if (e.target && e.target.id.includes(`saveEditPerk`)) {
        let cardName = e.target.dataset.card;
        saveEditPerkModal(cardName);
    }
    if (e.target && e.target.id.includes(`edit-tracker`)) {

        var selectCategoryEl = document.getElementById("selectTrackerCategoryId");
        selectCategoryEl.value = e.target.dataset["editCategory"];
        var forceOnChangeEvent = new Event("change");
        selectCategoryEl.dispatchEvent(forceOnChangeEvent);
        let inputCounter = 0;
        console.log(e.target.dataset["editRecordId"]);
        const trackerInputElements = document.querySelectorAll(`[id^="${e.target.dataset["editCategory"]}-"]`);
        Object.keys(e.target.dataset).filter(attr => attr.includes("editParams")).forEach(item => {
            trackerInputElements[inputCounter++].value = e.target.dataset[item];
            console.log(e.target.dataset[item]);
        })
        document.getElementById("trackHabitModal").dataset.recordId = e.target.dataset["editRecordId"];
    }
    if (e.target && e.target.id.includes(`quick-add`)) {
        var selectCategoryEl = document.getElementById("selectTrackerCategoryId");
        selectCategoryEl.value = e.target.dataset["quickAddCategory"];
        console.log(selectCategoryEl.value);
        var forceOnChangeEvent = new Event("change");
        selectCategoryEl.dispatchEvent(forceOnChangeEvent);
    }
});

async function saveEditPerkModal(cardName) {
    var titleContents = document.getElementById(`${cardName}TitleEdit`).value;
    var subtitleContents = document.getElementById(`${cardName}SubtitleEdit`).value;
    var bodyContents = document.getElementById(`${cardName}BodyEdit`).value;

    const homepagePerkRef = doc(db, "wayfwd-settings", "homepage");

    var updateCardContentsObj = {
        [`Perks.${cardName}`]: {
            [`${cardName}Title`]: titleContents,
            [`${cardName}Subtitle`]: subtitleContents,
            [`${cardName}Body`]: bodyContents
        }
    }
    await updateDoc(homepagePerkRef, updateCardContentsObj);
}


document.addEventListener('click', function (e) {
    if (e.target && e.target.id.includes(`saveEditQA`)) {
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



//  ██████╗ ██╗   ██╗██╗██████╗  Used to randomly generate an id.
// ██╔════╝ ██║   ██║██║██╔══██╗ This ID can be used for storing data 
// ██║  ███╗██║   ██║██║██║  ██║ such as a new row whenever a user 
// ██║   ██║██║   ██║██║██║  ██║ tracks their habit in the same day.
// ╚██████╔╝╚██████╔╝██║██████╔╝
//  ╚═════╝  ╚═════╝ ╚═╝╚═════╝ 

//generates random id;
let generateUID = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    return s4() + s4();
}


// ██████╗ ██████╗  ██████╗  ██████╗ ██████╗ ███████╗███████╗███████╗    ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
// ██╔══██╗██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗██╔════╝██╔════╝██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
// ██████╔╝██████╔╝██║   ██║██║  ███╗██████╔╝█████╗  ███████╗███████╗       ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
// ██╔═══╝ ██╔══██╗██║   ██║██║   ██║██╔══██╗██╔══╝  ╚════██║╚════██║       ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
// ██║     ██║  ██║╚██████╔╝╚██████╔╝██║  ██║███████╗███████║███████║       ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
// ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝                                                                                                      
let gTrackerCategoryData;
let gSelectTrackerCategoryEl;

async function addBase() {
    // var addObj = {
    //     "exercise": {
    //         "0": {
    //             "fieldPlaceholder": "input a date",
    //             "fieldName": "date",
    //             "fieldDataType": "date"
    //         },
    //         "1": {
    //             "fieldDataType": "time",
    //             "fieldName": "time",
    //             "fieldPlaceholder": "input a time"
    //         },
    //         "2": {
    //             "fieldDataType": "text",
    //             "fieldName": "duration",
    //             "fieldPlaceholder": "input duration"
    //         },
    //         "3": {
    //             "fieldDataType": "text",
    //             "fieldName": "notes",
    //             "fieldPlaceholder": "input notes"
    //         },
    //         "4": {
    //             "fieldDataType": "text",
    //             "fieldName": "type",
    //             "fieldPlaceholder": "what type of exercise did you do? (maintenance, strength, cardio)"
    //         },
    //         "5": {
    //             "fieldDataType": "number",
    //             "fieldName": "points",
    //             "fieldPlaceholder": "points"
    //         }
    //     }
    // }
    // var addObj = {
    //     "steps": {
    //         "0": {
    //             "fieldPlaceholder": "input a date",
    //             "fieldName": "date",
    //             "fieldDataType": "date"
    //         },
    //         "1": {
    //             "fieldDataType": "time",
    //             "fieldName": "time",
    //             "fieldPlaceholder": "input a time"
    //         },
    //         "2": {
    //             "fieldDataType": "number",
    //             "fieldName": "steps",
    //             "fieldPlaceholder": "how many steps did you take?"
    //         },
    //         "3": {
    //             "fieldDataType": "text",
    //             "fieldName": "notes",
    //             "fieldPlaceholder": "input notes"
    //         },
    //         "4": {
    //             "fieldDataType": "text",
    //             "fieldName": "imageURL",
    //             "fieldPlaceholder": "imageURL"
    //         },
    //         "5": {
    //             "fieldDataType": "number",
    //             "fieldName": "points",
    //             "fieldPlaceholder": "points"
    //         }
    //     }
    // }
    // var addObj = {
    //     "protein": {
    //         "0": {
    //             "fieldPlaceholder": "input a date",
    //             "fieldName": "date",
    //             "fieldDataType": "date"
    //         },
    //         "1": {
    //             "fieldDataType": "time",
    //             "fieldName": "time",
    //             "fieldPlaceholder": "input a time"
    //         },
    //         "2": {
    //             "fieldDataType": "number",
    //             "fieldName": "protein (g)",
    //             "fieldPlaceholder": "how much protein did you consume?"
    //         },
    //         "3": {
    //             "fieldDataType": "text",
    //             "fieldName": "notes",
    //             "fieldPlaceholder": "input notes"
    //         },
    //         "4": {
    //             "fieldDataType": "number",
    //             "fieldName": "points",
    //             "fieldPlaceholder": "points"
    //         }
    //     }
    // }
    // var addObj = {
    //     "goals": {
        //         "0": {
        //             "fieldPlaceholder": "input a date",
        //             "fieldName": "date",
        //             "fieldDataType": "date"
        //         },
        //         "1": {
        //             "fieldDataType": "text",
        //             "fieldName": "goal",
        //             "fieldPlaceholder": "what's your goal?"
        //         },
        //         "2": {
        //             "fieldDataType": "date",
        //             "fieldName": "deadline",
        //             "fieldPlaceholder": "the winning date"
        //         },
        //         "3": {
        //             "fieldDataType": "number",
        //             "fieldName": "points",
        //             "fieldPlaceholder": "points"
        //         }
        //     }
    // }
    await updateDoc(doc(db, "settings", "ProgressTracker"), addObj);
}
// addBase();

// ░█▀▀░█▀▀░▀█▀░░░█▀█░█▀▄░█▀█░█▀▀░█▀▄░█▀▀░█▀▀░█▀▀░░░▀█▀░█▀▄░█▀█░█▀▀░█░█░█▀▀░█▀▄░░░█▀▄░█▀█░▀█▀░█▀█
// ░█░█░█▀▀░░█░░░░█▀▀░█▀▄░█░█░█░█░█▀▄░█▀▀░▀▀█░▀▀█░░░░█░░█▀▄░█▀█░█░░░█▀▄░█▀▀░█▀▄░░░█░█░█▀█░░█░░█▀█
// ░▀▀▀░▀▀▀░░▀░░░░▀░░░▀░▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░░░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀▀░▀░▀░░░▀▀░░▀░▀░░▀░░▀░▀

if (window.location.href.includes("progress-tracker")) {
    const habitTrackerModalEl = document.getElementById("habitTrackerBtnId");
    habitTrackerModalEl.addEventListener("click", (e) => {
        document.getElementById("trackHabitModal").dataset.recordId = "";
    })
}
getTrackerCategoryData();
async function getTrackerCategoryData() { //Potentially the select button could be disabled until data has loaded
    //TODO: compile with larger function, this doesn't need to be a function if used once.
    const trackerCategoryRef = doc(db, "settings", "ProgressTracker");
    gTrackerCategoryData = await getDoc(trackerCategoryRef);
}

//#region get progress tracker settings
if (window.location.href.includes("progress-tracker")) {
    document.getElementById("saveProgressId").addEventListener("click", getProgressTrackerValues);
    document.getElementById("search-date-input").value = getDateToday();
    document.getElementById("search-record-btn").addEventListener("click", populateUserProgressView);

    document.getElementById("modal-search-date-input").value = document.getElementById("search-date-input").value;
    document.getElementById("modal-search-record-btn").addEventListener("click", () => {
        let tableCategory = document.getElementById("quick-add-view-all-modal").dataset.quickAddCategory;
        populateUserProgressTrackerModal(tableCategory, document.getElementById("modal-search-date-input").value)
    });
}

function getProgressTrackerValues() {
    //both add progress and edit progress tracker use the same function. To determine whether something needs to be updated the recordId will be created on the modal data-attribute "recordId". if it's empty that means it's a new record. ex. if (recordId == "") {new record}
    document.getElementById("saveProgressId").disabled = true;
    let pointsMultiplier = 0.1;
    let pointsIncrement = 0;
    
    let recordId = document.getElementById("trackHabitModal").dataset.recordId;
    const categorySelected = gSelectTrackerCategoryEl.value;
    const trackerInputElements = document.querySelectorAll(`[id^="${categorySelected}-"]`);
    let trackerInnerObj = {};
    let currentDate = "";
    let previousDate = "";
    let currentProtein = 0, currentFiber = 0, currentWater = 0, currentSteps = 0, currentPoints;
    
    trackerInputElements.forEach((inputEl) => {
        let trackerInputName = inputEl.name;
        let trackerInputValue = inputEl.value;
        if (inputEl.name.includes("protein")) {
            currentProtein = inputEl.value;
        }
        if (inputEl.name.includes("fiber")) {
            currentFiber = inputEl.value;
        }
        if (inputEl.name.includes("water")) {
            currentWater = inputEl.value;
        }
        if (inputEl.name.includes("steps")) {
            currentSteps = inputEl.value;
        }
        if (inputEl.name.includes("points")) {
            currentPoints = inputEl.value;
            trackerInputValue = Number(inputEl.value);
            if (previousDate != currentDate) {
                console.log(Number(currentPoints));
                deleteHabitRecordDoc(categorySelected, recordId, Number(currentPoints));
                recordId = "";
            }
        }
        if (recordId != "") {
            if (inputEl.name.includes("date")) {
                previousDate = recordId.substring(0, 10);
                currentDate = inputEl.value;
            }
        }
        trackerInnerObj[trackerInputName] = trackerInputValue;
    });
    const date = trackerInputElements[0].value;
    // if they are perfect, this condition works but if they are over it needs to drop it back down into the points that has been left over.
    // edge cases
    /*
    1. if someone adds 12000 steps it sohuld only award 100 pts
    a. get the cumulative value of their progress via points and then subtract from the remaining max
    2. if someone adds 9000 and then adds 2000 it should deduct from the remaining and total up to the 100pts
    */
    if (date != "") {
        document.getElementById("trackerMissingDateId").style.display = "none";
        switch (categorySelected) {
            case "protein":
                if (recordId == "") {
                    pointsIncrement = Math.round(currentProtein * pointsMultiplier * 100)/100;
                    trackerInnerObj["points"] = Number(pointsIncrement);
                } else {
                    let previousValue = trackerInnerObj["points"];
                    let newValue = Math.round(currentProtein * pointsMultiplier * 100) / 100;
                    trackerInnerObj["points"] = Number(newValue);
                    pointsIncrement = Math.round((newValue - previousValue) * 100) / 100;
                }   
                break;
            case "fiber":
                if (recordId == "") {
                    pointsIncrement = Math.round(currentFiber * pointsMultiplier * 100)/100;
                    trackerInnerObj["points"] = Number(pointsIncrement);
                } else {
                    let previousValue = trackerInnerObj["points"];
                    let newValue = Math.round(currentFiber * pointsMultiplier * 100)/100;
                    trackerInnerObj["points"] = Number(newValue);
                    pointsIncrement = Math.round((newValue - previousValue) * 100) / 100;
                } 
                break;
            case "exercise":
                if(Object.keys(gTableCells[categorySelected]).filter(row => row.includes(date)).length > 0 && Object.keys(gTableCells[categorySelected]).filter(row => row.includes(date)).length != null) {
                    if(trackerInnerObj["points"] == 15) { 
                        pointsIncrement = 15;    
                    } else {
                        pointsIncrement = 0;    
                    }
                    trackerInnerObj["points"] = Number(pointsIncrement);
                } else {
                    pointsIncrement = 15;    
                    trackerInnerObj["points"] = Number(pointsIncrement);
                }
                break;
            case "water":
                if (recordId == "") {
                    pointsIncrement = Math.round(currentWater * pointsMultiplier * 100)/100;
                    trackerInnerObj["points"] = Number(pointsIncrement);
                } else {
                    let previousValue = trackerInnerObj["points"];
                    let newValue = Math.round(currentWater * pointsMultiplier * 100)/100;
                    trackerInnerObj["points"] = Number(newValue);
                    pointsIncrement = Math.round((newValue - previousValue) * 100)/100;
                } 
                break;
            case "goals":
                pointsIncrement = 0;
                break;
            case "steps":
                pointsMultiplier = 0.01;
                if (trackerInnerObj["imageURL"] != "") {
                    if (recordId == "") {
                        pointsIncrement = Math.round(currentSteps * pointsMultiplier * 100)/100;
                        trackerInnerObj["points"] = Number(pointsIncrement);
                    } else {
                        let previousValue = trackerInnerObj["points"];
                        let newValue = Math.round(currentSteps * pointsMultiplier * 100)/100;
                        trackerInnerObj["points"] = Number(newValue);
                        pointsIncrement = Math.round((newValue - previousValue) * 100) / 100;
                    }   
                } else {
                    pointsIncrement = 0;
                    trackerInnerObj["points"] = Number(pointsIncrement);
                }
                break;
            default:
                pointsIncrement = 0;
        }
        let previousQuota = Number(Math.round(getDailyQuota(categorySelected, date)[0] * pointsMultiplier));
        let maxQuota = gMaxPoints[categorySelected];
        console.log(`previousQuota: ${previousQuota}`);
        console.log(`maxQuota: ${maxQuota}`);
        console.log(`currentPoints: ${trackerInnerObj["points"]}`);
        console.log(maxQuota - (previousQuota + trackerInnerObj["points"]));
        if ((maxQuota - (previousQuota + trackerInnerObj["points"])) < 0) {
            console.log(maxQuota - previousQuota);
            /*
            if previousQuota = 0 then set pointsIncrement to max
            if previousQuota > 0 then set max - previous
            */
            if ((previousQuota == 0) && (trackerInnerObj["points"] > maxQuota)) {
                pointsIncrement = maxQuota;
                trackerInnerObj["points"] = pointsIncrement;
            } else if (previousQuota == maxQuota) {
                pointsIncrement = 0;
                trackerInnerObj["points"] = pointsIncrement;
            } else {
                pointsIncrement = maxQuota - previousQuota;
                trackerInnerObj["points"] = pointsIncrement;
            } 
        }
        updateProgressTrackerInstance(recordId, categorySelected, date, trackerInnerObj, Math.round((pointsIncrement) * 100) / 100)
    } else {
        document.getElementById("trackerMissingDateId").style.display = "block";
    }
}
//#endregion
//#region get a user's progress tracker data via email.
//most likely to reuse this for both client side + admin so.

async function getUserProgressData() {
    //TODO: Parameter for limit by 10? and then if undefined -> Max? Technically it needs to paginate anyways. Best to perform sorting here.
    const userProgressDataRef = doc(db, "progress_tracker", gUserEmail);
    const userProgressData = await getDoc(userProgressDataRef);
    return userProgressData.data();
}

//#endregion

// ░█▀█░█▀█░█▀█░█░█░█░░░█▀█░▀█▀░█▀▀░░░█░█░█▀█░█▀▄░▀█▀░▀█▀░░░█▀▄░█▀█░▀█▀░█▀█
// ░█▀▀░█░█░█▀▀░█░█░█░░░█▀█░░█░░█▀▀░░░█▀█░█▀█░█▀▄░░█░░░█░░░░█░█░█▀█░░█░░█▀█
// ░▀░░░▀▀▀░▀░░░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀░░░▀░▀░▀░▀░▀▀░░▀▀▀░░▀░░░░▀▀░░▀░▀░░▀░░▀░▀
//#region populate Progress Tracker Modal
if (window.location.href.includes("progress-tracker")) {
    gSelectTrackerCategoryEl = document.getElementById("selectTrackerCategoryId");
    gSelectTrackerCategoryEl.addEventListener("change", (e) => {
        populateHabitTrackerModal(gSelectTrackerCategoryEl.value);
    })
}

function getDateToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function populateHabitTrackerModal(categorySelected) {
    const today = document.getElementById("search-date-input").value;
    let dateInjectorValue = "";
    let selectedCategoryData = gTrackerCategoryData.data()[categorySelected];
    document.getElementById("habitTrackerInputGroups").innerHTML = "";
    let inputTemplate = "";
    for (var field in selectedCategoryData) {
        let dateTemplate = "";
        if (selectedCategoryData[field]["fieldName"] == "date") {
            dateInjectorValue = today;
            dateTemplate = `max="${today}" min="2022-12-01"`;
        }
        if (selectedCategoryData[field]["fieldName"] == "points") {
            inputTemplate = `
            <div class="input-group" id="${categorySelected}${selectedCategoryData[field]["fieldName"]}Group" style="display:none">
                <div class="input-group-prepend">
                    <span class="input-group-text"style="width: 85px; background: #e0fff2;">${selectedCategoryData[field]["fieldName"]}</span>
                </div>
                <input placeholder="${selectedCategoryData[field]["fieldPlaceholder"]}" name="${selectedCategoryData[field]["fieldName"]}" id="${categorySelected}-${selectedCategoryData[field]["fieldName"]}Id" type="${selectedCategoryData[field]["fieldDataType"]}" class="form-control" ${dateTemplate} value="${dateInjectorValue}">
            </div>`;
        } else {   
            inputTemplate = `
            <div class="input-group" id="${categorySelected}${selectedCategoryData[field]["fieldName"]}Group">
                <div class="input-group-prepend">
                    <span class="input-group-text"style="width: 85px; background: #e0fff2;">${selectedCategoryData[field]["fieldName"]}</span>
                </div>
                <input placeholder="${selectedCategoryData[field]["fieldPlaceholder"]}" name="${selectedCategoryData[field]["fieldName"]}" id="${categorySelected}-${selectedCategoryData[field]["fieldName"]}Id" type="${selectedCategoryData[field]["fieldDataType"]}" class="form-control" ${dateTemplate} value="${dateInjectorValue}">
            </div>`;
        }
        document.getElementById("habitTrackerInputGroups").innerHTML += inputTemplate;
        dateInjectorValue = "";
    }
    if(categorySelected == "steps") {
        document.getElementById("stepsimageURLGroup").style.display = "none"; 
        document.getElementById("photoUploadBtn").style.display = "unset"; 
    } else {
        document.getElementById("photoUploadBtn").style.display = "none"; 
    }
}
//#endregion

//#region populate front end with user's progress data
document.addEventListener('click', function (e) {
    if (e.target && e.target.id.includes(`view-all`) && e.target.id.includes(`data-btn`)) {
        let categoryName = e.target.dataset.category;
        populateUserProgressTrackerModal(categoryName, document.getElementById("search-date-input").value);
        document.getElementById("modal-search-date-input").value = document.getElementById("search-date-input").value;
        // console.log(document.getElementById("search-date-input").value);
    }
});

function populateUserProgressTrackerModal(tableCategory, searchDate) {
    // 🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨
    // 🟥🟦🟩🟨REMOVE SEARCH DATE FILTER IF YOU WANT TO SHOW ALL ROWS OF DATA WITHIN THE MODAL🟥🟦🟩🟨
    // 🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨🟥🟦🟩🟨
    let allTables = "";
    // Object.keys(gTableCells).forEach(tableCategory => {
    let tableTemplate = `<INNERTABLEDATA>`;
    let innerTableDataTemplate = `
                <div class="table-responsive">
                    <table class="mb-0 table">
                        <TABLEHEADINGS>
                        <tbody>
                        <TABLEROWS>
                        </tbody>
                    </table>
                </div>
            `;
    let tableRowPlaceholderSection = "";
    let tableHeadingPlaceholderSection = "";
    // use this to create pages => array.slice(start, end).forEach()
    
    Object.keys(gTableCells[tableCategory]).filter(row => row.includes(searchDate)).forEach(tableRow => {
        let tableRowTemplate = `
                    <tr>
                        <PLACEHOLDER>
                        <BUTTONPLACEHOLDER>
                    </tr>
                `;
        let innerTableRowStr = "";
        let tableHeadingTemplate = `
                    <thead>
                        <tr>
                            <PLACEHOLDER>
                            <th>Actions</th>
                        </tr>
                    </thead>
                `;
        let tableHeadingStr = "";
        let editParametersForModal = [];
        Object.keys(gTableCells[tableCategory][tableRow]).forEach(tableField => {
            tableHeadingStr += `<th>${Object.keys(gTableCells[tableCategory][tableRow][tableField])}</th>`;
            // innerTableRowStr += `<td>${Object.values(gTableCells[tableCategory][tableRow][tableField])}</td>`;
            if(isNaN(Object.values(gTableCells[tableCategory][tableRow][tableField])[0]) && Object.values(gTableCells[tableCategory][tableRow][tableField])[0].includes("cloudinary")) {
                innerTableRowStr += `
                <td>
                    <a href="${Object.values(gTableCells[tableCategory][tableRow][tableField])}" target="_blank">
                        <i style="font-size:20px" class="pe-7s-photo icon-gradient bg-grow-early"></i>
                    </a>
                </td>`;
            } else {
                innerTableRowStr += `<td>${Object.values(gTableCells[tableCategory][tableRow][tableField])}</td>`;
            }

            editParametersForModal.push(Object.values(gTableCells[tableCategory][tableRow][tableField]));
        })
        var editDatasetTemplate = ""
        for (let i = 0; i < editParametersForModal.length; i++) {
            editDatasetTemplate += ` data-edit-params${i}="${editParametersForModal[i]}" `
            if (i == editParametersForModal.length - 1) {
                editDatasetTemplate += ` data-remove-points="${editParametersForModal[i]}" `
            }
        }
        let btnTemplate = `
                <td>
                    <div role="group" class="btn-group-sm btn-group">
                        <button type="button" aria-expanded="false" class="btn-shadow btn btn-primary" data-toggle="modal" data-target="#trackHabitModal" id="edit-tracker-${tableRow}" ${editDatasetTemplate} data-edit-record-id="${tableRow}" data-edit-category=${tableCategory}>
                            Edit
                        </button>
                        <button class="btn-shadow btn btn-danger" id="delete-${tableRow}" data-record-id="${tableRow}" data-category=${tableCategory}><i class="fa fa-fw" aria-hidden="true" title="Click to Delete Record"></i></button>
                    </div>
                </td>
                `;
        tableRowTemplate = tableRowTemplate.replace("<PLACEHOLDER>", innerTableRowStr);
        tableRowTemplate = tableRowTemplate.replace("<BUTTONPLACEHOLDER>", btnTemplate);
        tableHeadingTemplate = tableHeadingTemplate.replace("<PLACEHOLDER>", tableHeadingStr);
        tableHeadingTemplate = tableHeadingTemplate.replace("imageURL", "image");

        tableRowPlaceholderSection += tableRowTemplate;
        tableHeadingPlaceholderSection = tableHeadingTemplate;
    })
    innerTableDataTemplate = innerTableDataTemplate.replace("<TABLEHEADINGS>", tableHeadingPlaceholderSection);
    innerTableDataTemplate = innerTableDataTemplate.replace("<TABLEROWS>", tableRowPlaceholderSection);
    allTables += tableTemplate.replace("<INNERTABLEDATA>", innerTableDataTemplate);
    // });
    document.getElementById("view-all-data-modal-body-id").innerHTML = allTables;
    document.getElementById("viewAllDataModalTitle").innerHTML = `Viewing All ${toPascalCase(tableCategory)} Records`;
    document.getElementById("quick-add-view-all-modal").dataset.quickAddCategory = tableCategory;
}

const toPascalCase = str => (str.match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('')

let gTableCells = [];
let gGoalsReached = {
    water: false,
    exercise: false,
    steps: false,
    protein: false,
    fiber: false,
    goals: false
};
const gMinThreshold = {
    water: 100,
    exercise: 1,
    steps: 4000,
    protein: 75,
    fiber: 20,
    goals: 1
};
const gMaxPoints = {
    water: 20,
    exercise: 15,
    steps: 150,
    protein: 20,
    fiber: 5,
    goals: 1
};
let gAllGoalsReached = false;

function getDailyQuota(categorySelected, date) {
    let totalPoints = 0;
    let unit = "";
    let progressQuota = 0;
    Object.keys(gTableCells[categorySelected]).filter(row => row.includes(date)).forEach((filteredRow) => {
        gTableCells[categorySelected][filteredRow].forEach(doc => {
            if(Object.keys(doc)[0] == "points") {
                totalPoints += Number(doc["points"]);
            } 
            if ((categorySelected != "goals") && (categorySelected != "exercise"))
                if ((Object.keys(doc)[0] != "points") && (Object.keys(doc)[0] != "notes") && (Object.keys(doc)[0] != "date") && (Object.keys(doc)[0] != "imageURL") && (Object.keys(doc)[0] != "time")) {
                progressQuota += Number(doc[Object.keys(doc)[0]]);
            }
        })
    });
    switch (categorySelected) {
        case "exercise":
            if(totalPoints == 15){
                totalPoints = 1;
                progressQuota = 1;
            }
            gGoalThresholds[categorySelected] = 1;
            unit = "workouts";
            break;
        case "steps":
            totalPoints *= 100;
            unit = "steps";
            break;
        case "fiber":
        case "protein":
            unit = "grams";
            totalPoints *= 10;
            break;
        case "water":
            unit = "ounces";
            totalPoints *= 10;
            break;
        default:
            totalPoints *= 0;
            unit = "default"
            break;
    }
    // console.log(categorySelected);
    // console.log(totalPoints);
    // console.log(gGoalThresholds[categorySelected]);
    //current issue. it needs to know the minimum in order to provide the acceptance for goals reached. 
    if (totalPoints >= gMinThreshold[categorySelected]) {
        gGoalsReached[categorySelected] = true;
    } else {
        gGoalsReached[categorySelected] = false;
    }
    document.getElementById("all-goals-checkmark").style.display = "none";
    document.getElementById("all-goals-x").style.display = "unset";
    if (gGoalsReached["exercise"] == true && gGoalsReached["fiber"] == true && gGoalsReached["protein"] == true && gGoalsReached["steps"] == true && gGoalsReached["water"] == true) {
        updateDayMilestone(date);
        document.getElementById("all-goals-checkmark").style.display = "unset";
        document.getElementById("all-goals-x").style.display = "none";
    }
    const arrTemp = [Math.round(totalPoints), gGoalThresholds[categorySelected],(((progressQuota)/gGoalThresholds[categorySelected])*100), unit, progressQuota];
    console.log(arrTemp);
    return arrTemp;
}

function populateUserProgressView() {
    let searchDate = document.getElementById("search-date-input").value;
    let allTables = "";
    let tableTemplate = "";
    let tableHeaders = [];
    let categorySettings = gTrackerCategoryData.data();
    let categoryKeys = Object.keys(categorySettings);
    for (let i = 0; i < categoryKeys.length; i++) {
        let tableHeadingKeys = Object.keys(categorySettings[categoryKeys[i]]);
        let innerArray = [];
        tableHeadingKeys.forEach(headingNumber => {
            innerArray[headingNumber] = categorySettings[categoryKeys[i]][headingNumber]["fieldName"];
        })
        tableHeaders[categoryKeys[i]] = innerArray;
    }
    
    getUserProgressData().then((progressData) => {
        gTableCells = [];
        const progressDataKeys = Object.keys(progressData);
        for (let i = 0; i < progressDataKeys.length; i++) {
            let cardHeaderCategory = progressDataKeys[i];
            let allCategoryRowData = progressData[progressDataKeys[i]];
            const innerTableRows = [];
            Object.keys(allCategoryRowData).forEach(categoryRow => {
                //allCategoryRowData contains the object so we need categoryRow to identify the row we need to iterate through
                //ex. categoryRow == "2022-11-18+820a1fd8"
                let categoryRowData = allCategoryRowData[categoryRow]
                var categoryRowKeys = Object.keys(categoryRowData);
                const rowData = [];
                categoryRowKeys.forEach(rowField => {
                    let rowFieldValue = allCategoryRowData[categoryRow][rowField];
                    let fieldNameArray = [];
                    rowData[tableHeaders[cardHeaderCategory].indexOf(rowField)] = fieldNameArray;
                    fieldNameArray[rowField] = rowFieldValue;
                })
                innerTableRows[categoryRow] = rowData;
            })
            gTableCells[cardHeaderCategory] = innerTableRows;
        }
        Object.keys(gTableCells).forEach(tableCategory => {
            let goalThresholds = getDailyQuota(tableCategory, searchDate);
            let maxPointsTemplate = `
                <div class="btn-actions-pane-right opacity-9">
                    <div role="group" class="btn-group-sm btn btn-group" style="transform: scale(0.9); padding-right: 0; pointer-events: none">
                        <button class="btn-transition btn btn-outline-secondary">max points daily</button>
                        <button class="btn-transition btn btn-outline-secondary">${gMaxPoints[tableCategory]}</button>
                    </div>
                </div>
            `;
            if (tableCategory == "goals") {
                maxPointsTemplate = "";
            }
            tableTemplate = `
                <div class="col-md-4 mx-auto">
                    <div class="main-card mb-3 card">
                        <div class="card-header">
                            <img style="width: 15px; margin-right: 5px" src="./assets/images/icons/${tableCategory}.ico"> ${tableCategory}
                            ${maxPointsTemplate}
                        </div>
                        <INNERTABLEDATA>
                        <div class="d-block text-center card-footer">
                            <PROGRESSBAR>
                            <div>
                                <button type="button" id="view-all-${tableCategory}-data-btn" aria-expanded="false" class="btn-shadow btn btn-primary" data-toggle="modal" data-category=${tableCategory} data-target="#viewAllDataModal"><i class="fa fa-fw" aria-hidden="true" title="Copy to use table"></i> View All Records</button>
                                <button id="quick-add-${tableCategory}" type="button" aria-expanded="false" class="btn-shadow btn btn-info" data-toggle="modal" data-target="#trackHabitModal" data-quick-add-category=${tableCategory}><i class="fa fa-fw" aria-hidden="true"></i> add new</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            let innerTableDataTemplate = `
                <div class="table-responsive">
                    <table class="mb-0 table">
                        <TABLEHEADINGS>
                        <tbody>
                        <TABLEROWS>
                        </tbody>
                    </table>
                </div>
            `;
            let tableRowPlaceholderSection = "";
            let tableHeadingPlaceholderSection = "";
            // use this to create pages => array.slice(start, end).forEach()
            Object.keys(gTableCells[tableCategory]).filter(date => date.includes(searchDate)).forEach(tableRow => {
                let tableRowTemplate = `
                    <tr>
                        <PLACEHOLDER>
                    </tr>
                `;
                let innerTableRowStr = "";
                let tableHeadingTemplate = `
                    <thead>
                        <tr>
                            <PLACEHOLDER>
                        </tr>
                    </thead>
                `;
                let tableHeadingStr = "";
                Object.keys(gTableCells[tableCategory][tableRow]).forEach(tableField => {
                    tableHeadingStr += `<th>${Object.keys(gTableCells[tableCategory][tableRow][tableField])}</th>`;
                    if(isNaN(Object.values(gTableCells[tableCategory][tableRow][tableField])[0]) && Object.values(gTableCells[tableCategory][tableRow][tableField])[0].includes("cloudinary")) {
                        innerTableRowStr += `
                        <td>
                            <a href="${Object.values(gTableCells[tableCategory][tableRow][tableField])}" target="_blank">
                                <i style="font-size:20px" class="pe-7s-photo icon-gradient bg-grow-early"></i>
                            </a>
                        </td>`;
                    } else {
                        innerTableRowStr += `<td>${Object.values(gTableCells[tableCategory][tableRow][tableField])}</td>`;
                    }
                })
                tableRowTemplate = tableRowTemplate.replace("<PLACEHOLDER>", innerTableRowStr);
                tableHeadingTemplate = tableHeadingTemplate.replace("<PLACEHOLDER>", tableHeadingStr);
                tableHeadingTemplate = tableHeadingTemplate.replace("imageURL", "image");
                tableRowPlaceholderSection += tableRowTemplate;
                tableHeadingPlaceholderSection = tableHeadingTemplate;
            })
            innerTableDataTemplate = innerTableDataTemplate.replace("<TABLEHEADINGS>", tableHeadingPlaceholderSection);
            innerTableDataTemplate = innerTableDataTemplate.replace("<TABLEROWS>", tableRowPlaceholderSection);
            let progressBarTemplate = `
            <div class="mb-3 progress">
                    <div class="progress-bar bg-success" role="progressbar" aria-valuenow="${goalThresholds[4]}" aria-valuemin="0" aria-valuemax="${goalThresholds[1]}" style="width: ${goalThresholds[2]}%; color: black">${goalThresholds[4]}/${goalThresholds[1]} ${goalThresholds[3]}</div>
                </div>
            `;
            if (tableCategory != "goals") {
                tableTemplate = tableTemplate.replace("<PROGRESSBAR>", progressBarTemplate);
            }
            allTables += tableTemplate.replace("<INNERTABLEDATA>", innerTableDataTemplate);
        });
        document.getElementById("progressTrackerTableData").innerHTML = allTables;
    });
}
//#endregion

// ███╗   ███╗██╗██╗     ███████╗███████╗████████╗ ██████╗ ███╗   ██╗███████╗███████╗    ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
// ████╗ ████║██║██║     ██╔════╝██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
// ██╔████╔██║██║██║     █████╗  ███████╗   ██║   ██║   ██║██╔██╗ ██║█████╗  ███████╗       ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
// ██║╚██╔╝██║██║██║     ██╔══╝  ╚════██║   ██║   ██║   ██║██║╚██╗██║██╔══╝  ╚════██║       ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
// ██║ ╚═╝ ██║██║███████╗███████╗███████║   ██║   ╚██████╔╝██║ ╚████║███████╗███████║       ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
// ╚═╝     ╚═╝╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

document.querySelectorAll("[id^='milestoneCheckbox']").forEach(el => {
    el.onclick = (e) => {
        e.preventDefault();
    }
})

async function updateDatesTracked(){
    const milestoneDataRef = doc(db, "loyalty-members", gUserEmail);
    const milestoneData = await getDoc(milestoneDataRef);
    const dailyMilestones = milestoneData.data()["day_milestone"];
    const milestonesData = milestoneData.data()["milestones"];
    let daysReached = Object.keys(dailyMilestones).length;
    let innerObj;
    let milestonePoints = 0;
    let milestoneReached = false;
    switch (daysReached) {
        case 7: 
            milestoneReached = true;
            milestonePoints = 50;
            break;
        case 14: 
            milestoneReached = true;
            milestonePoints = 100;
            break;
        case 28: 
            milestoneReached = true;
            milestonePoints = 250;
            break;
        case 42: 
            milestoneReached = true;
            milestonePoints = 750;
            break;
        case 66: 
            milestoneReached = true;
            milestonePoints = 1500;
            break;
        case 85: 
            milestoneReached = true;
            milestonePoints = 3000;
            break; 
        default:
            milestoneReached = false;
            milestonePoints = 0;
    }
    if (milestoneReached) {
        let previousMilestoneStatus = milestonesData[`milestone_${daysReached}`]["achieved"];
        let currentMilestoneStatus = false;
        innerObj = {
            [`milestones.milestone_${daysReached}`]: {
                achieved: true,
                points: milestonePoints
            }
        }
        currentMilestoneStatus = true;
        await updateDoc(milestoneDataRef, innerObj);
        if (previousMilestoneStatus != currentMilestoneStatus) {
            updateUserPoints(milestonePoints);
            document.getElementById("menu-hamburger").click();
            await setTimeout(() => {
                document.getElementById(`milestone_${daysReached}Checkbox`).checked = true;
            }, 1000);
        }
    }
}                                                                                                                                       

async function updateDayMilestone(date) {
    const dayMilestoneRef = doc(db, "loyalty-members", gUserEmail);
    let innerObj = {
        [`day_milestone.${date}`]: true
    }
    document.getElementById("all-goals-checkmark").style.display = "unset";
    await updateDoc(dayMilestoneRef, innerObj);
    Object.keys(gGoalsReached).forEach(goal => {
        gGoalsReached[goal] = false;
    })
    updateDatesTracked();
}


// ░█░█░█▀█░█▀▄░█▀█░▀█▀░█▀▀░░░█▀█░█▀▄░█▀█░█▀▀░█▀▄░█▀▀░█▀▀░█▀▀░░░▀█▀░█▀▄░█▀█░█▀▀░█░█░█▀▀░█▀▄
// ░█░█░█▀▀░█░█░█▀█░░█░░█▀▀░░░█▀▀░█▀▄░█░█░█░█░█▀▄░█▀▀░▀▀█░▀▀█░░░░█░░█▀▄░█▀█░█░░░█▀▄░█▀▀░█▀▄
// ░▀▀▀░▀░░░▀▀░░▀░▀░░▀░░▀▀▀░░░▀░░░▀░▀░▀▀▀░▀▀▀░▀░▀░▀▀▀░▀▀▀░▀▀▀░░░░▀░░▀░▀░▀░▀░▀▀▀░▀░▀░▀▀▀░▀░▀
async function updateProgressTrackerInstance(recordId, category, date, innerObj, pointsIncrement) {
    var newUID = generateUID();
    if (recordId == "") {
        recordId = `${date}+${newUID}`;
    } else {}

    var updateHabitContentsObj = {
        [`${category}.${recordId}`]: innerObj    
    }
    await updateDoc(doc(db, "progress_tracker", gUserEmail), updateHabitContentsObj);
    // await updateDayMilestone(date);
    await updateUserPoints(pointsIncrement);
    await setTimeout(() => {
        (location.reload()) //comment for tests || uncomment for production
    }, 1500);
}

document.addEventListener('click', function (e) {
    if (e.target.id.includes("delete")) {
        let category = e.target.dataset.category;
        let recordId = e.target.dataset.recordId;
        let removeRecordIdPoints = document.getElementById(`edit-tracker-${recordId}`).dataset.removePoints; 
        deleteHabitRecordDoc(category, recordId, removeRecordIdPoints);
    }
});

async function deleteHabitRecordDoc(category, recordId, removeRecordIdPoints) {
    // FIXME: DEL1 Allow users to delete data (it works but is buggy)
    var deleteRecordObj = {
        [`${category}.${recordId}`]: deleteField()
    }
    console.log(recordId);
    console.log(removeRecordIdPoints);
    await updateUserPoints(Number(removeRecordIdPoints) * -1);
    const progressTrackerRef = doc(db, "progress_tracker", gUserEmail);
    await updateDoc(progressTrackerRef, deleteRecordObj);
    await setTimeout(() => {
        (location.reload())
    }, 1500);
}

if (window.location.href.includes("progress-tracker.html")) {
    document.getElementById("saveThresholdsBtn").addEventListener("click", saveThresholdsSetting);
}

async function saveThresholdsSetting () {
    let proteinThreshold = Number(document.getElementById("proteinThresholdSettings").value);
    let waterThreshold = Number(document.getElementById("waterThresholdSettings").value);
    let fiberThreshold = Number(document.getElementById("fiberThresholdSettings").value);
    let stepsThreshold = Number(document.getElementById("stepsThresholdSettings").value);

    let thresholdSettingsObj = {
        ["goals"] : {
            exercise: 1,
            goals: 1,
            protein: proteinThreshold,
            fiber: fiberThreshold,
            water: waterThreshold,
            steps: stepsThreshold,
        }
    }
    try {
        await updateDoc(doc(db, "loyalty-members", gUserEmail), thresholdSettingsObj);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    await setTimeout(() => {
        (location.reload())
    }, 1500);    
}


// ██╗███╗   ███╗ █████╗  ██████╗ ███████╗    ██╗   ██╗██████╗ ██╗      ██████╗  █████╗ ██████╗ 
// ██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝    ██║   ██║██╔══██╗██║     ██╔═══██╗██╔══██╗██╔══██╗
// ██║██╔████╔██║███████║██║  ███╗█████╗      ██║   ██║██████╔╝██║     ██║   ██║███████║██║  ██║
// ██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝      ██║   ██║██╔═══╝ ██║     ██║   ██║██╔══██║██║  ██║
// ██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗    ╚██████╔╝██║     ███████╗╚██████╔╝██║  ██║██████╔╝
// ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝     ╚═════╝ ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ 
if (window.location.href.includes("progress-tracker.html")) {
    document.getElementById("photoUploadBtn").addEventListener("click", showUploadWidget);
}

function showUploadWidget() {
    const date = document.getElementById("steps-dateId").value
    let folderPath = `pointsupply.app/${gUserEmail}/${date}`;
    //folderPath = user/recordId (sometimes there is no recordId)
    cloudinary.openUploadWidget({
        cloudName: "dikoru1ql",
        uploadPreset: "pointsupply-dev",
        sources: ["local", "camera"],
        showAdvancedOptions: true,
        cropping: true,
        folder: folderPath,
        multiple: false,
        defaultSource: "local",
        styles: {
            palette: {
                window: "#ffffff",
                sourceBg: "#f4f4f5",
                windowBorder: "#90a0b3",
                tabIcon: "#000000",
                inactiveTabIcon: "#555a5f",
                menuIcons: "#555a5f",
                link: "#0433ff",
                action: "#339933",
                inProgress: "#0433ff",
                complete: "#339933",
                error: "#cc0000",
                textDark: "#000000",
                textLight: "#fcfffd"
            },
            fonts: {
                default: null,
                "sans-serif": {
                    url: null,
                    active: true
                }
            }
        }
    }, (err, result) => {
        if (!err && result && result.event === "success") {
            // gUploadImage = result.info.secure_url;
            document.getElementById("steps-imageURLId").value = result.info.secure_url;
            document.getElementById("photoUploadBtn").textContent = "Photo Uploaded!"
        }
    });
}