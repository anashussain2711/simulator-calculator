"use client";
import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BarChart } from "@components/components/BarChart";
import { DataPointGannt } from "@components/types/DataPointGannt";
import { Table2Data } from "@components/types/Table2Data";
import { calculateAverage } from "@components/utils/calculateAverage";
import { calculateWaitingCustomerProbability } from "@components/utils/calculateProbabilityOfWaitingCustomer";
import { constructBarChart } from "@components/utils/constructBarChart";
import { TableType } from "@components/types/Table1Data";
import { constructTable2 } from "@components/utils/constructTable2";
import { calculateFactorial } from "@components/utils/calculateFactorial";
import { calculateServerUtilization } from "@components/utils/calculateServerUtilization";
import Graph from "@components/components/Graph";
import { Label } from "@components/components/ui/label";
import { Input } from "@components/components/ui/input";
import Header1 from "@components/components/Header";

const table1Cols = [
  "No.",
  "C.P",
  "C.P Lookup",
  "I.A",
  "Arrival",
  "Service Time",
];
const table2Cols = [
  "Customer",
  "Arrival",
  "Start",
  "End",
  "Turnaround",
  "Wait",
  "Response",
];

const tableStyles = {
  tableCellText: "center",
  tableCellStyle: {
    borderLeft: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    paddingTop: "25px",
    paddingBottom: "25px",
    outerHeight: "30px",
    fontSize: 14,
    fontWeight: "bold",
  },
  orderStatusStyle: {
    color: "green",
    fontWeight: "bold",
  },
};

