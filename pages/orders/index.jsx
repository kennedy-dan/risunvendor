import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Icons, Search } from "@/public/svgs/icons";
// import { disableAsset, requestAssetActivation } from "services/contributor";
// import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import Info from "@/components/Info";
import Link from "next/link";
import Image from "next/image";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import NoImagePlaceholder from "@/public/svgs/no-image-placeholder.svg";
import ContributorLayout from "@/components/ContributorLayout";
import styles from "@/styles/contributor/content/index.module.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { columns } from "@/components/tableHeaders/dashboardTable";
const Order = () => {
    return (
        <ContributorLayout title="Order">
        <div className={styles.container}>
          <div className={styles.header}>
            <div className='flex items-center w-[20rem] space-x-1 border-1 border border-gray-500 rounded-md   px-2 h-[4rem] ' >
            <div className='' >
                <img src='/images/searchh.png' alt='' className='  ' />
              </div>
              <input
                type="text"
                placeholder="Search..."
                // value={searchQuery}
                // onChange={handleSearch}
                className="outline-none"
              />
          
  
            </div>
            <div className='flex space-x-3' >
              <div>
                <img src='/images/filterr.png' />
              </div>
            {/* <Link href="/orders/1">Upload Content</Link> */}
  
            </div>
          </div>
          
          <DataTable
        emptyMessage="No approved reservations"
        // value={reservations}
        // header={searchBar}
        lazy
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
        paginator
        // rows={rows}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "30rem" }}
        // filters={filters}
        style={{ position: "inherit" }}
        // onSort={(e) => {
        //   handleColumnHeaderClick(e.sortField);
        // }}
      >
        {columns.map((col, i) => {
          return (
            <Column
              className="text-xs"
              key={i}
              sortable={col?.isSort}
              field={col?.field}
              header={col.header}
              body={ col.body}
            />
          );
        })}
      </DataTable>
          </div>
          </ContributorLayout>
    )
}

export default Order