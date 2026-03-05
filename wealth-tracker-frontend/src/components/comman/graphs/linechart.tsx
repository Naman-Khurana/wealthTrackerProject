"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

type Dataset = {
  label: string
  data: number[]
  borderColor: string
}

type Props = {
  labels: string[]
  datasets: Dataset[]
  yAxisLabel?: string
}

export default function LineChart({ labels, datasets, yAxisLabel }: Props) {

  const data = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      fill: false,
      tension: 0.2
    }))
  }

  const options = {
    responsive: true,
     maintainAspectRatio: false,
     tension: 0.35,
pointRadius: 3,
    scales: {
      y: {
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel
        },
        min: 0
      }
    }
  }

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  )
}