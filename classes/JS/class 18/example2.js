const POST_URL = "https://jsonplaceholder.typicode.com/posts/1";
const USER_URL = "https://jsonplaceholder.typicode.com/users/1";
const COMMENT_URL = "https://jsonplaceholder.typicode.com/comments/1";

const myFetchUrls = (url) => {
  return fetch(url)
    .then((data) => data.json())
    .catch((error) => console.log(error));
};

// parallel
// const fetchPost = myFetchUrls(POST_URL);
// const fetchUser = myFetchUrls(USER_URL);
// const fetchComment = myFetchUrls(COMMENT_URL);
// fetchPost.then((data) => console.log(data));
// fetchUser.then((data) => console.log(data));
// fetchComment.then((data) => console.log(data));

// sequence
// myFetchUrls(POST_URL)
//   .then((data) => {
//     console.log(data);
//     return myFetchUrls(USER_URL);
//   })
//   .then((data) => {
//     console.log(data);
//     return myFetchUrls(COMMENT_URL);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// series
// async function getAllInfo() {
//   try {
//     const userData = await myFetchUrls(USER_URL);
//     const postData = await myFetchUrls(POST_URL);
//     const commentsData = await myFetchUrls(COMMENT_URL);
//     console.log(userData);
//     console.log(postData);
//     console.log(commentsData);
//   } catch (error) {
//     console.log(error);
//   }
// }

// getAllInfo();

// parallel
// async function getAllInfo() {
//   try {
//     const data = await Promise.all([
//       myFetchUrls(USER_URL),
//       myFetchUrls(POST_URL),
//       myFetchUrls(COMMENT_URL),
//     ]);
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// getAllInfo();
