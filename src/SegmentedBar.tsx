import * as React from "react";
import { Stage, Layer, Rect, Text, Line, Circle } from "react-konva";
import * as moment from "moment";
import { IoMdTrendingUp } from "react-icons/io";
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
};
export class segmentedBar extends React.Component<any, State> {
  public dataArrayList: DataItem[] = [];
  
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
    this.dataArrayList = this.dataArrayList;

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
  handleDynamic = (indexList: Number[]) => {


    for (let i = 0; i < 2; i++) {
      const index = indexList[i];
      const data: DataItem = {
        milestone: "1",
         title: "title",
        owner: "ownerSeg1[index]",
        impactedBy: "successorsListSeg1[index]",
        planDate: "beginSeg1[index]",
        projectedStart: "plannedStartSeg1[index]",
        planFinish: "endSeg1[index]",
        projectedFinish: "plannedFinishSeg1[index]",
        comments: "commentarySeg1[index]"
      };

      this.dataArrayList.push(data);

    
    const data7: DataItem = {
      milestone: "32",
      title: "title",
      owner: "ownerSeg1[index]",
      impactedBy: "successorsListSeg1[index]",
      planDate: "beginSeg1[index]",
      projectedStart: "plannedStartSeg1[index]",
      planFinish: "endSeg1[index]",
      projectedFinish: "plannedFinishSeg1[index]",
      comments: "commentarySeg1[index]"
    };

    this.dataArrayList.push(data7);
    const data4: DataItem = {
      milestone: "9",
      title: "title",
      owner: "ownerSeg1[index]",
      impactedBy: "successorsListSeg1[index]",
      planDate: "beginSeg1[index]",
      projectedStart: "plannedStartSeg1[index]",
      planFinish: "endSeg1[index]",
      projectedFinish: "plannedFinishSeg1[index]",
      comments: "commentarySeg1[index]"
    };

    this.dataArrayList.push(data4);
    const data3: DataItem = {
      milestone: "6",
      title: "title",
      owner: "ownerSeg1[index]",
      impactedBy: "successorsListSeg1[index]",
      planDate: "beginSeg1[index]",
      projectedStart: "plannedStartSeg1[index]",
      planFinish: "endSeg1[index]",
      projectedFinish: "plannedFinishSeg1[index]",
      comments: "commentarySeg1[index]"
    };

    this.dataArrayList.push(data3);
    const data2: DataItem = {
      milestone: "3",
      title: "title",
      owner: "ownerSeg1[index]",
      impactedBy: "successorsListSeg1[index]",
      planDate: "beginSeg1[index]",
      projectedStart: "plannedStartSeg1[index]",
      planFinish: "endSeg1[index]",
      projectedFinish: "plannedFinishSeg1[index]",
      comments: "commentarySeg1[index]"
    };

    this.dataArrayList.push(data2);
  
  

  }

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
    var successorsListSeg1 = []
    var plannedStartSeg1 = []
    var plannedFinishSeg1 = []
    var segmentColor: Array<string | CanvasGradient> = [];


    const N: number = 123; // Number of terms to repeat
    const categoryListDisplayYSeg1Target: number[] = [380, 360, 340, 320, 300, 280, 260, 240, 220, 200];
    let array: number[] = [];
    for (let i = 0; i < N; i++) {
      array = array.concat(categoryListDisplayYSeg1Target);
    }
    
    //console.log("Array:", array);
    const segments = [
      { y: 30, fill: Segment1Color ,y1:380},
      { y: 50, fill: Segment2Color ,y1:320},
      { y: 70, fill: Segment3Color,y1:260 },
      { y: 90, fill: Segment4Color,y1:220},
      { y: 110, fill: Segment5Color ,y1:380},
      { y: 130, fill: Segment6Color ,y1:300},
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
        plannedStartSeg1.push(projectedStartDateList[i])
        plannedFinishSeg1.push(projectedFinishDateList[i])

        if (trendLists[i].toLowerCase().includes("no change")) {
          trendSeg1.push("↔️");
        }
        if (trendLists[i].toLowerCase().includes("deteriorated")) {
          trendSeg1.push("⬇️");
        }
        if (trendLists[i].toLowerCase().includes("improved")) {
          trendSeg1.push(<IoMdTrendingUp />);
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
          statusSeg1.push("black");

        }
        for (let j = 0; j < categoryListDisplay.length; j++) {
          if (categoryList[i].includes(categoryListDisplay[j])) {
            yBarSeg1.push(segments[j]['y']);
            categoryListDisplayYSeg1.push(segments[j]['y1']);
            segmentColor.push(segments[j]['fill'])
          }
        }
   



        let circle = {
          x: Math.floor(55 * Number(weekNoFromList[i])),
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
     const Seg1List = Seg1Values.sort((a, b) => a.x - b.x);
    
     if (Seg1List && Seg1List[2]) {

     /*  Seg1List[2].y = 140;
      Seg1List[8].y = 390;
      Seg1List[18].y = 250;

      Seg1List[17].y = 170;

      Seg1List[16].y = 170;
      Seg1List[15].y = 250;
      Seg1List[14].y = 390;
      Seg1List[21].y = 390;

      Seg1List[23].y = 390;

      Seg1List[44].y = 390;
      
      Seg1List[49].y = 390;
      Seg1List[57].y = 450;
     
      Seg1List[70].y = 170;
      Seg1List[69].y = 250;


      Seg1List[112].y = 200;

      Seg1List[118].y = 200; */






    }

     for (let i = 0; i < Seg1List.length-1; i++) {
        if (Seg1List[i].x == Seg1List[i+1].x){
          console.log(Seg1List[i].x ,Seg1List[i+1].x )
        }

    }
    for (let i = 0; i < Seg1List.length; i++) {
      const listItem = Seg1List[i];
      const correspondingItem = Seg1Values.find(item => item.id === listItem.id);
      
      if (correspondingItem) {
        correspondingItem.y = listItem.y;
      }
    }

    console.log(Seg1Values)

   
     const Segment1Categories = finishDateList.map((week, index) => (
      <>
      <Line
          points={[Seg1Values[index]["x"], yBarSeg1[index], Seg1Values[index]["x"],Seg1Values[index]["y"]]}
          stroke={segmentColor[index]}
          strokeWidth={5}
        />
                 <Circle
          x={Seg1Values[index]["x"]}
          y={ Seg1Values[index]["y"]+ 25.8}
          radius={30}
          stroke={statusSeg1[index]}
          strokeWidth={3}
          fill={"white"}

          onClick={() => this.handleDynamic(indexList)}

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
              slipPlaceholder: slipSeg1[index],
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
              slipPlaceholder: slipSeg1[index],
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
       //   text={shortCodeSeg1[index].substring(0, 7)}
       text={String(index)}  
       fontSize={12}
          fill={textColor}
          onClick={(evt) => this.handleDynamic([0,1,2,3])}

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
              slipPlaceholder: slipSeg1[index],
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
              slipPlaceholder: slipSeg1[index],
            });
          }}
        /> 

        
     
        <Text
          x={Seg1Values[index]["x"] - 5}
          y={10}
          width={40 * 2}
          height={40 * 2}
          text={ statusSeg1[index] === "red" ? "🚩" : ""}
          fontSize={30}
          fill={textColor}
        />
       

    {/*   <Text
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
              slipPlaceholder: slipSeg1[index],
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
              slipPlaceholder: slipSeg1[index],
            });
          }}    />*/}
     
      </>
    )); 
   // console.log(Segment1Categories)
    const legendStyle: React.CSSProperties = {
        fontSize: '18px',
        marginBottom: '10px',
        marginTop:'-10px'
      };
    
      const colorRectStyle: React.CSSProperties = {
        width: '50px',
        height: '25px',
        marginRight: '10px',
        display: 'inline-block',
      };
