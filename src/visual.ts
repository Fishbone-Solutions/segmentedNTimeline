"use strict";
import * as React from "react";
import * as ReactDOM from "react-dom";
import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import { VisualSettings } from "./settings";
import VisualObjectInstance = powerbi.VisualObjectInstance;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import "./../style/visual.less";
import { segmentedBar, initialState } from "./SegmentedBar";
import * as moment from "moment";

export class Visual implements IVisual {
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;
    private settings: VisualSettings;
    private columnIndices: { [key: string]: number };

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.reactRoot = React.createElement(segmentedBar, {});
        ReactDOM.render(this.reactRoot, this.target);
        this.columnIndices = {};
        for (let i = 1; i <= 15; i++) {
            let name = "c" + i;
            this.columnIndices[name] = 0;
        }
    }

    private clear() {
        segmentedBar.update(initialState);
    }

    public update(options: VisualUpdateOptions) {
        if (options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];
            this.settings = <VisualSettings>VisualSettings.parse(dataView);
            const object = this.settings.circle;
            this.findColumns(options.dataViews[0].metadata.columns);
            let rows = options.dataViews[0].table.rows;
            let activityIDList: string[] = [];
            let categoryList: string[] = [];
            let activityNameList: string[] = [];
            let statusNameList: string[] = [];
            let startDateList: string[] = [];
            let finishDateList: string[] = [];
            let projectedStartDateList: string[] = [];
            let projectedFinishDateList: string[] = [];
            let ownerList: string[] = [];
            let predecessorsList: string[] = [];
            let successorsList: string[] = [];
            let commentaryList: string[] = [];
            let totalFloatList: string[] = [];
            let trendLists: string[] = [];
            let lastReportedEndDateList: string[] = [];

            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                activityIDList[i] = `${row[this.columnIndices["c1"]] || ""}`;
                categoryList[i] = `${row[this.columnIndices["c2"]] || ""}`;
                activityNameList[i] = `${row[this.columnIndices["c3"]] || ""}`;
                statusNameList[i] = `${row[this.columnIndices["c4"]] || ""}`;

                // Use formatDate for all date fields
                startDateList[i] = this.formatDate(row[this.columnIndices["c5"]]);
                finishDateList[i] = `${row[this.columnIndices["c6"]]}`;
                projectedStartDateList[i] = this.formatDate(row[this.columnIndices["c7"]]);
                projectedFinishDateList[i] = this.formatDate(row[this.columnIndices["c8"]]);
                
                ownerList[i] = `${row[this.columnIndices["c9"]] || ""}`;
                predecessorsList[i] = `${row[this.columnIndices["c10"]] || ""}`;
                successorsList[i] = `${row[this.columnIndices["c11"]] || ""}`;
                commentaryList[i] = `${row[this.columnIndices["c12"]] || ""}`;
                totalFloatList[i] = `${row[this.columnIndices["c13"]] || ""}`;
                trendLists[i] = `${row[this.columnIndices["c14"]] || ""}`;
                lastReportedEndDateList[i] = this.formatDate(row[this.columnIndices["c15"]]);
            }

            segmentedBar.update({
                Segment1Color: object && object.Segment1Color ? object.Segment1Color : undefined,
                Segment2Color: object && object.Segment2Color ? object.Segment2Color : undefined,
                Segment3Color: object && object.Segment3Color ? object.Segment3Color : undefined,
                Segment4Color: object && object.Segment4Color ? object.Segment4Color : undefined,
                Segment5Color: object && object.Segment5Color ? object.Segment5Color : undefined,
                Segment6Color: object && object.Segment6Color ? object.Segment6Color : undefined,
                textColor: object && object.textColor ? object.textColor : undefined,
                SidetextColor: object && object.SidetextColor ? object.SidetextColor : undefined,
                activityIDList: activityIDList,
                categoryList: categoryList,
                activityNameList: activityNameList,
                statusNameList: statusNameList,
                startDateList: startDateList,
                finishDateList: finishDateList,
                projectedStartDateList: projectedStartDateList,
                projectedFinishDateList: projectedFinishDateList,
                ownerList: ownerList,
                predecessorsList: predecessorsList,
                successorsList: successorsList,
                commentaryList: commentaryList,
                totalFloatList: totalFloatList,
                trendLists: trendLists,
                lastReportedEndDateList: lastReportedEndDateList,
                backgroundColorVis: object && object.circleColor ? object.circleColor : undefined,
            });
        } else {
            this.clear();
        }
    }

    private findColumns(columns: DataViewMetadataColumn[]) {
        for (let name in this.columnIndices) {
            for (let j = 0; j < columns.length; j++) {
                let columnRoles = columns[j].roles;
                if (columnRoles && Object.keys(columnRoles).indexOf(name) >= 0) {
                    this.columnIndices[name] = j;
                    break;
                }
            }
        }
    }

    private formatDate(value: any): string {
        if (!value) return ""; // Handle null or undefined

        // Power BI often passes dates as Date objects or ISO strings
        const parsed = moment(value, moment.ISO_8601, true); // Parse ISO or Date object strictly
        const minDate = moment('2022-01-01');
        const maxDate = moment('2028-01-01');

        // Check if valid and within range
        if (!parsed.isValid() || parsed.isBefore(minDate) || parsed.isAfter(maxDate)) {
            return ""; // Return empty string for invalid dates or out-of-range (like 1970)
        }

        // Format as DD/MM/YYYY (en-GB style)
        return parsed.format('DD/MM/YYYY');
    }

    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}