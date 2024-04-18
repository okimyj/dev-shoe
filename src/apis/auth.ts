import FirebaseFlatform from "./platform/platform.firebase";
const useAuthAPI = () => {
  const flatform = new FirebaseFlatform();

  const signup = (email: string, password: string) => {
    return flatform.signup(email, password);
  };
  const signin = (email: string, password: string) => {
    return flatform.signin(email, password);
  };
  const signout = () => {};
  return { signup, signin, signout };
};
export default useAuthAPI;
