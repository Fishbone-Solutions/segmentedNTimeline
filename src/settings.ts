"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class CircleSettings {
    public circleColor: string = "#757171";
    public Segment1Color: string = "#0A4780";
    public Segment2Color: string = "#0B6ABF";
    public Segment3Color: string = "#41A4FD";
    public Segment4Color: string = "#71BBFD";
    public Segment5Color: string = "#8EAADC";
    public Segment6Color: string = "#A0D1FE";
    public textColor: string = "white";

}

export class VisualSettings extends DataViewObjectsParser {
    public circle: CircleSettings = new CircleSettings();
}
