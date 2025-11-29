var loginPage = document.querySelector("#loginContainer");
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var loginBtn = document.querySelector("#loginBtn");
var loginLink = document.getElementById("loginLink");

var signUpPage = document.querySelector("#signUpContainer");
var signupName = document.querySelector("#signupName");
var signupEmail = document.querySelector("#signupEmail");
var signupPassword = document.querySelector("#signupPassword");
var signupBtn = document.querySelector("#signupBtn");
var signupPageLink = document.querySelector("#signupPageLink");

var dashboardPage = document.querySelector("#dashboard");
var headCreatePostBtn = document.querySelector(".headCreatePostBtn");
var dashboardAllPosts = document.querySelector("#dashboardAllPosts");

var welcomeUser = document.querySelector("#welcomeUser");
var welcomeUserSpan = document.querySelector("#welcomeUserSpan");

var dashboardSearchContainer = document.querySelector("#dashboardSearchContainer");

var createPost = document.querySelector("#createPost");
var createPostH2 = document.querySelector("#createPostH2");
var createPostId = document.querySelector("#createPostId");
var createPostTitle = document.querySelector("#createPostTitle");
var createPostDesc = document.querySelector("#createPostDesc");
var createPostImgUrl = document.querySelector("#createPostImgUrl");
var createPostCancelBtn = document.querySelector("#createPostCancelBtn");
var createPostPostBtn = document.querySelector("#createPostPostBtn");

var toggleThemeBtn = document.querySelector(".toggleThemeBtn");

var logOut = document.querySelector(".logOut");

var currentUser = null;
var editMode = false;





// Theme Toggle

var storedTheme = JSON.parse(localStorage.getItem("currentTheme")) || {
    theme: "light",
    txt: "☀️"
};

if (storedTheme.theme === "dark") {
    toggleThemeBtn.textContent = storedTheme.txt;
    document.body.classList.toggle("darkTheme");
}

toggleThemeBtn.addEventListener("click", function () {

    document.body.classList.toggle("darkTheme");

    if (storedTheme.txt == "☀️") {
        storedTheme.txt = "🌙";
        storedTheme.theme = "dark";
        toggleThemeBtn.textContent = storedTheme.txt;
    } else {
        storedTheme.txt = "☀️";
        storedTheme.theme = "light";
        toggleThemeBtn.textContent = storedTheme.txt;
    }

    localStorage.setItem("currentTheme", JSON.stringify(storedTheme));
});




// function initApp() {

var loggedInUser = localStorage.getItem("currentUser");

if (loggedInUser) {
    currentUser = loggedInUser;
    showDashboard();
} else {
    showLoginPage();
}
// }





function showLoginPage() {
    loginPage.classList.remove("hidden");
    signUpPage.classList.add("hidden");
    dashboardPage.classList.add('hidden');
}





function showSignupPage() {
    loginPage.classList.add("hidden");
    signUpPage.classList.remove("hidden");
}





function showDashboard() {
    loginPage.classList.add('hidden');
    signUpPage.classList.add('hidden');
    dashboardPage.classList.remove('hidden');

    if (currentUser) {
        welcomeUserSpan.textContent = currentUser;
    }

    loadAllPosts();
}





function showCreatePostContainer() {
    if (!createPost.classList.contains("hidden")) {
        createPost.classList.add("hidden");
        welcomeUser.classList.remove("hidden");
    } else {
        createPost.classList.remove("hidden");
        welcomeUser.classList.add("hidden");
    }
}





function cleanCreatePostForm() {
    createPostTitle.value = "";
    createPostDesc.value = "";
    createPostImgUrl.value = "";
}





loginBtn.addEventListener("click", function () {
    event.preventDefault();

    var username = loginEmail.value.trim();
    var password = loginPassword.value;

    if (!username || !password) {
        alert("Fill the information");
        return false;
    }

    // var users = JSON.parse(localStorage.getItem('users') || '[]');
    var users = JSON.parse(localStorage.getItem('users') || '{}');

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === username && users[i].password === password) {
            currentUser = username;
            localStorage.setItem("currentUser", username);
            showDashboard();
            return;
        }
    }
    alert("Email or Password invalid");

});





