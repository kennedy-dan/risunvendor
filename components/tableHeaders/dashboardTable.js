
  import Link from "next/link";
  console.log('rowDat')
  
  export const columns = [
    // {
    //   body: tableIndex,
    //   header: "#",
    //   isSort: true,
    //   filter: true,
    // },
    {
      body: (rowData, options) => {
        console.log(rowData, options)
        return (
          <div className="notranslate">
            <Link href={`/admin/reservations/details/${rowData?.id}/`}>
            <div> {options.rowIndex + 1}</div>
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
      body: (rowData) => {
        console.log(rowData.id)
        return(<Link href={`/orders/${rowData?.id}`} ><p className="text-blue-500" >{rowData.id}</p></Link>)},
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
      // body: 'yes',
      filter: true,
    },
  
    {
    //   body: dateFormat,
      header: "Product Details",
      body: (rowData) => {
        console.log(rowData.id)
        return(<p>{rowData?.deliverable?.title}</p>)},
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
      body: (rowData) =>{
        return(<p>{rowData?.purchase_price}</p>)},
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
  