import {
    ArrivalDistributionType,
    DistributionType,
    ServiceDistributionType,
} from "@components/types/DistributionType";

export const selectDistribution = (
    interArrival: ArrivalDistributionType,
    service: ServiceDistributionType,
    serverCount: number
) => {
    let arrivalDist = "";
    let serviceDist = "";
    if (interArrival === "Poisson") {
        arrivalDist = "M";
    } else {
        arrivalDist = "G";
    }

    if (service === "Exponential") {
        serviceDist = "M";
    } else {
        serviceDist = "G";
    }
    return `${arrivalDist}/${serviceDist}/${serverCount}` as DistributionType;
};
