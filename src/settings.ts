"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class CircleSettings {
    public circleColor: string = "#757171";
    public Segment1Color: string = "rgb(174,145,110)";
    public Segment2Color: string = "rgb(131,150,178)";
    public Segment3Color: string = "rgb(94,66,35)";
    public Segment4Color: string = "#8877A6";
    public Segment5Color: string = "#DC8F9F";
    public Segment6Color: string = "rgb(188,177,205)";
    public textColor: string = "black";
    public SidetextColor: string = "white";
    public DynamicTableHeader: string ="grey";
}

export class VisualSettings extends DataViewObjectsParser {
    public circle: CircleSettings = new CircleSettings();
}
