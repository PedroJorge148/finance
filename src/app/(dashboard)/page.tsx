import { DataGrid } from '@/components/data-grid'
import { DataChart } from '@/components/data-charts'

export default function DashboardPage() {
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
      <DataGrid />
      <DataChart />
    </div>
  )
}
