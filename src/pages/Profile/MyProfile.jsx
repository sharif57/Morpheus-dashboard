
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { FaAngleLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useUserProfileQuery } from "../../redux/features/useSlice";

const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useUserProfileQuery();

  // Base URL for images from environment variable
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Fallback profile data in case API data is not available
  const profileData = {
    name: data?.full_name || "N/A",
    email: data?.email || "N/A",
    phone: data?.phone || "+880 1550597212", // Assuming phone might be part of data
    profile: data?.profile_pic ? `${IMAGE}${data.profile_pic}` : "/media/faces/default-profile.png", // Use default image if no profile pic
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <FaAngleLeft />
        <h1>Personal information</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
          Personal information
        </h3>
        <div>
          <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
            <div className="w-full">
              <div className="py-4 px-8 flex justify-end items-center">
                <Button
                  onClick={() => navigate("edit")}
                  size="large"
                  type="default"
                  className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                >
                  <FaRegEdit />
                  Edit Profile
                </Button>
              </div>

              <Form
                name="basic"
                layout="vertical"
                className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
                autoComplete="off"
                initialValues={{
                  name: profileData.name,
                  email: profileData.email,
                }}
              >
                <div className="col-span-3 space-y-6">
                  <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                    <div className="my-2">
                      <img
                        src={profileData.profile}
                        alt="Profile"
                        className="h-28 w-28 rounded-full border-4 border-black"
                        onError={(e) => {
                          e.target.src = "/media/faces/default-profile.png"; // Fallback image on error
                        }}
                      />
                    </div>
                    <h5 className="text-lg text-[#222222]">Profile</h5>
                    <h4 className="text-2xl text-[#222222]">
                      {data?.is_superuser ? "Superuser" : data?.is_staff ? "Staff" : "Admin"}
                    </h4>
                  </div>
                </div>
                <div className="col-span-9 space-y-[14px] w-full">
                  <Form.Item
                    className="text-lg font-medium text-black -mb-1"
                    label="Name"
                    name="name"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg font-medium text-black"
                    label="Email"
                    name="email"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                    />
                  </Form.Item>

                </div>
              </Form>
            </div>
            <PasswordChangeModalForm
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyProfile;