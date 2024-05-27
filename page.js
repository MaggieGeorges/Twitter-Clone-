//USERS

document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('user-select');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                userSelect.appendChild(option);
            });
            //Load posts and user details for the first user by default
            if (users.length > 0) {
                userSelect.value = users[0].id;
                loadUserProfile(users[0]);
                loadPosts(users[0].id, users[0].name);
            }
        });

    userSelect.addEventListener('change', () => {
        const userId = userSelect.value;
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                loadUserProfile(user);
                loadPosts(user.id, user.name);
            });
    });
});

function loadUserProfile(user) {
    const coverPhoto = document.querySelector('.cover-photo');
    const profilePhoto = document.querySelector('.profile-photo');
    const userName = document.querySelector('.user-name');
    const userUsername = document.querySelector('.user-username');
    const userWebsite = document.querySelector('.user-website');
    const userCatchphrase = document.querySelector('.user-catchphrase');
    const userCity = document.querySelector('.user-city');

    coverPhoto.style.backgroundImage = 'url(Images/download.jpg)';
    profilePhoto.style.backgroundImage = 'url(Images/IMG_0262.jpg)';

    userName.textContent = user.name;
    userUsername.textContent = `@${user.username}`;
    userWebsite.textContent = user.website;
    userCatchphrase.textContent = user.company.catchPhrase;
    userCity.textContent = "📍" + user.address.city;
}


//POSTS SECTION
function loadPosts(userId, userName) {
    const postsContainer = document.querySelector('.posts-container');
    postsContainer.innerHTML = ''; //Clear existing posts
    const commentsContainer = document.querySelector('.comments-container');
    commentsContainer.innerHTML = ''; //Clear existing comments

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
            if (posts.length > 0) {
                loadComments(posts[0].id, 1); // Load comments for the first post by default
            }
            posts.forEach((post, index) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                postElement.innerHTML = `
                <div class="post-header">
                    <img src="Images/IMG_0262.jpg" alt="Profile Picture" class="profile-pic">
                    <div class="post-info">
                        <span class="name">${userName}</span>
                        <i class="fas fa-check-circle verified"></i>
                        <i class="fab fa-twitter twitter-icon"></i>
                    </div>
                </div>
            
                    <div class="post-content">
                        <p>${post.body}</p>
                    </div>
                    <div class="post-footer">
                        <span class="icon"><a href="#" class="comment-link-icon">💬 </a> 200</span>
                        <span class="icon">🔁 200</span>
                        <span class="icon">❤️ 200</span>
                    </div>
                `;
                /*postElement.querySelector('.comment-link-icon').addEventListener('click', (event) => {
                    event.preventDefault();*/

                postElement.querySelector('.icon:first-child').addEventListener('click', (event) => {
                    event.preventDefault();
                    loadComments(post.id, index + 1);
                });

                postsContainer.appendChild(postElement);
            });
        });
}



// COMMENTS SECTION
function loadComments(postId, postNumber) {
    const commentsContainer = document.querySelector('.comments-container');
    commentsContainer.innerHTML = ''; //Clear existing comments

    //For displaying the post comments title
    commentsContainer.innerHTML = `<h3>Post ${postNumber} Comments</h3>`;

    //fetching comments
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');

                commentElement.innerHTML = `
                    <div class="comment-header">
                        <img src="Images/IMG_0262.jpg" alt="Profile Picture" class="profile-pic">
                        <div class="comment-info">
                            <span class="name">${comment.name}</span>
                            <i class="fas fa-check-circle verified"></i>
                            <i class="fab fa-twitter twitter-icon"></i>
                        </div>
                    </div>
                    <div class="comment-content">
                        <p>${comment.body}</p>
                    </div>
                    <div class="comment-footer">
                        <span class="icon">💬 0</span>
                        <span class="icon">🔁 0</span>
                        <span class="icon">❤️ 0</span>
                    </div>
                `;

                commentsContainer.appendChild(commentElement);
            });
        });
}
