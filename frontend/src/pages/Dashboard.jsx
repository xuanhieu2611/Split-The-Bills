import Chart from "../components/Chart";
import Navbar from "../components/Navbar";
import DataTable from "../components/DataTable";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex w-screen min-h-screen items-center pt-16 pb-5">
        <DataTable />
        <Chart />
      </div>
    </>
  )
}
