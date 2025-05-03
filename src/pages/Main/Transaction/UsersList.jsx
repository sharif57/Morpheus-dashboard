// import { Table } from "antd";
// // import exlamIcon from "../assets/images/exclamation-circle.png";
// import exlamIcon from "../../../assets/images/exclamation-circle.png";
// import { useState } from "react";
// import DashboardModal from "../../../Components/DashboardModal";
// import { useUserListQuery } from "../../../redux/features/useSlice";
// // import DashboardModal from "./DashboardModal";

// const UsersList = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({});
//     const { data: userData, isLoading } = useUserListQuery()

//   const showModal = (data) => {
//     setIsModalOpen(true);
//     setModalData(data);
//   };

//   const columns = [
//     {
//       title: "#SI",
//       dataIndex: "transIs",
//       key: "transIs",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "User Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "Email",
//       key: "Email",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",

//     },
   
//     {
//       title: "Action",
//       key: "Review",
//       aligen: "center",
//       render: (_, data) => (
//         <div className="  items-center justify-around textcenter flex ">
//           {/* Review Icon */}
//           <img
//             src={exlamIcon}
//             alt=""
//             className="btn  px-3 py-1 text-sm rounded-full cursor-pointer"
//             onClick={() => showModal(data)}
//           />
//         </div>
//       ),
//     },
//   ];

//   const data = [];
//   for (let index = 0; index < 6; index++) {
//     data.push({
//       transIs: `${index + 1}`,
//       name: "Henry",
//       Email: "sharif@gmail.com",
//       PartyName: "Party Name",
//       Payment: "$50",
//       Earnings: "$7.5",
//       date: "16 Apr 2024",
//       _id: index,
//     });
//   }

//   return (
//     <div className="rounded-lg border py-4 bg-white mt-8 recent-users-table">
//       <h3 className="text-2xl text-black mb-4 pl-2">Users List</h3>
//       {/* Ant Design Table */}
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={{ position: ["bottomCenter"] }}
//         className="rounded-lg"
//       />
//       <DashboardModal
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//         maxWidth="500px"
//       >
//         <div>
//           <h2 className="text-lg text-center mb-4">User Details</h2>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>#SL</p>
//             <p>{modalData.transIs}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>User Name</p>
//             <p>{modalData.name}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Email</p>
//             <p>{modalData.Email}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Mobile Phone</p>
//             <p>{modalData.Phone}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Service</p>
//             <p>{modalData.transIs}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Date</p>
//             <p>{modalData.transIs}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Time</p>
//             <p>{modalData.transIs}</p>
//           </div>
//           <div className="flex justify-between mb-2 text-gray-600">
//             <p>Amount</p>
//             <p>{modalData.transIs}</p>
//           </div>
//         </div>
//       </DashboardModal>
//     </div>
//   );
// };

// export default UsersList;

import { Table } from "antd";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { useState } from "react";
import DashboardModal from "../../../Components/DashboardModal";
import { useUserListQuery } from "../../../redux/features/useSlice";
import dayjs from "dayjs";

const UsersList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const { data: apiData, isLoading } = useUserListQuery();

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date Joined",
      dataIndex: "date_joined",
      key: "date_joined",
      render: (date) => dayjs(date).format("DD MMM YYYY"),
    },
    {
      title: "Status",
      key: "is_verified",
      render: (_, record) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            record.is_verified
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {record.is_verified ? "Verified" : "Pending"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, data) => (
        <div className="items-center justify-around text-center flex">
          <img
            src={exlamIcon}
            alt="Details"
            className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
      ),
    },
  ];

  // Transform API data for the table
  const tableData = apiData?.user_list?.map(user => ({
    ...user,
    key: user.id, // Required for AntD table row keys
  })) || [];

  return (
    <div className="rounded-lg border py-4 bg-white mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Users List</h3>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        pagination={{ position: ["bottomCenter"], pageSize: 10 }}
        className="rounded-lg"
      />
      
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">User Details</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>User ID</p>
            <p>{modalData.id}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Full Name</p>
            <p>{modalData.full_name}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Email</p>
            <p>{modalData.email}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Verification Status</p>
            <p>{modalData.is_verified ? "Verified" : "Not Verified"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Account Status</p>
            <p>{modalData.is_active ? "Active" : "Inactive"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Date Joined</p>
            <p>
              {modalData.date_joined && 
                dayjs(modalData.date_joined).format("DD MMM YYYY hh:mm A")}
            </p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Profile Picture</p>
            <p>
              {modalData.profile_pic ? (
                <img
                  src={modalData.profile_pic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                "Not available"
              )}
            </p>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default UsersList;