import { useEffect } from "react";
// import { _getContributorData } from "store/slice/contributorSlice";
import { useSelector, useDispatch } from "react-redux";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import Info from "@/components/Info";
import NoImagePlaceholder from "@/public/svgs/no-image-placeholder.svg";
// import ContributorLayout from "@components/ContributorLayout";
import styles from "@/styles/contributor/dashboard.module.scss";
import { useRouter } from "next/router";
import ContributorLayout from "@/components/ContributorLayout";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { columns } from "@/components/tableHeaders/dashboardTable";
import { dashboardinfo } from "@/store/slice/dashboardSlice";

export default function Index() {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.dashboard);
  const router = useRouter();
  const tableData = info?.data?.data?.order_items

  console.log(tableData);
  console.log(info?.data?.data);


  useEffect(() => {
    dispatch(dashboardinfo());
  }, []);
  // const { data, loading } = useSelector((state) => state.contributor);
  let data;
  const fetcher = async (url) => {
    try {
      const { data } = await axios.get(url);
      return data.data.data;
    } catch (error) {
      if (error.response?.status === 401) {
        router.push("/login"); // or whatever your login path is
      }
      throw error;
    }
  };

  // const { data: assets } = useSWR("/contributor/assets", fetcher);

  const assets = [];

  useEffect(() => {
    // dispatch(_getContributorData());
  }, []);

  console.log(data);
  console.log(assets);
  return (
    <ContributorLayout title="dashboard">
      <div className={styles.container}>
        {info?.loading && (!data || !assets) && (
          <MoonLoader
            color="#2f4858"
            size={22}
            cssOverride={{ margin: "10rem auto" }}
          />
        )}
        {!info?.loading && (
        <>
          <div className={`${styles.cards} grid-cols-4 gap-5`}>
            <div className="flex items-center">
              <div>
                <p>Wallet Balance</p>
                <h1>
                  {
                   info?.data?.data?.wallet_balance.split('.')[0]
                  }
                </h1>
              </div>

              <div>
                <img src="/images/wall.png" alt="" />
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <p>Pending Order</p>
                <h1>
                  {Number(
                    info?.data?.data?.total_pending_orders
                  ).toLocaleString()}
                </h1>
              </div>
              <div>
                <img src="/images/pend.png" alt="" />
              </div>
            </div>

            <div className="flex items-center ">
              <div>
                <p>Processed Order</p>
                <h1>
                  &#8358;
                  {Number(
                    info?.data?.data?.total_processing_orders
                  ).toLocaleString()}
                </h1>
              </div>

              <div>
                <img src="/images/procc.png" alt="" />
              </div>
            </div>

            <div className="flex items-center ">
              <div>
                <p>Completed Order</p>
                <h1>
                  &#8358;
                  {Number(
                    info?.data?.data?.total_completed_orders
                  ).toLocaleString()}
                </h1>
              </div>

              <div>
                <img src="/images/comp.png" alt="" />
              </div>
            </div>
            {/* <div>
                <p>Available Balance</p>
                <h1>
                  &#8358;
                  {Number(
                    data?.user?.contributor?.available_balance
                  ).toLocaleString()}
                </h1>
              </div> */}
          </div>

          <div className={styles.downloads}></div>
          <p className="text-2xl pb-2">Revenue Overview</p>
          <img className="mb-16" src="/images/conov.png" alt="" />

          <p className="text-xl font-semibold mb-7">Recent Order</p>

          <DataTable
            emptyMessage="No approved reservations"
            value={tableData}
            // header={searchBar}
            // lazy
            // loading={loading}
            // totalRecords={count}
            // onPage={onPage}
            globalFilterFields={[
              "user_details.name",
              "user_details.phone",
              "reserved_start_time",
              "comment",
            ]}
            // first={first}
            // paginator
            // rows={rows}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "30rem" }}
            // filters={filters}
            style={{ position: "inherit", fontSize:'14px', marginBottom:'14px' }}
            // onSort={(e) => {
            //   handleColumnHeaderClick(e.sortField);
            // }}
          >
            {columns.map((col, i) => {
              return (
                <Column
                  className="text-[13px] mt-[50px]"
                  key={i}
                  sortable={col?.isSort}
                  field={col?.field}
                  header={col.header}
                  body={col.body}
                />
              );
            })}
          </DataTable>
        </>
        )}
      </div>
    </ContributorLayout>
  );
}
