import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Sign-in success:", user);

    const { uid, email, displayName, photoURL } = user;
    dispatch(addUser({ uid, email, displayName, photoURL }));

    // REMOVE navigate("/browse") here
  } catch (error) {
    console.error("Google Sign-in Error:", error.code, error.message);
  }
};


  return (
    <div className="relative w-screen h-screen">
      <Header />
     <img
  className="absolute w-full h-full top-0 left-0 object-cover"
  style={{ position: 'fixed', overflow: 'hidden' }}
  src={BG_URL}
  alt="background"
/>

      <div className="absolute w-full md:w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-80 text-center">
        <h1 className="font-bold text-3xl py-4">Sign In with Google</h1>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg cursor-pointer"
          onClick={handleGoogleSignIn}
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
