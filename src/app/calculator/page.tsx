"use client";

import DropDownSelect from "@components/components/Dropdown";
import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import {
  ArrivalDistributionType,
  ServiceDistributionType,
} from "@components/types/DistributionType";
import {
  calculateMMRho,
  calculateMMP0,
  calculateMMLq,
  calculateMMWq,
  calculateMMLs,
  calculateMMWs,
} from "../../utils/getMMProperties";
import { selectDistribution } from "@components/utils/selectDistribution";
import React, { useEffect, useState } from "react";
import ConditionalInputs from "./ConditionalInputs";
import Header1 from "@components/components/Header";

const Page = () => {
  const [arrival, setArrival] = useState<string | undefined>();
  const [service, setService] = useState<string | undefined>();
  const [serverCount, setServerCount] = useState(1);
  const [distributionType, setDistributionType] = useState<string>();

  const arrival_options: {
    label: ArrivalDistributionType;
    value: ArrivalDistributionType;
  }[] = [
      { label: "Poisson", value: "Poisson" },
      { label: "Uniform", value: "Uniform" },
      { label: "Normal", value: "Normal" },
    ];

  const service_options: {
    label: ServiceDistributionType;
    value: ServiceDistributionType;
  }[] = [
      { label: "Exponential", value: "Exponential" },
      { label: "Uniform", value: "Uniform" },
      { label: "Normal", value: "Normal" },
      { label: "Gamma", value: "Gamma" },
    ];

  useEffect(() => {
    setDistributionType(
      selectDistribution(
        arrival as ArrivalDistributionType,
        service as ServiceDistributionType,
        serverCount
      )
    );
    console.log(distributionType);
  }, [arrival, service]);

  return (
    <>
      <Header1 />
      <div
        className="p-6 qaim-background light"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: "url('https://xmple.com/wallpaper/red-graph-paper-grid-3840x2160-c2-8d0d19-ef0219-l2-5-115-a-0-f-20.svg')",
          // background: "linear-gradient(75deg, #a4e8ff, #d6e7ff, #91c4ff)",
        }}
      >
        <div
          style={{
            zIndex: 2,
            position: "relative",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            className="mb-5 text-xl font-semibold text-center"
            style={{
              color: "black",
              fontSize: "100px",
              fontWeight: "bold",
              textAlign: "center",
              padding: "50px 0",
              // color: "white",
            }}
          >
            Queueing Calculator
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
            }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
              <h2 style={{
                textAlign: "center",
                marginBottom: "10px",
                fontSize: "30px",
                fontWeight: "700",
              }}>Select Options</h2>
              <DropDownSelect
                id="example-dropdown"
                label="Arrival distribution"
                options={arrival_options}
                value={arrival}
                className="blur-container"

                setValue={setArrival}
                placeholder="Pick an option..."
              />

              <DropDownSelect
                id="example-dropdown"
                className="blur-container"
                label="Service distribution"
                options={service_options}
                value={service}
                setValue={setService}
                placeholder="Pick an option..."
              />
              {distributionType === "M/M/1" && (
                <div>
                  <Label htmlFor="email">No. of servers</Label>{" "}
                  <Input
                    type="number"
                    value={serverCount}
                    className="blur-container"
                    onChange={(e) => setServerCount(+e.target.value)}
                  />
                </div>
              )}
              {((arrival && service) && (!distributionType?.startsWith("G/M/"))) && (
                <h2 
                className="blur-container"
                style={{
                  textAlign: "center",
                  marginBottom: "10px",
                  fontSize: "20px",
                  fontWeight: "700",
                  padding: "20px",
                  borderRadius: "40px",
                  marginTop: "20px",
                }}>{distributionType}</h2> 
              )}
            </div>
            {(arrival && service) && (
              <ConditionalInputs
                distributionType={distributionType as any}
                arrival={arrival as string}
                service={service as string}
                serverCount={serverCount}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