signupBtn.addEventListener("click", function () {
    event.preventDefault();

    var Name = signupName.value.trim();
    var Email = signupEmail.value.trim();
    var Password = signupPassword.value;

    if (!Name || !Email || !Password) {
        alert("Fill the information");
        return false;
    }

    var users = JSON.parse(localStorage.getItem('users') || '[]');

    for (let i = 0; i < users.length; i++) {

        if (users[i].email === Email) {
            alert("Email already exists");
            return;
        }
    }

    let newUser = {
        name: Name,
        email: Email,
        password: Password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created! Please Login");

    loginEmail.value = Email;
    loginPassword.value = Password;

    showLoginPage();
});





function logOutFunction() {
    currentUser = null;
    localStorage.removeItem("currentUser");
    showLoginPage();
}





function post() {
    event.preventDefault();

    var title = createPostTitle.value.trim();
    var describtion = createPostDesc.value;
    var imageUrl = createPostImgUrl.value.trim();

    if (!title) {
        alert("Enter Post's Title");
        return;
    }

    var post = {
        username: currentUser,
        id: Date.now(),
        title: title,
        describtion: describtion,
        imageUrl: imageUrl,
        createdAt: new Date().toLocaleDateString()
    };

    var allPosts = JSON.parse(localStorage.getItem("allPosts") || "[]");

    allPosts.unshift(post);
    localStorage.setItem("allPosts", JSON.stringify(allPosts));

    cleanCreatePostForm();
    showCreatePostContainer();
}





function editPost(id) {

    var allPosts = JSON.parse(localStorage.getItem("allPosts"));

    var post = allPosts.find(function (p) {
        return p.id === id;
    });

    createPostId.value = post.id;
    createPostTitle.value = post.title;
    createPostDesc.value = post.describtion;
    createPostImgUrl.value = post.imageUrl;

    editMode = true;
    createPostH2.textContent = "Edit Post";
    createPostPostBtn.textContent = "Save";

    createPost.classList.remove("hidden");
    welcomeUser.classList.add("hidden");

    dashboardSearchContainer.scrollIntoView({ behavior: "smooth" });
}





function updatePost() {
    var id = parseInt(createPostId.value);
    var title = createPostTitle.value.trim();
    var describtion = createPostDesc.value;
    var imageUrl = createPostImgUrl.value.trim();

    if (!title) {
        alert("Enter Post's Title");
        return;
    }

    var allPosts = JSON.parse(localStorage.getItem("allPosts"));

    var postIndex = allPosts.findIndex(function (p) {
        return p.id === id;
    });

    if (postIndex !== -1) {

        allPosts[postIndex].title = title;
        allPosts[postIndex].describtion = describtion;
        allPosts[postIndex].imageUrl = imageUrl;

        localStorage.setItem("allPosts", JSON.stringify(allPosts));

        editMode = false;
        createPostH2.textContent = "Create Post";
        createPostPostBtn.textContent = "Post";

        cleanCreatePostForm();
        showCreatePostContainer();
        loadAllPosts();
    }
}





function deletePost(id) {
    if (confirm("Are you sure? You want to delete this post?")) {
        var allPosts = JSON.parse(localStorage.getItem("allPosts"));

        var updatedPosts = allPosts.filter(function (p) {
            return p.id !== id;
        });

        localStorage.setItem("allPosts", JSON.stringify(updatedPosts));
        loadAllPosts();
    }
}





function loadAllPosts() {

    var allPosts = JSON.parse(localStorage.getItem("allPosts") || "[]");

    dashboardAllPosts.innerHTML = "";

    for (let i = 0; i < allPosts.length; i++) {

        var card = document.createElement("div");
        card.classList = "postCard";

        if (allPosts[i].username === currentUser) {

            card.innerHTML =
                `<!-- Post Info -->
                <div class="postCardInfo">
                    <div class="postCardNameTime">
                        <span class="postUserName">${allPosts[i].username}</span>
                        <span class="postTime">Added: ${allPosts[i].createdAt}</span>
                    </div>
                    <div>
                        <button onclick="editPost(${allPosts[i].id})" class="postEditBtn">Edit</button>
                        <button onclick="deletePost(${allPosts[i].id})" class="postDeleteBtn">Delete</button>
                    </div>
                </div>

                <hr>

                <!-- Post Body -->
                    <div class="postCardBody">
                        <h3>${allPosts[i].title}</h3>
                        <p>${allPosts[i].describtion}</p>
                        <img src="${allPosts[i].imageUrl}" alt="">
                    </div>
                <button class="icons"><i class="fa-solid fa-heart" style="color: red;"></i></button>
                <button class="icons"><i class="fa-regular fa-heart"></i></button>
                `;

            dashboardAllPosts.appendChild(card);

        } else {

            card.innerHTML =
                `<!-- Post Info -->
            <div class="postCardInfo">
                <div class="postCardNameTime">
                    <span class="postUserName">${allPosts[i].username}</span>
                    <span class="postTime">Added: ${allPosts[i].createdAt}</span>
                </div>
                <div>
                </div>
            </div>

            <hr>

            <!-- Post Body -->
                <div class="postCardBody">
                    <h3>${allPosts[i].title}</h3>
                    <p>${allPosts[i].describtion}</p>
                    <img src="${allPosts[i].imageUrl}" alt="">
                </div>
            <button class="icons"><i class="fa-solid fa-heart" style="color: red;"></i></button>
            <button class="icons"><i class="fa-regular fa-heart"></i></button>
            `;

            dashboardAllPosts.appendChild(card);
        }
        console.log(allPosts[i].id);          // here                // just checking
    }
}





function smallCreatePostBtn() {
    showCreatePostContainer();
    dashboardPage.scrollIntoView({behavior: "smooth"});
}

loginLink.addEventListener("click", function () {
    showSignupPage();
});
signupPageLink.addEventListener("click", function () {
    showLoginPage();
});
headCreatePostBtn.addEventListener("click", function () {
    showCreatePostContainer();
    dashboardPage.scrollIntoView({behavior: "smooth"});
});
logOut.addEventListener("click", function () {
    logOutFunction();
});
createPostPostBtn.addEventListener("click", function () {
    if (!editMode) {
        post();
    } else {
        updatePost();
    }
    loadAllPosts();
});
createPostCancelBtn.addEventListener("click", function () {
    cleanCreatePostForm();
    showCreatePostContainer();
    if (createPostPostBtn.textContent === "Save") {
        createPostH2.textContent = "Create Post";
        createPostPostBtn.textContent = "Post";
    }
});





// document.addEventListener("DOMContentLoaded", function () {
//     // initApp();
//     loadAllPosts();
// });