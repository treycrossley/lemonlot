"use client";

import { useState, useEffect, useRef, useMemo, ChangeEvent } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { debounce } from 'lodash';

interface DataTableProps<TData extends Record<string, any>, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onUpdateRow: (id: number, updatedRow: TData) => void; // Callback to handle row updates
  onDeleteRow: (id: number) => void; // Callback to handle row deletion
}

export function DataTable<TData extends Record<string, any>, TValue>({
  columns,
  data,
  onUpdateRow,
  onDeleteRow,
}: DataTableProps<TData, TValue>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editedRowData, setEditedRowData] = useState<TData | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const debouncedSetSearchTerm = useRef(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
    }, 300)
  ).current;

  useEffect(() => {
    debouncedSetSearchTerm(searchTerm);
  }, [searchTerm]);

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    );
  }, [data, debouncedSearchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleEditClick = (row: TData) => {
    console.log('Row data on edit click:', row);
    // Correctly extract `transactionId` from row
    const id = row['transactionId'] as unknown as number;
    console.log('Extracted ID:', id);
    if (id === undefined || id === null) {
      console.error('Invalid row ID:', id);
      return;
    }
    setEditingRowId(id);
    setEditedRowData({ ...row }); // Clone the row data to avoid direct mutation
    console.log('Editing row ID set to:', id);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (editedRowData) {
      console.log('Input changed for key:', key, 'New value:', e.target.value);
      setEditedRowData({
        ...editedRowData,
        [key]: e.target.value
      });
    }
  };

  const handleSave = async () => {
    if (editingRowId !== null && editedRowData) {
        console.log('Saving changes for row ID:', editingRowId, 'Updated data:', editedRowData);
        try {
            const response = await fetch(`http://localhost:8080/api/transactions/update/${editingRowId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedRowData),
            });
            if (response.ok) {
                console.log('Update successful');
                if (typeof onUpdateRow === 'function') {
                    onUpdateRow(editingRowId, editedRowData);
                }
                setEditingRowId(null);
                setEditedRowData(null);
            } else {
                const errorText = await response.text();
                console.error('Failed to update row:', errorText);
            }
        } catch (error) {
            console.error('Error during row update:', error);
        }
    }
  };

  const handleCancel = () => {
    console.log('Edit canceled for row ID:', editingRowId);
    setEditingRowId(null);
    setEditedRowData(null);
  };

  const handleDelete = async (id: number) => {
    console.log('Deleting row ID:', id);
    try {
        const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log('Deletion successful');
            if (typeof onDeleteRow === 'function') {
                onDeleteRow(id);
            }
        } else {
            const errorText = await response.text();
            console.error('Failed to delete row:', errorText);
        }
    } catch (error) {
        console.error('Error during row deletion:', error);
    }
  };

  return (
    <div className="rounded-md border">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 w-full"
          ref={searchInputRef}
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {editingRowId === (row.original['transactionId'] as unknown as number) ? (
                      <input
                        type="text"
                        value={editedRowData ? (editedRowData[cell.column.id] as string) : ''}
                        onChange={(e) => handleInputChange(e, cell.column.id)}
                        className="border rounded-md p-1"
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  {editingRowId === (row.original['transactionId'] as unknown as number) ? (
                    <>
                      <button onClick={handleSave} className="bg-green-500 text-white p-1 rounded">Save</button>
                      <button onClick={handleCancel} className="bg-red-500 text-white p-1 rounded ml-2">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(row.original)} className="bg-blue-500 text-white p-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(row.original['transactionId'] as unknown as number)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}