import { ChevronDown, ChevronUp, ExternalLink, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useId, useMemo, useState, useEffect } from "react";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { NavLink as Link, useNavigate } from "react-router";
import api from "@/lib/api";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

type Item = {
  id: string;
  name: string;
  status: Array<"Operational" | "Warning" | "Critical" | "Inactive">;
  output: number;
  capacity: number;
  area: number;
};

const columns: ColumnDef<Item>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => (
      <div className="font-medium opacity-40">{row.getValue("id")}</div>
    ),
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <Link to={`/arrays/${row.getValue("id")}`} className="font-medium">
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string[];
      return (
        <div className="flex gap-1">
          {status.map((status) => {
            const styles = {
              Operational: "bg-emerald-400/20 text-emerald-500",
              Warning: "bg-indigo-400/20 text-indigo-500",
              Critical: "bg-amber-400/20 text-amber-500",
              Inactive: "bg-rose-400/20 text-rose-500",
            }[status];

            return (
              <div
                key={status}
                className={cn(
                  "flex size-5 items-center justify-center rounded text-xs font-medium",
                  styles
                )}
              >
                {status.charAt(0)}
              </div>
            );
          })}
        </div>
      );
    },
    enableSorting: false,
    meta: {
      filterVariant: "select",
    },
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue(id);
      return Array.isArray(rowValue) && rowValue.includes(filterValue);
    },
  },
  {
    header: "Output (Wh)",
    accessorKey: "output",
    cell: ({ row }) => {
      const output = parseInt(row.getValue("output"));
      return (
        new Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(output) + "Wh"
      );
    },
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "Capacity (W)",
    accessorKey: "capacity",
    cell: ({ row }) => <div>{row.getValue("capacity")}W</div>,
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "Area (m²)",
    accessorKey: "area",
    cell: ({ row }) => {
      return <div>{row.getValue("area")} m²</div>;
    },
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => (
      <div className="flex items-start justify-start overflow-hidden">
        <DestructiveButton id={row.getValue("id")} />
      </div>
    ),
    enableSorting: false,
  },
];

function ArraysTable() {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchArrays() {
      try {
        const res = await api.get("/arrays");

        const transformedItems: Item[] = res.data.map((item: any) => {
          const panels = item.data ? JSON.parse(item.data) : [];

          const status = panels.some((panel: any) => panel.peak < 200)
            ? ["Operational", "Warning"]
            : ["Operational"];

          const totalPeakOutput = panels.reduce((sum: number, panel: any) => {
            const fluctuation = (Math.random() * 0.1 - 0.05) * panel.peak;
            return sum + Math.max(0, panel.peak + fluctuation);
          }, 0);

          return {
            id: item.id || "",
            name: item.name || "",
            status,
            output: totalPeakOutput,
            area: item.width * item.height,
            capacity: item.capacity || 0,
          };
        });

        setItems(transformedItems);
      } catch (err) {
        console.error("Failed to fetch arrays:", err);
      }
    }

    fetchArrays();
  }, []);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "output",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data: items,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  });

  return (
    <div className="space-y-6 bg-background">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 flex-1 ">
        {/* Search input */}
        <div className="w-44">
          <Filter column={table.getColumn("name")!} />
        </div>
        {/* Intents select */}
        <div className="w-36">
          <Filter column={table.getColumn("status")!} />
        </div>
        {/* Volume inputs */}
        <div className="w-36">
          <Filter column={table.getColumn("output")!} />
        </div>
        {/* CPC inputs */}
        <div className="w-36">
          <Filter column={table.getColumn("capacity")!} />
        </div>
        {/* Traffic inputs */}
        <div className="w-36">
          <Filter column={table.getColumn("area")!} />
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="relative h-10 select-none border-t"
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "none"
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer select-none items-center justify-between gap-2"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (
                            header.column.getCanSort() &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ChevronUp
                              className="shrink-0 opacity-60"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <ChevronDown
                              className="shrink-0 opacity-60"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <span className="size-4" aria-hidden="true" />
                        )}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
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

function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader =
    typeof column.columnDef.header === "string" ? column.columnDef.header : "";
  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range") return [];

    const values = Array.from(column.getFacetedUniqueValues().keys());

    const flattenedValues = values.reduce((acc: string[], curr) => {
      if (Array.isArray(curr)) {
        return [...acc, ...curr];
      }
      return [...acc, curr];
    }, []);

    return Array.from(new Set(flattenedValues)).sort();
  }, [column.getFacetedUniqueValues(), filterVariant]);

  if (filterVariant === "range") {
    return (
      <div className="space-y-2">
        <Label>{columnHeader}</Label>
        <div className="flex">
          <Input
            id={`${id}-range-1`}
            className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value ? Number(e.target.value) : undefined,
                old?.[1],
              ])
            }
            placeholder="Min"
            type="number"
            aria-label={`${columnHeader} min`}
          />
          <Input
            id={`${id}-range-2`}
            className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value ? Number(e.target.value) : undefined,
              ])
            }
            placeholder="Max"
            type="number"
            aria-label={`${columnHeader} max`}
          />
        </div>
      </div>
    );
  }

  if (filterVariant === "select") {
    return (
      <div className="space-y-2">
        <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger id={`${id}-select`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem key={String(value)} value={String(value)}>
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer ps-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Search size={16} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export { ArraysTable };

function DestructiveButton({
  className,
  id,
  ...props
}: React.ComponentProps<"button"> & { id: string }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await api.delete(`/arrays/${id}`);

      navigate(0);
    } catch (error) {
      console.error("Failed to delete array:", error);
      navigate(0);
    }
  };

  return (
    <button
      className={cn("delete-button group", className)}
      onClick={handleDelete}
      type="button"
    >
      <svg viewBox="0 0 448 512">
        <path
          className="fill-red-500 group-hover:fill-white"
          d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
        ></path>
      </svg>
    </button>
  );
}
