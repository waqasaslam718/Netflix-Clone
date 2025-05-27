import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful, navigation handled by onAuthStateChanged
      })
      .catch(() => {
        navigate("/er ror");
      });
  };

 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log("onAuthStateChanged triggered:", user);

    if (user) {
      const { uid, email, displayName, photoURL } = user;
      dispatch(addUser({ uid, email, displayName, photoURL }));

      if (window.location.pathname === "/") {
        navigate("/browse"); // ✅ Only navigate if not already on /browse
      }
    } else {
      dispatch(removeUser());

      if (window.location.pathname !== "/") {
        navigate("/"); // ✅ Only go to home if not already there
      }
    }
  });

  return () => unsubscribe();
}, [dispatch, navigate]);


  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2 justify-between items-center">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
              defaultValue={SUPPORTED_LANGUAGES[0]?.identifier}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg cursor-pointer"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          
          <img
            className="hidden md:block w-12 h-12 rounded-full"
            alt="usericon"
            src={user?.photoURL}
          />
          
          <h1 className="hidden md:block text-white font-bold mx-4">
            {user?.displayName}
          </h1>
          <button
            onClick={handleSignOut}
            className="font-bold text-white cursor-pointer bg-red-600 rounded-lg p-2 mx-4 my-2"
            title="Sign Out"
          >
            Sign Out
            
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
