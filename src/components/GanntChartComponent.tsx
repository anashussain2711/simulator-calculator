"use client";
import { getData } from "@components/utils/getData";
import GanttChartView from "../../public/DlhSoft.ProjectData.GanttChart.React.Components.js";

function GanttChartComponent() {
    return (
        <>
            <GanttChartView
                items={getData().items}
                settings={getData().settings}
                // license={license}
                // change={onItemChanged}
                style={{ width: "960px", height: "350px" }}
                path={"./"}
            >
                
            </GanttChartView>
        </>
    );
}

export default GanttChartComponent;
