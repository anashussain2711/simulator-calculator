import { Input } from "@components/components/ui/input";
import { Label } from "@components/components/ui/label";
import {
  calculateGGLq,
  calculateGGLs,
  calculateGGWq,
  calculateGGWs,
} from "@components/utils/getGGProperties";
import {
  calculateMGLq,
  calculateMGLs,
  calculateMGWq,
  calculateMGWs,
} from "@components/utils/getMGProperties";
import {
  calculateMMLq,
  calculateMMLs,
  calculateMMP0,
  calculateMMRho,
  calculateMMWq,
  calculateMMWs,
} from "@components/utils/getMMProperties";
import React, { useState } from "react";

function ConditionalInputs({
  distributionType,
  arrival,
  service,
  serverCount,
}: {
  distributionType: string;
  arrival: string;
  service: string;
  serverCount: number;
}) {
  const [lambda, setLambda] = useState("0.1");
  const [meu, setMeu] = useState("0.125");
  const [variance, setVariance] = useState(0);
  const [upperLimit, setUpperLimit] = useState(1);
  if (distributionType.startsWith("M/M/")) {
    return (
      <div style={{
        paddingLeft: "20px",
        borderLeft: "1px solid rgb(66, 66, 66)",
      }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            gap: "20px",

          }}
        >
          <div>
            <Label htmlFor="email">Lambda</Label>{" "}
            <Input
              className="blur-container"
              type="number"
              value={lambda}
              onChange={(e) => setLambda(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Meu</Label>{" "}
            <Input
              className="blur-container"
              type="number"
              value={meu}
              onChange={(e) => setMeu(e.target.value)}
            />
          </div>
        </div>
        <div
          className="properties-calculator-qaim"
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Properties
          </h2>
          <div>
            <div className="flex table-row-qaim">
              <div>P<sub>(Utilization Factor)</sub></div>
              <div>{calculateMMRho(+lambda, +meu, serverCount)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Po<sub>(Initial Utilization Factor)</sub></div>
              <div>{calculateMMP0(+lambda, +meu, serverCount)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Lq<sub>(Mean no of Customers in Queue)</sub></div>
              <div>{calculateMMLq(+lambda, +meu, serverCount)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Ls<sub>(Mean no of Customers in System)</sub></div>
              <div>{calculateMMLs(+lambda, +meu, serverCount)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Ws<sub>(Wait of Customers in Queue)</sub></div>
              <div>{calculateMMWq(+lambda, +meu, serverCount)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Ws<sub>(Wait of Customers in System)</sub></div>
              <div>{calculateMMWs(+lambda, +meu, serverCount)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (distributionType === "M/G/1" && arrival === "Poisson") {
    return (
      <div style={{
        paddingLeft: "20px",
        borderLeft: "1px solid rgb(66, 66, 66)",
      }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          <div>
            <Label htmlFor="email">Lambda</Label>{" "}
            <Input
              className="blur-container"

              type="number"
              value={lambda}
              onChange={(e) => setLambda(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Meu</Label>{" "}
            <Input
              className="blur-container"
              type="number"
              value={meu}
              onChange={(e) => setMeu(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Variance</Label>{" "}
            <Input
              className="blur-container"

              type="number"

              value={variance}
              onChange={(e) => setVariance(+e.target.value)}
            />
          </div>
        </div>
        <div
          className="properties-calculator-qaim"

          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Properties
          </h2>
          <div>
            <div className="flex table-row-qaim">
              <div>Ls<sub>(Mean no of Customers in System)</sub></div>
              <div>{calculateMGLs(+lambda, +meu, variance)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Lq<sub>(Mean no of Customers in Queue)</sub></div>
              <div>{calculateMGLq(+lambda, +meu, variance)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Ws<sub>(Wait of Customers in Queue)</sub></div>
              <div>{calculateMGWq(+lambda, +meu, variance)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Ws<sub>(Wait of Customers in System)</sub></div>
              <div>{calculateMGWs(+lambda, +meu, variance)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (
    distributionType === "G/G/1" &&
    (arrival === "Uniform" || arrival === "Normal" || arrival === "Gamma") &&
    (service === "Uniform" || service === "Normal" || service === "Gamma")
  ) {
    return (
      <div style={{
        paddingLeft: "20px",
        borderLeft: "1px solid rgb(66, 66, 66)",
      }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          <div>
            <Label htmlFor="email">Lambda</Label>{" "}
            <Input
              className="blur-container"

              type="number"
              value={lambda}
              onChange={(e) => setLambda(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Meu</Label>{" "}
            <Input
              className="blur-container"

              type="number"
              value={meu}
              onChange={(e) => setMeu(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Variance</Label>{" "}
            <Input
              className="blur-container"
              type="number"
              value={variance}
              onChange={(e) => setVariance(+e.target.value)}
            />
          </div>
        </div>
        <div
          className="properties-calculator-qaim"

          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Properties
          </h2>
          <div>
            <div className="flex table-row-qaim">
              <div>Ls<sub>(Mean no of Customers in System)</sub></div>
              <div>{calculateGGLs(+lambda, +meu, variance)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Lq<sub>(Mean no of Customers in Queue)</sub></div>
              <div>{calculateGGLq(+lambda, +meu, variance)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Ws<sub>(Wait of Customers in Queue)</sub></div>
              <div>{calculateGGWq(+lambda, +meu, variance)}</div>
            </div>
            <div className="flex table-row-qaim">
              <div>Ws<sub>(Wait of Customers in System)</sub></div>
              <div>{calculateGGWs(+lambda, +meu, variance)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConditionalInputs;
