"use client"
import {ColumnDef} from "@tanstack/react-table"

export type Transaction = {
    transaction_id : number
    user_id : number
    salesperson_id : number
    car_id : number
    date : string
    amount : number
    status : string
    payment_method : string
    offer_amount : string
    comments : string
    created_at : string
    updated_at : string
}

const columns : ColumnDef<Transaction>[] = [
    {
        accessorKey: "transactionId",
        header: "Transaction ID",
    },
    {
        accessorKey: "userId",
        header: "User ID",
    },
    {
        accessorKey: "salespersonId",
        header: "Salesperon ID",
    },
    {
        accessorKey: "carId",
        header: "Car ID",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        }
        
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "payment_method",
        header: "Payment Method",
    },
    {
        accessorKey: "offerAmount",
        header: "Offer Amount",
    },
    {
        accessorKey: "comments",
        header: "Comments",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
    }
]
export default columns;
