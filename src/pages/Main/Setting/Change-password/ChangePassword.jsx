import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { FaArrowLeft, FaEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../../../redux/features/authSlice";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      await changePassword({
        old_password: values.old_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      }).unwrap();
      message.success("Password updated successfully!");
      navigate("/"); // Navigate back to profile page on success
    } catch (error) {
      message.error(error?.data?.message || "Failed to update password. Please try again.");
    }
  };

  const onFinishFailed = () => {
    message.error("Please fill in all fields correctly.");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg mt-8 w-[610px] h-[725px] mx-auto py-10 px-8">
        <div className="flex flex-col w-full max-w-md mx-auto mt-10 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2">
            <FaArrowLeft className="cursor-pointer" onClick={() => navigate("/")} />
            <h1>Change password</h1>
          </div>
          <h1>Your password must be 8-10 characters long.</h1>
          <Form
            form={form}
            name="change_password"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="flex flex-col w-full space-y-4"
          >
            {[
              { label: "Enter old password", name: "old_password", placeholder: "Enter old password" },
              { label: "Set new password", name: "new_password", placeholder: "Set new password" },
              {
                label: "Re-enter new password",
                name: "confirm_password",
                placeholder: "Re-enter new password",
              },
            ].map(({ label, name, placeholder }) => (
              <Form.Item
                key={name}
                name={name}
                label={<h1 className="mb-3">{label}</h1>}
                rules={[
                  { required: true, message: `${label} is required!` },
                  name !== "old_password" && {
                    pattern: /^.{8,10}$/,
                    message: "Password must be 8-10 characters long!",
                  },
                  name === "confirm_password" && {
                    validator: (_, value) =>
                      value && value === form.getFieldValue("new_password")
                        ? Promise.resolve()
                        : Promise.reject(new Error("Passwords do not match!")),
                  },
                ].filter(Boolean)}
              >
                <div className="relative flex items-center">
                  <MdLockOutline className="absolute left-3" />
                  <Input
                    type={showPassword[name] ? "text" : "password"}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-2 border border-black rounded-lg placeholder:text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                  />
                  {showPassword[name] ? (
                    <FaEye
                      className="absolute right-3 cursor-pointer"
                      onClick={() => togglePasswordVisibility(name)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className="absolute right-3 cursor-pointer"
                      onClick={() => togglePasswordVisibility(name)}
                    />
                  )}
                </div>
              </Form.Item>
            ))}

            <p
              className="mt-4 text-sm text-black font-bold cursor-pointer hover:underline"
              onClick={() => navigate("forgot-password")}
            >
              Forgot Password?
            </p>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;