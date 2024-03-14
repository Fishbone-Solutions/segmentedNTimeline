import * as React from "react";
import { Stage, Layer, Rect, Text, Line, Circle, Image } from "react-konva";
import * as moment from "moment";
import { differenceInCalendarMonths, subMonths } from "date-fns";
import { monthNames } from "./CONS_TABLE";
import useImage from "use-image";


const StatusIcon = (props) => {
  if (props.status === "up") {
    const [image] = useImage(
      "https://raw.githubusercontent.com/Fishbone-Solutions/FB_CDN/main/stick.png"
    );
    return (
      <Image width={30} height={30} image={image} x={props.x} y={props.y} />
    );
  } else if (props.status === "down") {
    const [image] = useImage(
      "https://raw.githubusercontent.com/Fishbone-Solutions/FB_CDN/main/down.png"
    );
    return (
      <Image width={30} height={30} image={image} x={props.x} y={props.y} />
    );
  } else if (props.status === "stable") {
    const [image] = useImage(
      "https://raw.githubusercontent.com/Fishbone-Solutions/FB_CDN/main/stable.png"
    );
    return (
      <Image width={30} height={30} image={image} x={props.x} y={props.y} />
    );
  }
};
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
  scrollPositionIndicator?:number;
  twoDArrayPlaceholder?: any[][]; // 2D array placeholder
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

interface DataItem {
  milestone: string;
  title: string;
  owner: string;
  impactedBy: string;
  planDate: string;
  projectedStart: string;
  planFinish: string;
  projectedFinish: string;
  comments: string;
}
export class segmentedBar extends React.Component<any, State> {
  public dataArrayList: DataItem[] = [];


  private static updateCallback: (data: object) => void = null;
  scrollReference: React.RefObject<HTMLDivElement>;
  scrollIndicator: Number;

  public static update(newState: State) {
    if (typeof segmentedBar.updateCallback === "function") {
      segmentedBar.updateCallback(newState);
    }
  }

  public state: State = initialState;

