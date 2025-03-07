import userSlice from "../userSlice";
const action = userSlice.actions;

export const fetchUserMiddleWare = (param) => {
  return async (dispatch) => {
    if (!param) return;

    try {
      dispatch(action.userLoading());

      const resp = await fetch(
        `https://jsonplaceholder.typicode.com/users/${param}`
      );

      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }

      const user = await resp.json();
      console.log("user", user);

      dispatch(action.userData(user));
    } catch (err) {
      console.error("Error fetching user:", err);
      dispatch(action.userError());
    }
  };
};