function CalculatorPage() {
  const [lambda, setLambda] = useState("2.67");
  const [meu, setMeu] = useState("5.45");
  const [serverCount, setServerCount] = useState(1);
  // const [lambda, setLambda] = useState("");
  // const [meu, setMeu] = useState("");
  const [table1, setTable1] = useState<TableType>();
  const [barChartData, setBarChartData] = useState<{
    datasets: DataPointGannt[];
    xMaxValue: number;
    xLabels: number[];
  }>();
  const [table2, setTable2] = useState<Table2Data[]>();

  const table: TableType = {
    probability: [],
    cpLookUp: [],
    interArrival: [],
    arrival: [],
    service: [],
  };

  const constructInterArrivals = () => {
    for (let i = 0; i < table.cpLookUp.length; i++) {
      const randomNum = Math.random();
      for (let j = 0; j < table.cpLookUp.length - 1; j++) {
        const lowerBound = table.cpLookUp[j];
        const upperBound = table.cpLookUp[j + 1];
        if (randomNum >= lowerBound && randomNum <= upperBound) {
          table.interArrival[i] = j;
          table.arrival[i] =
            i === 0 ? 0 : table.arrival[i - 1] + table.interArrival[i];
          break;
        }
      }
    }
  };

  const constructService = () => {
    for (let i = 0; i < table.cpLookUp.length; i++) {
      const serviceTime = -5.45 * Math.log(Math.random());
      table.service[i] = Math.ceil(serviceTime);
    }
  };

  const summation = (
    lowerLimit: number,
    upperLimit: number | (() => boolean),
    fn: (x: number) => number
  ) => {
    let sum = 0;
    let x = lowerLimit;

    while (typeof upperLimit === "number" ? x <= upperLimit : upperLimit()) {
      sum += fn(x);

      table.probability.push(sum);
      table.cpLookUp.push(
        table.cpLookUp.length === 0
          ? 0
          : table.probability[table.probability.length - 2]
      );

      x++;
    }

    return sum;
  };

  const handleCalc = () => {
    //  SUM (e-^l * l^x)/x!

    summation(
      0,
      () =>
        table.probability.length > 0
          ? Number(table.probability[table.probability.length - 1].toFixed(4)) <
            1
          : true,
      (x) => (Math.E ** -2.65 * 2.65 ** x) / calculateFactorial(x)
    );
    constructInterArrivals();
    constructService();
    setTable1(table);
    const barChartData = constructBarChart(table, serverCount);
    setBarChartData(barChartData);
    calculateServerUtilization(serverCount, barChartData.datasets, 50);
    setTable2(constructTable2(table, serverCount));
    console.log(table);
  };

  // console.log(barChartData?.datasets)
  return (
    <>
      <Header1 />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: '100vh',
          background: "linear-gradient(75deg, #ffa4a4, #ffd6d6, #ff9191)",
          // background: "linear-gradient(75deg, #a4e8ff, #d6e7ff, #91c4ff)",
        }}
      >
        <h1 className="mb-5 text-xl font-semibold text-center"
          style={{
            color: "black",
            fontSize: "50px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "30px 0",
            // color: "white",
          }}
        >Simulator</h1>
        {/* <div className="flex-col items-end justify-center gap-3"> */}
        <div className="flex items-end justify-center gap-3">
          <div>
            <Label htmlFor="email">Lambda</Label>{" "}
            <Input
              style={{
                background: 'white',
                border: "1px solid #000000",
                padding: "10px",
                borderRadius: "5px",
              }}
              type="number"
              value={lambda}
              onChange={(e) => setLambda(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Meu</Label>{" "}
            <Input
              style={{
                border: "1px solid #000000",
                background: 'white',
                padding: "10px",
                borderRadius: "5px",
              }}
              type="number"
              value={meu}
              onChange={(e) => setMeu(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">No. of servers</Label>{" "}
            <Input
              style={{
                border: "1px solid #000000",
                padding: "10px",
                borderRadius: "5px",
                background: 'white',
                // marginBottom: "10px",
              }}
              type="number"
              value={serverCount}
              onChange={(e) => setServerCount(+e.target.value)}
            />
          </div>
          <button
            onClick={handleCalc}
            className="p-1 rounded-md bg-red-600 hover:bg-red-700 text-white"
            // className="p-1 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            Calculate
          </button>
        </div>
        {table1 && (
          <div className="flex justify-center mt-14">
            <TableContainer
              component={Paper}
              sx={{
                width: {
                  sm: 500,
                  md: 600,
                  lg: 1200,
                  xl: 1400,
                },
                marginBottom: 5,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow className="bg-slate-800">
                    {table1Cols &&
                      table1Cols.map((col) => (
                        <TableCell
                          key={col}
                          align="center"
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 17,
                            borderRight: "1px solid #ccc",
                            backgroundColor: "#0891b2",
                          }}
                        >
                          {col}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table1.arrival.map((_, i) => (
                    <TableRow key={i} className="hover:bg-slate-100 group">
                      <TableCell
                        align="center"
                        style={tableStyles.tableCellStyle}
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={tableStyles.tableCellStyle}
                      >
                        {table1.probability[i]}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={tableStyles.tableCellStyle}
                      >
                        {table1.cpLookUp[i]}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={tableStyles.tableCellStyle}
                      >
                        {table1.interArrival[i]}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={tableStyles.tableCellStyle}
                      >
                        {table1.arrival[i]}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={tableStyles.tableCellStyle}
                      >
                        {table1.service[i]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {barChartData && (
          <BarChart
            chartData={{
              labels: ["Server"],
              datasets: barChartData.datasets,
            }}
            xMaxValue={barChartData.xMaxValue}
            xLabels={barChartData.xLabels}
            serverCount={serverCount}
          />
        )}

        {table2 && table2?.length > 0 && (
          <>
            <div className="flex justify-center mt-14">
              <TableContainer
                component={Paper}
                sx={{
                  width: {
                    sm: 500,
                    md: 600,
                    lg: 1200,
                    xl: 1400,
                  },
                  marginBottom: 5,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow className="bg-slate-800">
                      {table2Cols &&
                        table2Cols.map((col) => (
                          <TableCell
                            key={col}
                            align="center"
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 17,
                              borderRight: "1px solid #ccc",
                              backgroundColor: "#0891b2",
                            }}
                          >
                            {col}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {table2.map((data, i) => (
                      <TableRow key={i} className="hover:bg-slate-100 group">
                        <TableCell
                          align="center"
                          style={tableStyles.tableCellStyle}
                        >
                          C{i + 1}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={tableStyles.tableCellStyle}
                        >
                          {data.arrival}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={tableStyles.tableCellStyle}
                        >
                          {data.start}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={tableStyles.tableCellStyle}
                        >
                          {data.end}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={tableStyles.tableCellStyle}
                        >
                          {data.turnAround}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={tableStyles.tableCellStyle}
                        >
                          {data.wait}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={tableStyles.tableCellStyle}
                        >
                          {data.wait}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <ul className="p-5 mx-5 mt-4 space-y-3 bg-white rounded-lg shadow-md">
              <li className="font-medium text-gray-700 transition-colors list-item hover:text-blue-600">
                <span className="font-bold">Avg Turnaround Time:</span>{" "}
                {calculateAverage(table2, "turnAround")}
              </li>
              <li className="font-medium text-gray-700 transition-colors list-item hover:text-blue-600">
                <span className="font-bold">Avg Wait Time:</span>{" "}
                {calculateAverage(table2, "wait")}
              </li>
              <li className="font-medium text-gray-700 transition-colors list-item hover:text-blue-600">
                <span className="font-bold">Avg Response Time:</span>{" "}
                {calculateAverage(table2, "wait")}
              </li>
              <li className="font-medium text-gray-700 transition-colors list-item hover:text-blue-600">
                <span className="font-bold">Avg Service Time:</span>{" "}
                {calculateAverage(table2, "service")}
              </li>
              <li className="font-medium text-gray-700 transition-colors list-item hover:text-blue-600">
                <span className="font-bold">Avg Interarrival Time:</span>{" "}
                {calculateAverage(table2, "interArrival")}
              </li>
              <li className="font-medium text-gray-700 transition-colors list-item hover:text-blue-600">
                <span className="font-bold">
                  Probability Of Waiting Customer:
                </span>{" "}
                {calculateWaitingCustomerProbability(table2)}
              </li>
              <li className="font-medium text-gray-700 transition-colors list-item hover:text-blue-600">
                <span className="font-bold">Server Utilization:</span>
                {barChartData &&
                  calculateServerUtilization(
                    serverCount,
                    barChartData.datasets,
                    Math.max(...table2.map((table) => table.end))
                  )}
              </li>
            </ul>
            {table2 && (
              <>
                <h1 className="mt-5 text-2xl font-semibold text-center">
                  Visualizing Via Graphs
                </h1>
                <Graph data2={table2} metric="wait" title="Waiting Time" />
                <Graph
                  data2={table2}
                  metric="turnAround"
                  title="Turnaround Time"
                />
                <Graph data2={table2} metric="service" title="Service Time" />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default CalculatorPage;