  constructor(props: any) {
    super(props);
    this.state = initialState;
    this.dataArrayList = this.dataArrayList;
    this.scrollReference = React.createRef();


  }
  componentDidMount() {
    this.centerScroll();
  }
  centerScroll = () => {
    const container = this.scrollReference.current;
    if (container) {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const scrollPosition = (scrollWidth - clientWidth) / 3.2;
      container.scrollLeft = scrollPosition;
      console.log(this.state)
    }
  }
     handleClick = (twoDArray,successorsList) => {
      const cleanedList = successorsList.replace(/\n/g, '');
      const list = cleanedList.split(',');
      console.log(list)
      const matchingRows = {};

      for (let i = 0; i < twoDArray.length; i++) {
        const targetCode = twoDArray[i][0]; // Assuming target code is in the first column
        
        if (list.includes(targetCode)) {
          if (matchingRows[targetCode]) {
            matchingRows[targetCode].push(twoDArray[i]);
          } else {
            matchingRows[targetCode] = [twoDArray[i]];
          }
        }
      }
      
      console.log(matchingRows);

console.log("matching",typeof(matchingRows))
console.table(matchingRows)
const flattenedArray = Object.values(matchingRows).flat();

// Iterate over the flattened array
for (let i = 0; i < flattenedArray.length; i++) {
  const nestedArray = flattenedArray[i];
  console.log("Nested Array:", nestedArray);
  let datapoint: DataItem = {
    milestone: nestedArray[0],
    title: nestedArray[1],
    owner: nestedArray[2],
    impactedBy: nestedArray[9],
    planDate: nestedArray[3],
    projectedStart: nestedArray[4],
    planFinish: nestedArray[6],
    projectedFinish: nestedArray[5],
    comments: nestedArray[11]
  } 
  this.dataArrayList.push(
  datapoint
  )
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

    let months = [];
    let years = [];
    let finsldates = [];

    for (const element of finishDateList) {
      finsldates.push(new Date(Date.parse(element)));
    }
    let categoryListDisplay = [...new Set(categoryList)];
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
      Math.abs(differenceInCalendarMonths(start, Date.now())) * 5 * 55 +currentWeek * 55 -24;
    

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
    var categoryListDisplaySeg1 = [];
    var categoryListDisplayYSeg1 = [];
    var successorsListSeg1 = [];
    var plannedStartSeg1 = [];
    var plannedFinishSeg1 = [];
    var segmentColor: Array<string | CanvasGradient> = [];
    var visitedWeeks = [];
    var countMap = [];
    var ypositionLocator;

    const segments = [
      { y: 30, fill: Segment1Color, y1: 380 },
      { y: 50, fill: Segment2Color, y1: 320 },
      { y: 70, fill: Segment3Color, y1: 260 },
      { y: 90, fill: Segment4Color, y1: 220 },
      { y: 110, fill: Segment5Color, y1: 380 },
      { y: 130, fill: Segment6Color, y1: 300 },
    ];

   


    const weekNoFromList = finishDateList.map((element) => {
      const start = subMonths(result.min, 1);
      const week = new Date(Date.parse(element));
      const weekNos = Math.floor(
        Math.abs(differenceInCalendarMonths(start, week)) * 5 +
          week.getDate() / 7
      );
      return weekNos;
    });

    for (let i = 0; i < activityIDList.length; i++) {
      shortCodeSeg1.push(activityIDList[i]);
      titleSeg1.push(activityNameList[i]);
      ownerSeg1.push(ownerList[i]);
      beginSeg1.push(startDateList[i]);
      endSeg1.push(finishDateList[i]);
      lastReportedEndDateSeg1.push(lastReportedEndDateList[i]);
      slipSeg1.push(totalFloatList[i]);
      commentarySeg1.push(commentaryList[i]);
      successorsListSeg1.push(successorsList[i]);
      categoryListDisplaySeg1.push(categoryList[i]);
      plannedStartSeg1.push(projectedStartDateList[i]);
      plannedFinishSeg1.push(projectedFinishDateList[i]);
      if (trendLists[i].toLowerCase().includes("no change")) {
        trendSeg1.push("stable");
      }
      if (trendLists[i].toLowerCase().includes("deteriorated")) {
        trendSeg1.push("down");
      }
      if (trendLists[i].toLowerCase().includes("improved")) {
        trendSeg1.push("up");
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
      } else {
        statusSeg1.push("black");
      }
      for (let j = 0; j < categoryListDisplay.length; j++) {
        if (categoryList[i].includes(categoryListDisplay[j])) {
          yBarSeg1.push(segments[j]["y"]);
          categoryListDisplayYSeg1.push(segments[j]["y1"]);
          segmentColor.push(segments[j]["fill"]);
        }
      }

      // even numbered weeks
      //  odd numbered weeks
      visitedWeeks.push(weekNoFromList[i]);
      visitedWeeks.forEach((num) => {
        countMap[num] = (countMap[num] || 0) + 1;
      });
      ypositionLocator = 0;
      if (weekNoFromList[i] % 2 === 0) {
        ypositionLocator = 150 + Number(countMap[weekNoFromList[i]]) * 35;
      } else {
        ypositionLocator = 180 + Number(countMap[weekNoFromList[i]]) * 35;
      }

      if (ypositionLocator > 500) {
        ypositionLocator = 350;
      }
   
      let circle = {
        x: 55 * Number(weekNoFromList[i]),
        y: ypositionLocator,
        fill: statusSeg1[i],
        id: "SEG1" + i,
        shortCodeSeg: shortCodeSeg1[i],
        titleSeg: titleSeg1[i],
        ybarSeg: yBarSeg1[i],
        ownerSeg1: ownerSeg1[i],
        beginSeg1: beginSeg1[i],
        endSeg1: endSeg1[i],
        lastReportedEndDateSeg1: lastReportedEndDateSeg1[i],
        slipSeg1: slipSeg1[i],
        commentarySeg1: commentarySeg1[i],
        categoryListDisplaySeg1: categoryListDisplaySeg1[i],
        trendSeg: trendSeg1[i],
        successorsList: successorsListSeg1[i],
      };
      Seg1Values.push(circle);
    } 
  
    let twoDArray: any[][] = [];

    for (const element of Seg1Values) {
      let row: any[] = [];
      row.push(element.shortCodeSeg); //0
      row.push(element.titleSeg); //1
      row.push(element.ownerSeg1); //2
      row.push(element.beginSeg1); //3
      row.push(element.plannedStartSeg1); //4 
      row.push(element.plannedFinishSeg1) //5
      row.push(element.endSeg1); //6
      row.push(element.lastReportedEndDateSeg1); //7 
      row.push(element.slipSeg1); //8
      row.push(element.commentarySeg1); //9
      row.push(element.trendSeg); //10
      row.push(element.commentarySeg1) //11
      row.push(element.successorsList); //12
      
      twoDArray.push(row);
    }

 

    const Segment1Categories = finishDateList.map((week, index) => (
      <>
        <Circle
          x={Seg1Values[index]["x"]}
          y={Seg1Values[index]["y"] + 25.8}
          radius={30}
          stroke={Seg1Values[index]["fill"]}
          strokeWidth={3}
          fill={backgroundColorVis}
          onClick={()=>{
            
            this.handleClick(twoDArray,String(Seg1Values[index]["successorsList"]))}
          }

          onMouseEnter={() => {
            this.setState({
              titlePlaceholder: Seg1Values[index]["titleSeg"],
              ownerPlaceholder: Seg1Values[index]["ownerSeg"],
              trendPlaceholder: Seg1Values[index]["trendSeg"],
              baseLineDatePlaceholder: String(Seg1Values[index]["beginSeg1"]),
              endDatePlaceholder: Seg1Values[index]["endSeg1"],
              lastReportedDatePlaceholder: String(
                Seg1Values[index]["lastReportedEndDateSeg1"]
              ),
              slipPlaceholder: Seg1Values[index]["slipSeg1"],
            });
          }}
          onMouseLeave={() => {
            this.setState({
              titlePlaceholder: Seg1Values[index]["titleSeg"],
              ownerPlaceholder: Seg1Values[index]["ownerSeg"],
              trendPlaceholder: Seg1Values[index]["trendSeg"],
              baseLineDatePlaceholder: String(Seg1Values[index]["beginSeg1"]),
              endDatePlaceholder: String(Seg1Values[index]["endSeg1"]),
              lastReportedDatePlaceholder: String(
                Seg1Values[index]["lastReportedEndDateSeg1"]
              ),
              slipPlaceholder: Seg1Values[index]["slipSeg1"],
            });
          }}

        ></Circle>
        <Text
          x={Seg1Values[index]["x"] - 40}
          y={Seg1Values[index]["y"]}
          width={40 * 2}
          height={40 * 2}
          align="center"
          verticalAlign="middle"
          text={Seg1Values[index]["shortCodeSeg"].substring(0, 7)}
          fontSize={12}
          fill={textColor}
          onClick={()=>{
            
            this.handleClick(twoDArray,String(Seg1Values[index]["successorsList"]))}
          }

          onMouseEnter={() => {
            this.setState({
              titlePlaceholder: Seg1Values[index]["titleSeg"],
              ownerPlaceholder: Seg1Values[index]["ownerSeg"],
              trendPlaceholder: Seg1Values[index]["trendSeg"],
              baseLineDatePlaceholder: String(Seg1Values[index]["beginSeg1"]),
              endDatePlaceholder: String(Seg1Values[index]["endSeg1"]),
              lastReportedDatePlaceholder: String(
                Seg1Values[index]["lastReportedEndDateSeg1"]
              ),
              slipPlaceholder: Seg1Values[index]["slipSeg1"],
            });
          }}




          onMouseLeave={() => {
            this.setState({
              titlePlaceholder: Seg1Values[index]["titleSeg"],
              ownerPlaceholder: Seg1Values[index]["ownerSeg"],
              trendPlaceholder: Seg1Values[index]["trendSeg"],
              baseLineDatePlaceholder: String(Seg1Values[index]["beginSeg1"]),
              endDatePlaceholder: String(Seg1Values[index]["endSeg1"]),
              lastReportedDatePlaceholder: String(
                Seg1Values[index]["lastReportedEndDateSeg1"]
              ),
              slipPlaceholder: Seg1Values[index]["slipSeg1"],
            });
          }}
        />

        <Text
          x={Seg1Values[index]["x"] - 5}
          y={Seg1Values[index]["ybarSeg"]}
          width={40 * 2}
          height={40 * 2}
          text={Seg1Values[index]["trendSeg"] === "red" ? "🚩" : ""}
          fontSize={30}
          fill={textColor}

        />

        <StatusIcon
          status={Seg1Values[index]["trendSeg"]}
          x={Seg1Values[index]["x"] - 14}
          y={Seg1Values[index]["y"] + 10}
          onClick={()=>{
            
            this.handleClick(twoDArray,String(Seg1Values[index]["successorsList"]))}
          }
></StatusIcon>
      </>
    ));
    const Segment1Lines = finishDateList.map((week, index) => (
      <Line
        points={[
          Seg1Values[index]["x"],
          yBarSeg1[index],
          Seg1Values[index]["x"],
          Seg1Values[index]["y"],
        ]}
        stroke={segmentColor[index]}
        strokeWidth={5}
      />
    ));
    const legendStyle: React.CSSProperties = {
      fontSize: "18px",
      marginBottom: "10px",
      marginTop: "-10px",
    };

    const colorRectStyle: React.CSSProperties = {
      width: "50px",
      height: "25px",
      marginRight: "10px",
      display: "inline-block",
    };
    const offsetY = 46; // Translation value in pixels
  
 
    return (
      
        <div
          style={{ display: "flex", flexDirection: "column", height: "80vh",  }}
        >
          <div style={{ display: "flex", height: " 500px", flexGrow: 3 }}>
            <div style={{ width: "20%", backgroundColor: backgroundColorVis }}>
              <Stage width={300} height={550} >
                <Layer>
                  <Rect
                    x={20}
                    y={50}
                    width={200}
                    height={25}
                    fill={Segment1Color}
                  />
                  <Rect
                    x={20}
                    y={90}
                    width={200}
                    height={25}
                    fill={Segment2Color}
                  />
                  <Rect
                    x={20}
                    y={130}
                    width={200}
                    height={25}
                    fill={Segment3Color}
                  />
                  <Rect
                    x={20}
                    y={170}
                    width={200}
                    height={25}
                    fill={Segment4Color}
                  />
                  <Rect
                    x={20}
                    y={210}
                    width={200}
                    height={25}
                    fill={Segment5Color}
                  />
                  <Rect
                    x={20}
                    y={250}
                    width={200}
                    height={25}
                    fill={Segment6Color}
                  />

                  <Line
                    points={[220, 50, 270, 78, 220, 75]}
                    fill={Segment1Color}
                    closed
                  />
                  <Line
                    points={[220, 90, 270, 97, 220, 114]}
                    fill={Segment2Color}
                    closed
                  />
                  <Line
                    points={[220, 130, 265, 110, 220, 156]}
                    fill={Segment3Color}
                    closed
                  />
                  <Line
                    points={[220, 170, 260, 135, 220, 196]}
                    fill={Segment4Color}
                    closed
                  />
                  <Line
                    points={[220, 210, 264, 150, 220, 236]}
                    fill={Segment5Color}
                    closed
                  />
                  <Line
                    points={[
                      220,
                      210 + offsetY,
                      264 - 7,
                      150 + offsetY,
                      220,
                      236 + offsetY,
                    ]}
                    fill={Segment6Color}
                    closed
                  />
                  <Text
                    x={20} 
                    y={62.5 - 10} 
                    text={categoryListDisplay[0]}
                    fontSize={14}
                    align="center"
                    fill={"white"}
                    verticalAlign="middle"
                  />

                  <Text
                    x={20} // Center x-coordinate of the rectangle
                    y={102.5 - 10} // Center y-coordinate of the rectangle
                    text={categoryListDisplay[1]}
                    fontSize={14}
                    align="center"
                    verticalAlign="middle"
                  />

                  <Text
                    x={20} // Center x-coordinate of the rectangle
                    y={142.5 - 10} // Center y-coordinate of the rectangle
                    text={categoryListDisplay[2]}
                    fontSize={14}
                    align="center"
                    verticalAlign="middle"
                  />

                  <Text
                    x={20} // Center x-coordinate of the rectangle
                    y={182.5 - 10} // Center y-coordinate of the rectangle
                    text={categoryListDisplay[3]}
                    fill={"white"}
                    fontSize={14}
                    align="center"
                    verticalAlign="middle"
                  />

                  <Text
                    x={20} // Center x-coordinate of the rectangle
                    y={222.5 - 10} // Center y-coordinate of the rectangle
                    text={categoryListDisplay[4]}
                    fontSize={14}
                    align="center"
                    verticalAlign="middle"
                  />

                  <Text
                    x={20} // Center x-coordinate of the rectangle
                    y={262.5 - 10} // Center y-coordinate of the rectangle
                    text={categoryListDisplay[6]}
                    fontSize={14}
                    align="center"
                    verticalAlign="middle"
                  />
                </Layer>
              </Stage>
            </div>
            <div
              ref={this.scrollReference}
              style={{
                width: "100%",
                height: "500px",
                overflowX: "scroll",
                overflowY: "scroll",
                backgroundColor: backgroundColorVis,
              }}
            >
              <div>
                <div
                  className="relative"
                  style={{ backgroundColor: backgroundColorVis }}
                >
                  {monthsArray}
                </div>
                <div className="relative">{weeksArray}</div>
                <Stage
                  width={Number(months.length) * 275}
                  height={1000}
                  style={{ backgroundColor: backgroundColorVis }}
                >
                  <Layer>
                    {segments.map((segment, index) => (
                      <Rect
                        key={index}
                        x={0}
                        y={segment.y}
                        width={months.length * 5 * 55}
                        height={6}
                        fill={segment.fill}
                      />
                    ))}
                  </Layer>
                  <Layer>
                    {Segment1Lines}
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
                      x={todayDateLocation + 3}
                      y={10}
                      text="Today"
                      fontSize={15}
                      fill="black"
                    ></Text>
                  </Layer>
                </Stage>
              </div>
            </div>
            <div
              style={{
                width: "20%",
                backgroundColor: backgroundColorVis,
                display: "flex",
              }}
            >
              <table style={{ margin: "fixed" }}>
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
                    <td>{baseLineDatePlaceholder.split("T")[0]}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>End Date</td>
                    <td>{endDatePlaceholder.split("T")[0]}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>
                      Last Reported End Date
                    </td>
                    <td>{lastReportedDatePlaceholder.split("T")[0]}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Slip</td>
                    <td>{slipPlaceholder} Days</td>
                  </tr>
                  <br></br>
                  <tr>
                    <td colSpan={2}>
                      <div>
                        <p style={legendStyle}>Legend</p>
                        <div
                          style={{ ...colorRectStyle, backgroundColor: "grey" }}
                        ></div>
                        <span>-&gt; Not Started</span>
                        <br />
                        <div
                          style={{ ...colorRectStyle, backgroundColor: "red" }}
                        ></div>
                        <span>-&gt; Late</span>
                        <br />
                        <div
                          style={{
                            ...colorRectStyle,
                            backgroundColor: "yellow",
                          }}
                        ></div>
                        <span>-&gt; At Risk</span>
                        <br />
                        <div
                          style={{
                            ...colorRectStyle,
                            backgroundColor: "green",
                          }}
                        ></div>
                        <span>-&gt; On Plan</span>
                        <br />
                        <div
                          style={{ ...colorRectStyle, backgroundColor: "blue" }}
                        ></div>
                        <span>-&gt; Complete</span>
                        <br />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ height: "50vh" }}>
            <table
              style={{
                width: "100%",
                fontSize: "15px",
                tableLayout: "fixed",
                borderCollapse: "collapse",
                backgroundColor: "grey",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Milestone
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Title
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Owner
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Impacted by
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Plan Date
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Projected Start
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Plan Finish
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Projected Finish
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      border: "1px solid #ccc",
                      padding: "8px",
                    }}
                  >
                    Comments
                  </th>
                </tr>
              </thead>
            </table>
            <div
              style={{ height: "100px", overflowY: "auto", display: "flex" }}
            >
              <table
                style={{
                  width: "100%",
                  fontSize: "15px",
                  tableLayout: "fixed",
                  borderCollapse: "collapse",
                }}
              >
                <tbody>
                  {[
                    ...new Set(
                      this.dataArrayList.map((data) => data.milestone)
                    ),
                  ].map((milestone, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).milestone
                        }
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).title
                        }
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).owner
                        }
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).impactedBy
                        }
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).planDate
                        }
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).projectedStart
                        }
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).planFinish
                        }
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).projectedFinish
                        }
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {
                          this.dataArrayList.find(
                            (data) => data.milestone === milestone
                          ).comments
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
    );
  }
}

export default segmentedBar;
