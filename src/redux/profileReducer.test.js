import profileReducer, {addPostCreator, deletePost} from "./profileReducer";

let state = {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 5 },
      { id: 2, message: "It's my first post", likesCount: 20 },
    ]
};

test('should increment length of posts', () => {
  // 1. test data
  let action = addPostCreator("it-kamasutra.com");

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(3);
});

test('message of new post should be "it-kamasutra.com"', () => {
  // 1. test data
  let action = addPostCreator("it-kamasutra.com");

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts[2].message).toBe("it-kamasutra.com");
});

test('length of posts after delete operation should be decreased', () => {
  // 1. test data
  let action = deletePost(1);

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(1);
});

test('length of posts after delete operation should not be decreased if id is incorrect', () => {
  // 1. test data
  let action = deletePost(3);

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(2);
});
