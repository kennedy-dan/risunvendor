
import Link from "next/link";
  
export const columns = [
  // {
  //   body: tableIndex,
  //   header: "#",
  //   isSort: true,
  //   filter: true,
  // },
  {
    body: (rowData) => {
      return (
        <div className="notranslate">
          <Link href={`/admin/reservations/details/${rowData?.id}/`}>
            <p className="underline capitalize underline-offset-4 hover:text-blue-300 ">{rowData.user_details.name}</p>
          </Link>
        </div>
      );
    },
    field: "name",
    header: "S/N",
    // isSort: true,
    sortable: "name",
    filter: true,
  },

  {
    body: (rowData) => rowData.user_details.phone,
    header: "Order number",
    // isSort: true,
    field: "phone",
    filter: true,
  },

  // {
  //   body: (rowData) =>
  //     rowData.deposit_paid ? rowData.deposit_paid : "No Deposit",
  //   header: "Amount",
  //   isSort: true,
  //   field: "amount",
  //   filter: true,
  // },

  {
    field: "number",
    header: "Customer Name",
    // isSort: true,

    filter: true,
  },

  {
  //   body: dateFormat,
    header: "Product Details",
    // isSort: true,
    field: "reserved_start_time",
    filter: true,
  },

  {
    body: (rowData) => rowData.comment,
    header: "Date Assigned",
    // isSort: true,
    field: "comment",
    filter: true,
  },

  {
  //   body: depositPaid,
    header: "Due Date",
    field: "deposit_paid",
    filter: true,
  },
  {
    header: "Amount",
    // isSort: true,
    field: "has_food",
    filter: true,
    body: (rowData) =>
      rowData.has_food ? (
        <div className="flex items-center h-4 px-4 py-3 bg-green-200 rounded-md w-fit">
          <p className="font-semibold text-green-900">Yes</p>
        </div>
      ) : (
        <div className="flex items-center h-4 px-4 py-3 bg-red-200 rounded-md w-fit">
          <p className="font-semibold text-red-900">No</p>
        </div>
      ),
  },

  {
      //   body: depositPaid,
        header: "Status",
        field: "deposit_paid",
        filter: true,
      },

  // {
  //   header: "Action",
  // },
];
