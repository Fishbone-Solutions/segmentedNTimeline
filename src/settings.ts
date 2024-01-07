"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class CircleSettings {
    public circleColor: string = "#757171";
    public Segment1Color: string = "#8FAADC";
    public Segment2Color: string = "#2F5597";
    public Segment3Color: string = "#";
    public Segment4Color: string = "#FFFFFF";
    public textColor: string = "white";

}

export class VisualSettings extends DataViewObjectsParser {
    public circle: CircleSettings = new CircleSettings();
}
