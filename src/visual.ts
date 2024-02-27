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
import { segmentedBar, initialState } from "./SegmentedBar"


// standart imports
export class Visual implements IVisual {
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;
    private settings: VisualSettings;
    private columnIndices: {};


    constructor(options: VisualConstructorOptions) {
        // constructor body
        this.target = options.element;
        this.reactRoot = React.createElement(segmentedBar, {});
        ReactDOM.render(this.reactRoot, this.target);
        this.columnIndices = [];
        for (let i = 1; i < 18; i++) {
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

            let activityList: string[] = []
            let weeksList: string[] = []
            let statusList: string[] = []
            let flagtrackerList: string[] = [] 

            let activityIDList: string[] = []
            let categoryList: string[] = []
            let activityLevelList: string[] = []
            let ActivityNameList: string[] = []
            let StatusNameList: string[] = []
            let StartDateList: string[] = []
            let FinishDateList: string[] = []
            let ProjectedStartDate: string[] = []
            let ProjectedFinishDate: string[] = []
             let OwnerList: string[] = []
            let PredecessorsList: string[] = []
            let SuccessorsList: string[] = []
            let milestoneList: string[] = []
            let commentaryList: string[] = []
            let totalFloatList: string[] = []
            let trendLists: string[] = []
            let ImpactedByList: string[] = []
            let LastReportedEnddate: string[] = []


        










            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                activityIDList[i] = `${(row[this.columnIndices['c1']])}`;
                activityLevelList[i] = `${(row[this.columnIndices['c2']])}`;
                ActivityNameList[i] = `${(row[this.columnIndices['c3']])}`;
                StatusNameList[i] = `${(row[this.columnIndices['c4']])}`;
                StartDateList[i] = `${(row[this.columnIndices['c5']])}`;
                FinishDateList[i] = `${(row[this.columnIndices['c6']])}`;
                ProjectedStartDate[i] = `${(row[this.columnIndices['c7']])}`;
                ProjectedFinishDate[i] = `${(row[this.columnIndices['c8']])}`;
                OwnerList[i] = `${(row[this.columnIndices['c9']])}`;
                PredecessorsList[i] = `${(row[this.columnIndices['c10']])}`;
                SuccessorsList[i] = `${(row[this.columnIndices['c11']])}`;
                milestoneList[i] = `${(row[this.columnIndices['c12']])}`;
                commentaryList[i] = `${(row[this.columnIndices['c13']])}`;
                totalFloatList[i] = `${(row[this.columnIndices['c14']])}`;
                trendLists[i] = `${(row[this.columnIndices['c15']])}`;
                ImpactedByList[i] = `${(row[this.columnIndices['c16']])}`;
                LastReportedEnddate[i] = `${(row[this.columnIndices['c17']])}`;
                categoryList[i] = `${(row[this.columnIndices['c18']])}`;
            }
            segmentedBar.update({
                Segment1Color: object && object.Segment1Color ? object.Segment1Color : undefined,
                Segment2Color: object && object.Segment2Color ? object.Segment2Color : undefined,
                Segment3Color: object && object.Segment3Color ? object.Segment3Color : undefined,
                Segment4Color: object && object.Segment4Color ? object.Segment4Color : undefined,
                Segment5Color: object && object.Segment5Color ? object.Segment5Color : undefined,
                Segment6Color: object && object.Segment6Color ? object.Segment6Color : undefined,
                textColor: object && object.textColor ? object.textColor : undefined,
                activityIDList: activityIDList,
                activityLevelList: activityLevelList,
                ActivityNameList: ActivityNameList,
                StatusNameList: StatusNameList,
                StartDateList: StartDateList,
                FinishDateList: FinishDateList,
                ProjectedStartDate: ProjectedStartDate,
                ProjectedFinishDate: ProjectedFinishDate,
                OwnerList: OwnerList,
                PredecessorsList: PredecessorsList,
                SuccessorsList: SuccessorsList,
                milestoneList: milestoneList,
                commentaryList: commentaryList,
                totalFloatList: totalFloatList,
                trendLists: trendLists,
                ImpactedByList: ImpactedByList,
                LastReportedEnddate: LastReportedEnddate,
                categoryList: categoryList,
                backgroundColorVis: object && object.circleColor ? object.circleColor : undefined,
            });


        } else {
            this.clear();
        }
    }

    private findColumns(columns: DataViewMetadataColumn[]) {
        //iterate over defined column names
        for (let name in this.columnIndices) {
            //now iterate over available columns, note that not all columns may be assigned a data field yet
            for (let j = 0; j < columns.length; j++) {
                //defining the role attribute of the current column, more info in the data view appendix
                let columnRoles = columns[j].roles;
                //column name is the property name, so looking in there
                if (Object.keys(columnRoles).indexOf(name) >= 0) {
                    //setting the index of the column name to the index of the role
                    this.columnIndices[name] = j;
                    break;
                }
            }
        }
    }

    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {

        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}