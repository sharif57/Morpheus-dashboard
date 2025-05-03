import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
// import profileImage from "../../assets/images/dash-profile.png";
import { TbBellRinging } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Select } from "antd";
import { useUserProfileQuery } from "../../redux/features/useSlice";

const Header = () => {
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [, setNotificationPopup] = useState(false);
  const { data } = useUserProfileQuery();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  return (
    <div className="w-full h-[88px] flex justify-between items-center rounded-lg py-[16px] px-[32px] shadow-lg bg-[#005163] border text-white ">
      <div className="text-start space-y-0.5">
        <p className="text-sm md:text-xl font-light">
          {`Welcome, ${data?.full_name}`}
        </p>
        <p className="text-sm md:text-xl">{"Have a nice day!"}</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          onClick={() => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge className="text-white" count={1}>
            <TbBellRinging
              style={{ cursor: "pointer" }}
              className={` w-6 h-6 rounded-full shadow-sm  font-bold transition-all`}
            />
          </Badge>
        </div>
        <div className="flex items-center">
          <div>
            <img
              src={`${IMAGE}${data?.profile_pic}`}
              alt=""
              className="rounded-full h-[42px] w-[42px]"
            />
          </div>
          <Select
            defaultValue={data?.full_name}
            style={{
              width: 120,
            }}
            bordered={false}
            suffixIcon={
              <MdOutlineKeyboardArrowDown color="black" fontSize={20} />
            }
            onChange={handleChange}
            options={[
              {
                value: `{data?.full_name}`,
                label: `${data?.full_name}`,
              },
              // {
              //   value: "lucy",
              //   label: "Lucy",
              // },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
