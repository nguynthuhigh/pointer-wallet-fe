import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
export const ChartDoughnut = ({ ...props }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
  };
  return (
    <div className="w-[180px]">
      <Doughnut
        data={{
          labels: ["VND", "USD", "ETH"],
          datasets: [
            {
              label: "Votes",
              data: [props.vnd, props.usd, props.eth],
              backgroundColor: ["#71A4FA", "#A9FFC7", "#FF62B8"],
              borderColor: ["#D1E9FF", "#D1FADF", "#F6FEF9"],
              borderRadius: 3,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export const ChartDoughnutLoading = () => {
  return <></>;
};
