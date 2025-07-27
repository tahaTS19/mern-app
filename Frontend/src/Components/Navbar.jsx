import React from "react";
//import { Link } from "react-router";
import { LogOutIcon, Search, User } from "lucide-react";
import { useAuth } from "../Context/Contextprovider";
import { firstName } from "../lib/utils.js";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-base-300 border-b border-primary">
      <div className="mx-auto max-w-6xl p-4 sm:p-4">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-0">
          <div className="order-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary font-mono tracking-tight">
              ThinkBoard
            </h1>
          </div>

          <div className="flex w-full order-3 md:justify-center md:order-2">
            <div className="relative w-full max-w- md:w-fit md:max-w-none">
              <input
                type="text"
                placeholder="Search"
                className="input input-md input-bordered w-full pl-10"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search
                size={20}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between order-2 md:order-3">
            {!user ? (
              <>
                <div className="w-max dropdown dropdown-hover dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-outline btn-secondary m-1 btn-sm md:btn-md"
                  >
                    <User />
                    User
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-max p-2 shadow-sm"
                  >
                    <li>
                      <button
                        className="btn btn-outline btn-error btn-sm rounded-full text-xs"
                        onClick={logout}
                      >
                        <LogOutIcon size={15} />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="w-max dropdown dropdown-hover dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-outline btn-secondary m-1 btn-sm md:btn-md"
                  >
                    <User />
                    {firstName(user.name)}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-max p-2 shadow-sm"
                  >
                    <li>
                      <button
                        className="btn btn-outline btn-error btn-sm rounded-full text-xs"
                        onClick={logout}
                      >
                        <LogOutIcon size={15} />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
