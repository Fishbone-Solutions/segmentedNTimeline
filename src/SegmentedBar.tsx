import * as React from "react";
import { Stage, Layer, Rect, Text, Line, Circle } from "react-konva";
import * as moment from "moment";
import {
  differenceInCalendarMonths,
  addMonths,
  subMonths,
  getWeek,
} from "date-fns";
import { monthNames } from "./CONS_TABLE";

export interface State {
  commentaryPlaceholder?: string;
  backgroundColorVis?: string;
  Segment1Color?: string;
  Segment2Color?: string;
  Segment3Color?: string;
  Segment4Color?: string;
  Segment5Color?: string;
  Segment6Color?: string;
  textColor?: string;
  activityIDList?: string[];
  categoryList?: string[];
  activityLevelList?: string[];
  activityNameList?: string[];
  statusNameList?: string[];
  milestoneLevelList?: string[];
  startDateList?: string[];
  finishDateList?: string[];
  projectedStartDateList?: string[];
  projectedFinishDateList?: string[];
  ownerList?: string[];
  predecessorsList?: string[];
  successorsList?: string[];
  commentaryList?: string[];
  totalFloatList?: string[];
  trendLists?: string[];
  lastReportedEndDateList?: string[];
  titlePlaceholder?: string;
  ownerPlaceholder?: string;
  trendPlaceholder?: string;
  baseLineDatePlaceholder?: string;
  endDatePlaceholder?: string;
  lastReportedDatePlaceholder?: string;
  slipPlaceholder?: string;
}

export const initialState: State = {
  backgroundColorVis: "white",
  activityIDList: [],
  textColor: "white",
  finishDateList: [],
  categoryList: [],
  activityLevelList: [],
  activityNameList: [],
  statusNameList: [],
  milestoneLevelList: [],
  startDateList: [],
  projectedStartDateList: [],
  projectedFinishDateList: [],
  ownerList: [],
  predecessorsList: [],
  successorsList: [],
  commentaryList: [],
  totalFloatList: [],
  trendLists: [],
  lastReportedEndDateList: [],
  titlePlaceholder: "",
  ownerPlaceholder: "",
  trendPlaceholder: "",
  baseLineDatePlaceholder: "",
  endDatePlaceholder: "",
  lastReportedDatePlaceholder: "",
  slipPlaceholder: "",
};

export class segmentedBar extends React.Component<any, State> {
  private static updateCallback: (data: object) => void = null;
  scrollReference: React.RefObject<HTMLDivElement>;

  public static update(newState: State) {
    if (typeof segmentedBar.updateCallback === "function") {
      segmentedBar.updateCallback(newState);
    }
  }

  public state: State = initialState;

  constructor(props: any) {
    super(props);
    this.state = initialState;
    this.scrollReference = React.createRef();
    const container = this.scrollReference.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      const scrollPosition = containerWidth / 2;
      container.scrollLeft = scrollPosition;
    }
  }
  public componentWillMount() {
    segmentedBar.updateCallback = (newState: State): void => {
      this.setState(newState);
    };
  }

  public componentWillUnmount() {
    segmentedBar.updateCallback = null;
  }

  render() {
    const {
      backgroundColorVis,
      Segment1Color,
      Segment2Color,
      Segment3Color,
      Segment4Color,
      Segment5Color,
      Segment6Color,
      textColor,
      activityIDList,
      categoryList,
      milestoneLevelList,
      activityNameList,
      statusNameList,
      startDateList,
      finishDateList,
      projectedStartDateList,
      projectedFinishDateList,
      ownerList,
      predecessorsList,
      successorsList,
      commentaryList,
      totalFloatList,
      trendLists,
      lastReportedEndDateList,
      titlePlaceholder,
      ownerPlaceholder,
      trendPlaceholder,
      baseLineDatePlaceholder,
      endDatePlaceholder,
      lastReportedDatePlaceholder,
      slipPlaceholder,
    } = this.state;

    var weeknoList = [];
    var weekDates = [];
    var months = [];
    var years = [];
    var finsldates = [];

    for (let i = 0; i < finishDateList.length; i++) {
      finsldates.push(new Date(Date.parse(finishDateList[i])));
    }
    var categoryListDisplay = [...new Set(categoryList)];
    categoryListDisplay.sort((a, b) => a.localeCompare(b));

    const result = finsldates.reduce(
      (acc, date) => {
        const min = acc.min ? (date < acc.min ? date : acc.min) : date;
        const max = acc.max
          ? date > acc.max
            ? date
            : acc.max
          : date || new Date("2026-01-01");
        return { min, max };
      },
      { min: undefined, max: undefined }
    );

    let startDate4 = moment(new Date(Date.parse(result.min))).startOf("month");
    const startDate = startDate4.subtract(1, "months");
    let endDate4 = moment(result.max).startOf("months");
    const endDate = endDate4.add(1, "months");

    // Define a variable to hold the current date
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate)) {
      const month = currentDate.month();
      const year = currentDate.year();

      months.push(monthNames[month]);
      years.push(year);
      // Advance the current date by one week
      currentDate = currentDate.add(1, "months");
    }

    const start = subMonths(result.min, 1);

    const todayDate = new Date();

    const todaysLine = todayDate.getDate() + todayDate.getDay();

    const prefix = [0, 1, 2, 3, 4, 5];

    const currentWeek = prefix[0 | (todaysLine / 7)] + 1;

    const todayDateLocation =
      Math.abs(differenceInCalendarMonths(start, Date.now())) * 5 * 55 +
      currentWeek * 55 -
      24;

    const weeksArray = months.map((week, index) => (
      <>
        <button style={{ width: 55, padding: 0, border: 0 }}>{1}</button>
        <button style={{ width: 55, padding: 0, border: 0 }}>{2}</button>
        <button style={{ width: 55, padding: 0, border: 0 }}>{3}</button>
        <button style={{ width: 55, padding: 0, border: 0 }}>{4}</button>
        <button style={{ width: 55, padding: 0, border: 0 }}>{5}</button>
      </>
    ));

    const monthsArray = months.map((month, index) => (
      <div
        className="monthitem"
        style={{ backgroundColor: backgroundColorVis }}
      >
        <button>{month}</button>
        <button>{years[index]}</button>
      </div>
    ));

    // console.log('activityIDList:', activityIDList);
    // console.log('categoryList:', categoryList);
    // console.log('milestoneLevelList:', milestoneLevelList);
    // console.log('activityNameList:', activityNameList);
    // console.log('statusNameList:', statusNameList);
    // console.log('startDateList:', startDateList);
    // console.log('finishDateList:', finishDateList);
    // console.log('projectedStartDateList:', projectedStartDateList);
    // console.log('projectedFinishDateList:', projectedFinishDateList);
    // console.log('ownerList:', ownerList);
    // console.log('predecessorsList:', predecessorsList);
    // console.log('successorsList:', successorsList);
    // console.log('commentaryList:', commentaryList);
    // console.log('totalFloatList:', totalFloatList);
    // console.log('trendLists:', trendLists);
    // console.log('lastReportedEndDateList:', lastReportedEndDateList);
    // console.log('titlePlaceholder:', titlePlaceholder);
    // console.log('ownerPlaceholder:', ownerPlaceholder);
    // console.log('trendPlaceholder:', trendPlaceholder);
    // console.log('baseLineDatePlaceholder:', baseLineDatePlaceholder);
    // console.log('endDatePlaceholder:', endDatePlaceholder);
    // console.log('lastReportedDatePlaceholder:', lastReportedDatePlaceholder);
    // console.log('slipPlaceholder:', slipPlaceholder);

    // Segment 1 Values
    var shortCodeSeg1 = [];
    var statusSeg1 = [];
    var trendSeg1 = [];
    var titleSeg1 = [];
    var ownerSeg1 = [];
    var beginSeg1 = [];
    var endSeg1 = [];
    var lastReportedEndDateSeg1 = [];
    var slipSeg1 = [];
    var commentarySeg1 = [];
    var Seg1Values = [];
    var yBarSeg1 = [];
    var categoryListDisplaySeg1 = []
    var categoryListDisplayYSeg1 = []
    var segmentColor: Array<string | CanvasGradient> = [];

    const segments = [
      { y: 30, fill: Segment1Color ,y1:200},
      { y: 50, fill: Segment2Color ,y1:270},
      { y: 70, fill: Segment3Color,y1:300 },
      { y: 90, fill: Segment4Color,y1:330},
      { y: 110, fill: Segment5Color ,y1:350},
      { y: 130, fill: Segment6Color ,y1:380},
    ];

    const handleClick = (e) => {
      this.scrollReference.current.scrollLeft = todayDateLocation - 250;
    };

    const weekNoFromList = finishDateList.map((element) => {
      const start = subMonths(result.min, 1);
      const week = new Date(Date.parse(element));
      const weekNos =
        Math.abs(differenceInCalendarMonths(start, week)) * 5 +
        week.getDate() / 7;
      return weekNos;
    });

    
    for (let i = 0; i < activityIDList.length; i++) {
      if (categoryList[i].includes(categoryListDisplay[0]) ||
      categoryList[i].includes(categoryListDisplay[1]) ||
      categoryList[i].includes(categoryListDisplay[2]) ||
      categoryList[i].includes(categoryListDisplay[3]) ||
      categoryList[i].includes(categoryListDisplay[4]) ||
      categoryList[i].includes(categoryListDisplay[5]) ) {
        
        shortCodeSeg1.push(activityIDList[i]);
        titleSeg1.push(activityNameList[i]);
        ownerSeg1.push(ownerList[i]);
        beginSeg1.push(startDateList[i]);
        endSeg1.push(finishDateList[i]);
        lastReportedEndDateSeg1.push(lastReportedEndDateList[i]);
        slipSeg1.push(totalFloatList[i]);
        commentarySeg1.push(commentaryList[i]);
        categoryListDisplaySeg1.push(categoryList[i]);

        if (trendLists[i].toLowerCase().includes("no change")) {
          trendSeg1.push("↔️");
        }
        if (trendLists[i].toLowerCase().includes("deteriorated")) {
          trendSeg1.push("⬇️");
        }
        if (trendLists[i].toLowerCase().includes("improved")) {
          trendSeg1.push("⬆️");
        }

        if (statusNameList[i].toLowerCase().includes("not started")) {
          statusSeg1.push("grey");
        }
        if (statusNameList[i].toLowerCase().includes("late")) {
          statusSeg1.push("red");
        }
        if (statusNameList[i].toLowerCase().includes("at risk")) {
          statusSeg1.push("yellow");
        }
        if (statusNameList[i].toLowerCase().includes("on plan")) {
          statusSeg1.push("green");
        }
        if (statusNameList[i].toLowerCase().includes("completed")) {
          statusSeg1.push("blue");
        }
        else {
          statusSeg1.push("brown");

        }
        for (let j = 0; j < categoryListDisplay.length; j++) {
          if (categoryList[i].includes(categoryListDisplay[j])) {
            yBarSeg1.push(segments[j]['y']);
            categoryListDisplayYSeg1.push(segments[j]['y1']);
            segmentColor.push(segments[j]['fill'])
          }
        }
   



        let circle = {
          x: 55 * Number(weekNoFromList[i]) + 3,
          y: categoryListDisplayYSeg1[i],
          fill: statusSeg1[i],
          id: "SEG1" + i,
          shortCodeSeg: shortCodeSeg1[i],
          titleSeg: titleSeg1[i],
          ownerSeg1: ownerSeg1[i],
          beginSeg1: beginSeg1[i],
          endSeg1: endSeg1[i],
          lastReportedEndDateSeg1: lastReportedEndDateSeg1[i],
          slipSeg1: slipSeg1[i],
          commentarySeg1: commentarySeg1[i],
          categoryListDisplaySeg1: categoryListDisplaySeg1[i]
        };
        Seg1Values.push(circle);
      }
    }
  console.log(Seg1Values);



console.log(Seg1Values);
    const Segment1Categories = finishDateList.map((week, index) => (
      <>
        <Line
          points={[Seg1Values[index]["x"], yBarSeg1[index], Seg1Values[index]["x"], categoryListDisplayYSeg1[index]]}
          stroke={segmentColor[index]}
          strokeWidth={5}
        />
        <Circle
          x={Seg1Values[index]["x"]}
          y={ categoryListDisplayYSeg1[index]+ 25.8}
          radius={30}
          stroke={statusSeg1[index]}
          strokeWidth={3}
          onMouseEnter={() => {
            this.setState({
              titlePlaceholder: titleSeg1[index],
              ownerPlaceholder: ownerSeg1[index],
              trendPlaceholder: trendSeg1[index],
              baseLineDatePlaceholder: beginSeg1[index],
              endDatePlaceholder: String(endSeg1[index]),
              lastReportedDatePlaceholder: String(
                lastReportedEndDateSeg1[index]
              ),
              slipPlaceholder: String(lastReportedEndDateSeg1),
            });
          }}
          onMouseLeave={() => {
            this.setState({
              titlePlaceholder: titleSeg1[index],
              ownerPlaceholder: ownerSeg1[index],
              trendPlaceholder: trendSeg1[index],
              baseLineDatePlaceholder: beginSeg1[index],
              endDatePlaceholder: String(endSeg1[index]),
              lastReportedDatePlaceholder: String(
                lastReportedEndDateSeg1[index]
              ),
              slipPlaceholder: String(lastReportedEndDateSeg1),
            });
          }}
        ></Circle>
        <Text
          x={Seg1Values[index]["x"] - 5}
          y={10}
          width={40 * 2}
          height={40 * 2}
          text={ statusSeg1[index] === "red" ? "🚩" : ""}
          fontSize={30}
          fill={textColor}
        />
         <Text
          x={Seg1Values[index]["x"] - 40}
          y={categoryListDisplayYSeg1[index]}
          width={40 * 2}
          height={40 * 2}
          align="center"
          verticalAlign="middle"
          text={shortCodeSeg1[index] }
          fontSize={12}
          fill={textColor}
          onMouseEnter={() => {
            this.setState({
              titlePlaceholder: titleSeg1[index],
              ownerPlaceholder: ownerSeg1[index],
              trendPlaceholder: trendSeg1[index],
              baseLineDatePlaceholder: beginSeg1[index],
              endDatePlaceholder: String(endSeg1[index]),
              lastReportedDatePlaceholder: String(
                lastReportedEndDateSeg1[index]
              ),
              slipPlaceholder: String(lastReportedEndDateSeg1),
            });
          }}
          onMouseLeave={() => {
            this.setState({
              titlePlaceholder: titleSeg1[index],
              ownerPlaceholder: ownerSeg1[index],
              trendPlaceholder: trendSeg1[index],
              baseLineDatePlaceholder: beginSeg1[index],
              endDatePlaceholder: String(endSeg1[index]),
              lastReportedDatePlaceholder: String(
                lastReportedEndDateSeg1[index]
              ),
              slipPlaceholder: String(lastReportedEndDateSeg1),
            });
          }}
        />
      <Text
          x={Seg1Values[index]["x"] - 40}
          y={categoryListDisplayYSeg1[index] - 20}
          width={40 * 2}
          height={40 * 2}
          align="center"
          verticalAlign="middle"
          text={trendSeg1[index]}
          fontSize={20}
          fill={textColor}
          onMouseEnter={() => {
            this.setState({
              titlePlaceholder: titleSeg1[index],
              ownerPlaceholder: ownerSeg1[index],
              trendPlaceholder: trendSeg1[index],
              baseLineDatePlaceholder: beginSeg1[index],
              endDatePlaceholder: String(endSeg1[index]),
              lastReportedDatePlaceholder: String(
                lastReportedEndDateSeg1[index]
              ),
              slipPlaceholder: String(lastReportedEndDateSeg1),
            });
          }}
          onMouseLeave={() => {
            this.setState({
              titlePlaceholder: titleSeg1[index],
              ownerPlaceholder: ownerSeg1[index],
              trendPlaceholder: trendSeg1[index],
              baseLineDatePlaceholder: beginSeg1[index],
              endDatePlaceholder: String(endSeg1[index]),
              lastReportedDatePlaceholder: String(
                lastReportedEndDateSeg1[index]
              ),
              slipPlaceholder: String(lastReportedEndDateSeg1),
            });
          }}
        />
      </>
    ));

    return (
      <>
        <div
          style={{ display: "flex", flexDirection: "column", height: "80vh" }}
        >
          <div style={{ display: "flex", flexGrow: 3 }}>
            <div style={{ width: "20%", backgroundColor: backgroundColorVis }}>
              <svg
                height="100%"
                strokeMiterlimit="10"
                version="1.1"
                viewBox="0 0 300 700"
                width="100%"
                transform="translate(0,27.2)"
              >
                <g clipPath="Sidebar" id="Layer-1" fill="green">
                  <rect
                    x="20"
                    y="200"
                    width="235"
                    height="35"
                    fill={Segment1Color}
                  ></rect>
                  <rect
                    x="20"
                    y="250"
                    width="235"
                    height="35"
                    fill={Segment2Color}
                  ></rect>
                  <rect
                    x="20"
                    y="300"
                    width="235"
                    height="35"
                    fill={Segment3Color}
                  ></rect>
                  <rect
                    x="20"
                    y="350"
                    width="235"
                    height="35"
                    fill={Segment4Color}
                  ></rect>
                  <rect
                    x="20"
                    y="400"
                    width="235"
                    height="35"
                    fill={Segment5Color}
                  ></rect>
                  <rect
                    x="20"
                    y="450"
                    width="235"
                    height="35"
                    fill={Segment6Color}
                  ></rect>
                  <text x={25} y={220} fontSize={18} fill={textColor}>
                    {categoryListDisplay[0]}
                  </text>
                  <text x={25} y={275} fontSize={18} fill={textColor}>
                    {categoryListDisplay[1]}
                  </text>
                  <text x={25} y={320} fontSize={18} fill={textColor}>
                    {categoryListDisplay[2]}
                  </text>
                  <text x={25} y={370} fontSize={18} fill={textColor}>
                    {categoryListDisplay[3]}
                  </text>
                  <text x={25} y={420} fontSize={18} fill={textColor}>
                    {categoryListDisplay[4]}
                  </text>
                  <text x={25} y={480} fontSize={18} fill={textColor}>
                    {categoryListDisplay[5]}
                  </text>
                </g>
              </svg>
            </div>
            <div
              ref={this.scrollReference}
              style={{
                width: "60%",
                overflowX: "scroll",
                backgroundColor: "white",
              }}
            >
              <div style={{ width: "20000px" }}>
                <div
                  className="relative"
                  style={{ backgroundColor: backgroundColorVis }}
                >
                  {monthsArray}
                </div>
                <div className="relative">{weeksArray}</div>
                <Stage
                  width={months.length * 5 * 55}
                  height={500}
                  style={{ backgroundColor: backgroundColorVis }}
                >
                    <Layer>
                    {segments.map((segment, index) => (
                      <Rect
                        key={index}
                        x={0}
                        y={segment.y}
                        width={18000}
                        height={6}
                        fill={segment.fill}
                      />
                    ))}
                  </Layer>
                  <Layer>
                    {Segment1Categories}
                  </Layer>

                  <Layer>
                    <Rect
                      x={todayDateLocation}
                      y={5}
                      width={5}
                      height={800}
                      fill="green"
                    ></Rect>
                    <Text
                      x={todayDateLocation}
                      y={35}
                      text="Today"
                      fontSize={15}
                      fill="white"
                    ></Text>
                  </Layer>
                </Stage>
              </div>
            </div>
            <div
              style={{
                width: "20%",
                backgroundColor: "grey",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <table style={{ margin: "auto" }}>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Title</td>
                    <td>{titlePlaceholder}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Owner</td>
                    <td>{ownerPlaceholder}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Trend</td>
                    <td>{trendPlaceholder}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>BaseLine</td>
                    <td>{baseLineDatePlaceholder}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>End Date</td>
                    <td>01/01/2024</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>
                      Last Reported End Date
                    </td>
                    <td>01/01/2024</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Slip</td>
                    <td>20 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ height: "4rem", backgroundColor: "grey" }}>
            <p
              style={{ textAlign: "center", fontSize: "30px", color: "white" }}
            >
              🚧 WORK IN PROGRESS ( Dynamic table ){" "}
            </p>
            {/* 
  <div style={{ height: '4rem', backgroundColor: 'grey' }}>
  <div style={{ width: '100%', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
    <table style={{ width: '100%', tableLayout: 'fixed' ,justifyContent: 'center', fontSize: "15px"   }}>
      <thead>
        <tr>
          <th>Milestone</th>
          <th>Title</th>
          <th>Owner</th>
          <th>Impacted by</th>
          <th>Plan Date</th>
          <th>Projected Start</th>
          <th>Plan Finish</th>
          <th>Projected Finish</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>EE4b</td>
          <td>Electrification</td>
          <td>Infrastructure Transformation</td>
          <td>N/A</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td> A quick brown fox jumps over the lazy dog</td>
        </tr>
        <tr>
          <td>EE4b</td>
          <td>Electrification</td>
          <td>Infrastructure Transformation</td>
          <td>N/A</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td>Comments</td>
        </tr>
        <tr>
          <td>EE4b</td>
          <td>Electrification</td>
          <td>Infrastructure Transformation</td>
          <td>N/A</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td>01/01/24</td>
          <td>Comments</td>
        </tr>
      </tbody>
    </table>
  </div>
</div> 
             */}
          </div>
        </div>
      </>
    );
  }
}

export default segmentedBar;
