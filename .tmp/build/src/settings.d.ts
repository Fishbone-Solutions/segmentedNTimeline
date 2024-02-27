import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
export declare class CircleSettings {
    circleColor: string;
    Segment1Color: string;
    Segment2Color: string;
    Segment3Color: string;
    Segment4Color: string;
    Segment5Color: string;
    Segment6Color: string;
    textColor: string;
}
export declare class VisualSettings extends DataViewObjectsParser {
    circle: CircleSettings;
}
