import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "/Morpheus (2).png";
import logout from "../../assets/images/logout.png";
import { createElement, useEffect, useState } from "react";
import { routeLinkGenerators } from "../../utils/routeLinkGenerators";
import { dashboardItems } from "../../constants/router.constants";
import Swal from "sweetalert2";


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openNome, setOpenNome] = useState({});

  const handleLogOut = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        // dispatch(logout());
        // localStorage.removeItem("token");
        // localStorage.removeItem("user-update");
        navigate("/auth");
      }
    });
  };
  useEffect(() => {
    // console.log(location.pathname.includes("earnings"));
  }, [location.pathname]);
  return (
    <div className="fixed top-0 left-0 w-[290px] min-h-screen h-full pr-0 bg-[#005163] text-white">
      <div className="h-full flex flex-col justify-between  pt-[50px]  drop-shadow">
        <div className="space-y[24px">
          <div className="">
            <img className=" mx-auto" src={logo} alt="" />
          </div>
          <ul className="mt-10 max-h-[650px] overflow-y-auto space-y-1 xl:space-y-2 px-4">
            {routeLinkGenerators(dashboardItems).map(
              ({ name, icon, path, children }, indx) =>
                children?.length ? null
                
                  : (
                    <li
                      onClick={() => {
                        setOpenNome((c) => ({
                          name: c?.name === name ? null : name,
                        }));
                      }}
                      key={indx}
                    >
                      <NavLink
                        to={path}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-[#8AE2F6] text-black" +
                            " w-full px-4 py-3 flex items-center justify-start gap-3 text-md transition-all rounded-full"
                            : " hover:text-black  hover:bg-[#8AE2F6]" +
                            " w-full px-4 py-3 flex items-center justify-start gap-3 text-md transition-all rounded-full"
                        }
                      >
                        <div>{createElement(icon, { size: "18" })}</div>
                        <span> {name}</span>
                      </NavLink>
                    </li>
                  )
            )}
          </ul>
        </div>
        <div className="p-4 mt-auto  text-center">
          <button
            onClick={handleLogOut}
            className=" w-full  text-black  font-semibold px-12 py-3 flex items-center justify-center gap-3 text-md outline-none rounded-full"
          >
            <img className="" src={logout} alt="" />
            <span className="text-white font-light">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
