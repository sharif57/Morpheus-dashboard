
import { useState } from "react";
import { Button, Form, Input, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaUpload } from "react-icons/fa6";
import { useUpdateProfileMutation, useUserProfileQuery } from "../../redux/features/useSlice";

const EditMyProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const { data, isLoading } = useUserProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Base URL for images from environment variable
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Fallback profile data
  const profileData = {
    name: data?.full_name || "N/A",
    email: data?.email || "N/A",
    phone: data?.phone || "+880 150597212", // Assuming phone might be part of data
    profile: data?.profile_pic ? `${IMAGE}${data.profile_pic}` : "/media/faces/default-profile.png",
  };

  // Handle form submission
  const onFinish = async (values) => {
    const formData = new FormData();
    if (values.name && values.name !== profileData.name) {
      formData.append("full_name", values.name);
    }
    if (selectedImage) {
      formData.append("profile_pic", selectedImage);
    }
    try {
      await updateProfile(formData).unwrap();
      navigate("/settings/profile"); // Navigate back to profile page on success
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Handle image upload
  const handleImageChange = ({ file }) => {
    setSelectedImage(file);
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
        <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
          <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
            Personal information
          </h3>
          <div className="w-full">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{
                name: profileData.name,
                email: profileData.email,
                phone: profileData.phone,
              }}
            >
              <div className="col-span-3 space-y-6">
                <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                  <div className="my-2">
                    <img
                      src={selectedImage ? URL.createObjectURL(selectedImage) : profileData.profile}
                      alt="Profile"
                      className="h-28 w-28 rounded-full border-4 border-black"
                      onError={(e) => {
                        e.target.src = "/media/faces/default-profile.png";
                      }}
                    />
                  </div>
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={() => false} // Prevent auto-upload
                    onChange={handleImageChange}
                  >
                    <Button
                      icon={<FaUpload />}
                      className="bg-black text-white hover:bg-black/90 rounded-full"
                    >
                      Upload New Photo
                    </Button>
                  </Upload>
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
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <Input size="large" className="h-[53px] rounded-lg" />
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
                {/* <Form.Item
                  className="text-lg text-[#222222] font-medium"
                  label="Phone Number"
                  name="phone"
                >
                  <PhoneCountryInput defaultValue={profileData.phone} />
                </Form.Item> */}
                <Form.Item className="flex justify-end pt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isUpdating}
                    className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                  >
                    Save Changes
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMyProfile;