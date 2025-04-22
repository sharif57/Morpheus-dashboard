import DashboardHomeTable from "../../../Components/DashboardHomeTable";

const DashboardHome = () => {
  return (
    <div className="space-y-[24px]">
      <div className="w-1/5  gap-y-10 ">
        <div className=" flex items-center justify-center gap-6 rounded-lg bg-white py-6 ">
          <div className="bg-[#e6f8fd] p-6 rounded-2xl">
            <img src="/Group (1).png" alt="" />
          </div>
          <div className="text-center">
            <h3 className="text-[20px]">{"Total users"}</h3>
            <h3 className="text-[30px] font-extralight">40,689 </h3>
          </div>
        </div>

      
      </div>
      {/* <BarChartComponent /> */}
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
