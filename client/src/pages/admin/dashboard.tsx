import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import data from "@/components/dashboard/data.json";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-3 md:gap-4">
        <SectionCards />
        <ChartAreaInteractive />
        <DataTable data={data} />
      </div>
    </>
  );
}
