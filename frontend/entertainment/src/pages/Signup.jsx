import React from "react";

function Signup() {
  return (
    <div className=" flex  justify-center items-center bg-blue-950   h-screen">
      <div className=" ">
        <div className="bg-blue-900 rounded-sm">
          <h1 className="p-3 text-center font-semibold text-3xl   rounded-md text-white">
            Sign up
          </h1>
          <form action="">
            <div>
              <div className="">
               
                <input className="outline-none px-2 block" type="email" placeholder="Email address" />
            
              
                <input className="outline-none px-2 block" type="password" placeholder="Password" />
                <input className="px-2 block" type="password" placeholder="Repeat Password" />

                <div>
                  <button type="submit"  className="border-2 border-indigo-600 text-white py-1 px-5  rounded-md hover:bg-transparent">Create an account</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
