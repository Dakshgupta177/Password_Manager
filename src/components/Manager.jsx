import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";

function Manager() {
  const [forms, setforms] = useState({ site: "", username: "", password: "" });
  const [showpass, setshowpass] = useState(false);
  const [passwordarray, setpasswordarray] = useState([]);

  useEffect(() => {
    const storedPasswords = localStorage.getItem("passwords");
    if (storedPasswords) {
      setpasswordarray(JSON.parse(storedPasswords));
    }
  }, []);

  const handlechange = (e) => {
    let b = e.target.value;
    setforms({ ...forms, [e.target.name]: b });

  };

  const Addpass = () => {
    const newPasswordArray = [...passwordarray, { forms, id: uuidv4() }];
    setpasswordarray(newPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    toast("🦄 Password saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",});
  };
  const handledelete = (id) => {
    const del=window.confirm("you really want to delete?")
    if (del) {
      const updatedpasswardaarray = passwordarray.filter((items) => {
        return items.id !== id;
      });
      setpasswordarray(updatedpasswardaarray);
      localStorage.setItem("passwords", JSON.stringify(updatedpasswardaarray));
      toast("🦄 Password deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",});
    }
    else{
      toast("🦄 Deletion cancelled", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",});
    }
  };
  const handleedit = (id) => {
    const itemToEdit = passwordarray.find((items) => items.id === id);

    let updatedurl = prompt("Enter the modified url", itemToEdit.forms.site);
    let updatedusername = prompt(
      "Enter the modified username",
      itemToEdit.forms.username
    );
    let updatedpassward = prompt(
      "Enter the modified password",
      itemToEdit.forms.password
    );

    itemToEdit.forms.site = updatedurl;
    itemToEdit.forms.username = updatedusername;
    itemToEdit.forms.password = updatedpassward;

    const updatedpasswardaarray = passwordarray.map((item) =>
      item.id === id ? { ...itemToEdit } : item 
    );
    setpasswordarray(updatedpasswardaarray);
    localStorage.setItem("passwords", JSON.stringify(updatedpasswardaarray));

    toast("🦄 Password changed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",});
  };

  const showpassward = () => {
    setshowpass(!showpass);
  };
  const handlecopy = (text) => {
    toast(`🦄 ${text} copied to clipboard`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };


  const isFormValid = forms.site && forms.username && forms.password;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex justify-center">
        <div className="m-4 bg-purple-200 min-h-[79vh] p-4 font-semibold w-[70vw] max-xl:w-full">
          <div className="logo text-2xl text-center">
            <h1>
              <span className="text-green-500"> &lt;</span>Pass
              <span className="text-green-500">OP/&gt;</span>
            </h1>
            <h1 className="text-xs">Your own password manager</h1>
          </div>
          <label htmlFor="site" className="max-sm:hidden">Your Url</label>
          <input
            type="text"
            placeholder="Enter url"
            name="site"
            value={forms.site}
            onChange={handlechange}
            id="site"
            className="w-[55vw] m-4 rounded-full px-2 max-xl:w-[80vw] max-lg:w-[74vw] max-md:w-[62vw]  max-sm:w-[80vw] "
          />
          <div className="flex gap-4 justify-between max-lg:flex-col">
            <div className="max-lg:my-2">
              <label htmlFor="username" className="max-sm:hidden">Your Username</label>
              <input
                type="text"
                placeholder="Enter username"
                name="username"
                value={forms.username}
                onChange={handlechange}
                id="username"
                className="w-[20vw] m-4 rounded-full px-2 max-lg:w-[68vw] max-md:w-[55vw] max-sm:w-[80vw]"
              />
            </div>
            <div className="flex items-center max-lg:mb-2">
              <label htmlFor="password" className="max-sm:hidden">Your Password</label>
              <input
                type={showpass ? "text" : "password"}
                placeholder="Enter password"
                name="password"
                value={forms.password}
                onChange={handlechange}
                id="password"
                className="w-60 m-4 rounded-full px-2 max-lg:my-0 max-lg:w-[69vw] max-md:w-[56vw] max-sm:w-[80vw]"
              />
              <span
                className="relative right-10"
                onClick={showpassward}
                role="button"
                aria-label={showpass ? "Hide password" : "Show password"} 
              >
                {showpass ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>
          <button
            onClick={Addpass}
            disabled={!isFormValid}
            className="mx-auto w-24 bg-green-500 px-4 h-12 justify-center items-center flex rounded-full my-3 disabled:bg-gray-300 disabled:cursor-not-allowed
"
          >
            <IoMdAddCircle />
            &nbsp; ADD
          </button>
          <div className="table w-full max-md:text-sm max-sm:text-xs">
            <table className="table-auto w-full">
              <thead className="bg-green-700 text-white w-full">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {passwordarray.map((items) => (
                  <tr key={items.id}>
                    <td className="text-center w-20 overflow_wrap">
                      <div className="flex items-center justify-center gap-2">
                        <a href={items.forms.site} target="_blank">
                          {items.forms.site}
                        </a>
                        {/* <IoCopy
                          className="cursor-pointer"
                          onClick={() => handlecopy(items.forms.site)}
                        /> */}
                      </div>
                    </td>
                    <td className="text-center w-20 overflow_wrap">
                      <div className="flex items-center justify-center gap-2">
                        {items.forms.username}
                        <IoCopy
                          className="cursor-pointer"
                          onClick={() => handlecopy(items.forms.username)}
                        />
                      </div>
                    </td>
                    <td className="text-center w-20 overflow_wrap">
                      <div className="flex items-center justify-center  gap-2">
                          {"•".repeat(items.forms.password.length)}
                        <IoCopy
                          className="cursor-pointer"
                          onClick={() => handlecopy(items.forms.password)}
                        />
                      </div>
                    </td>
                    <td className="text-center w-10 overflow_wrap">
                      <button
                        onClick={(e) => handledelete(items.id)}
                        className="cursor-pointer m-3 bg-green-700 p-2 rounded text-white max-sm:p-1"
                      >
                        <AiFillDelete className=""/>
                      </button>
                      <button
                        onClick={(e) => handleedit(items.id)}
                        className="cursor-pointer bg-green-700 p-2 rounded text-white max-sm:p-1"
                      >
                        <FaEdit className=""/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Manager;
