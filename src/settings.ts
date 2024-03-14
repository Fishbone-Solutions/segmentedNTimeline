"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;

export class CircleSettings {
    public circleColor: string = "#757171";
    public Segment1Color: string = "#e044a7";
    public Segment2Color: string = "#a0d1fe";
    public Segment3Color: string = "#f0a786";
    public Segment4Color: string = "#a28615";
    public Segment5Color: string = "#8EAADC";
    public Segment6Color: string = "#A0D1FE";
    public textColor: string = "red";
    public startDate: Date | null = null; // Date picker property
    public endDate: Date | null = null; // Date picker property

}

export class VisualSettings extends DataViewObjectsParser {
    public circle: CircleSettings = new CircleSettings();
}