for (let i =0;  i <=successorsListSeg1.length; i++ ){
if (successorsListSeg1 && successorsListSeg1.length > 0) {
  const indexList = successorsList.map(element => shortCodeSeg1.indexOf(element));
//  console.log(indexList);
} else {
  console.log("successorsListSeg1 is undefined or empty");
}
}

const dataArrayList = [];
const indexList = [0,1,2,3,4,5]
/* for (let i = 0; i < indexList.length; i++) {
  const index = indexList[i];
  const data = {
    milestone: shortCodeSeg1[index],
    title: titleSeg1[index],
    owner: ownerSeg1[index],
    impactedBy: successorsListSeg1[index],
    planDate: beginSeg1[index],
    projectedStart: plannedStartSeg1[index],
    planFinish: endSeg1[index],
    projectedFinish: plannedFinishSeg1[index],
    comments: commentarySeg1[index]
  };

  dataArrayList.push(data);
}
 */
//console.log(dataArrayList);

return (
      <>
        <div
          style={{ display: "flex", flexDirection: "column", height: "80vh" }}
        >
          <div style={{ display: "flex", height:" 500px", flexGrow: 3 }}>

            <div style={{ width: "20%", backgroundColor: "white" }}>
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
                    y="130"
                    width="235"
                    height="35"
                    fill={Segment1Color}
                  ></rect>
                  <rect
                    x="20"
                    y="190"
                    width="235"
                    height="35"
                    fill={Segment2Color}
                  ></rect>
                  <rect
                    x="20"
                    y="250"
                    width="235"
                    height="35"
                    fill={Segment3Color}
                  ></rect>
                  <rect
                    x="20"
                    y="310"
                    width="235"
                    height="35"
                    fill={Segment4Color}
                  ></rect>
                  <rect
                    x="20"
                    y="370"
                    width="235"
                    height="35"
                    fill={Segment5Color}
                  ></rect>
                  <rect
                    x="20"
                    y="430"
                    width="235"
                    height="35"
                    fill={Segment6Color}
                  ></rect>
                  <text x={25} y={150} fontSize={18} fill={"white"}>
                    {categoryListDisplay[0]}
                  </text>
                  <text x={25} y={210} fontSize={18} fill={textColor}>
                    {categoryListDisplay[1]}
                  </text>
                  <text x={25} y={270} fontSize={18} fill={textColor}>
                    {categoryListDisplay[2]}
                  </text>
                  <text x={25} y={330} fontSize={18} fill="white">
                    {categoryListDisplay[3]}
                  </text>
                  <text x={25} y={387} fontSize={18} fill={textColor}>
                    {categoryListDisplay[4]}
                  </text>
                  <text x={25} y={480} fontSize={18} fill={textColor}>
                    {categoryListDisplay[5]}
                  </text>
                </g>
{/*                 <text x={25} y={520} fontSize={18} fill={textColor}>
                    {"Legend"}
                  </text>
                  <rect
                    x="25"
                    y="540"
                    width="50"
                    height="25"
                    fill="grey"
                  ></rect>
                   <rect
                    x="25"
                    y="560"
                    width="50"
                    height="25"
                    fill="red"
                  ></rect>
                   <rect
                    x="25"
                    y="585"
                    width="50"
                    height="25"
                    fill="yellow"
                  ></rect>
                  <rect
                    x="25"
                    y="610"
                    width="50"
                    height="25"
                    fill="green"
                  ></rect>
                     <rect
                    x="25"
                    y="635"
                    width="50"
                    height="25"
                    fill="blue"
                  ></rect>
                  <text x={80} y={560} fontSize={18} fill="black">
                    {" - > Not Started"}
                  </text>
                 <text x={80} y={580} fontSize={18} fill="black">
                    {" - > Late"}
                  </text>
                  <text x={80} y={600} fontSize={18} fill="black">
                    {" - > At Risk"}
                  </text>                 
                  <text x={80} y={635} fontSize={18} fill="black">
                    {" - > On Plan"}
                  </text><text x={80} y={655} fontSize={18} fill="black">
                    {" - > Complete"}
                  </text> */}
              </svg>
            </div>
            <div
              ref={this.scrollReference}
              style={{
                width: "60%",
                height:"400px",
                overflowX: "scroll",
                overflowY: "scroll",
                backgroundColor: "white",
              }}
            >
              <div >
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
                        width={ months.length * 5 * 55 }
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
                backgroundColor: backgroundColorVis,
                display: "flex",
                justifyContent: "flex-start"
              }}
            >
               <table style={{ margin: "auto" }}>
      <tbody>
      <tr>
          <td colSpan={2}>
            <div>
              <p style={legendStyle}>Legend</p>
              <div style={{ ...colorRectStyle, backgroundColor: 'grey' }}></div>
              <span>-&gt; Not Started</span><br />
              <div style={{ ...colorRectStyle, backgroundColor: 'red' }}></div>
              <span>-&gt; Late</span><br />
              <div style={{ ...colorRectStyle, backgroundColor: 'yellow' }}></div>
              <span>-&gt; At Risk</span><br />
              <div style={{ ...colorRectStyle, backgroundColor: 'green' }}></div>
              <span>-&gt; On Plan</span><br />
              <div style={{ ...colorRectStyle, backgroundColor: 'blue' }}></div>
              <span>-&gt; Complete</span><br />
            </div>
          </td>
        </tr>
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
            Last Reported  End Date
          </td>
          <td>{lastReportedDatePlaceholder.split("T")[0]}</td>
        </tr>
        <tr>
          <td style={{ fontWeight: "bold" }}>Slip</td>
          <td>{slipPlaceholder} Days</td>
        </tr>
       
      </tbody>
    </table>
            </div>
          </div>
          <div style={{ height: "50vh" }}>
  <table style={{ width: "100%", fontSize: "15px", tableLayout: "fixed", borderCollapse: "collapse", backgroundColor:"grey" }}>
    <thead>
      <tr>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Milestone</th>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Title</th>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Owner</th>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Impacted by</th>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Plan Date</th>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Projected Start</th>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Plan Finish</th>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Projected Finish</th>
        <th style={{ textAlign: "left", border: "1px solid #ccc", padding: "8px" }}>Comments</th>
      </tr>
    </thead>
  </table>
  <div style={{ height: "100px", overflowY: "auto", display: "flex" }}>
    <table style={{ width: "100%", fontSize: "15px", tableLayout: "fixed", borderCollapse: "collapse" }}>
      <tbody>
        {[...new Set(this.dataArrayList.map((data) => data.milestone))].map((milestone, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).milestone}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).title}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).owner}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).impactedBy}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).planDate}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).projectedStart}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).planFinish}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).projectedFinish}</td>
            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{this.dataArrayList.find((data) => data.milestone === milestone).comments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
           </div> 
      </>
    );
  }
}

export default segmentedBar;
