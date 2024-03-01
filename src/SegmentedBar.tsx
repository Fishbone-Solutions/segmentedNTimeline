import * as React from "react";
import { Stage, Layer, Rect, Text, Line, Circle } from 'react-konva';
import * as moment from 'moment';
import { differenceInCalendarMonths, addMonths, subMonths, getWeek } from 'date-fns';
import { monthNames } from './CONS_TABLE';
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
  }

export const initialState: State = {
    backgroundColorVis: "white",
    activityIDList: [],
    textColor:"white",
    finishDateList:[],
    categoryList:[],
    activityLevelList:[],
    activityNameList:[],
    statusNameList:[],
    milestoneLevelList:[],
    startDateList:[],
    projectedStartDateList:[],
    projectedFinishDateList:[],
    ownerList:[],
    predecessorsList:[],
    successorsList:[],
    commentaryList:[],
    totalFloatList:[],
    trendLists:[],
    lastReportedEndDateList:[]
  }

  export class segmentedBar extends React.Component<any, State>{



    private static updateCallback: (data: object) => void = null;
    scrollReference: React.RefObject<HTMLDivElement>;

    public static update(newState: State) {
        if (typeof segmentedBar.updateCallback === 'function') {
            segmentedBar.updateCallback(newState);
        }
    }

    public state: State = initialState;

    constructor(props: any) {
        super(props);
        this.state = initialState;
        this.scrollReference = React.createRef();

  // Scroll to the middle position in the constructor
  const container = this.scrollReference.current;
  if (container) {
    const containerWidth = container.offsetWidth;
    const scrollPosition = containerWidth / 2;
    container.scrollLeft = scrollPosition;
  }

    }

    public componentWillMount() {
        segmentedBar.updateCallback = (newState: State): void => { this.setState(newState); };
    }

    public componentWillUnmount() {
        segmentedBar.updateCallback = null;
    }
  

    render() {
       


        const {
            commentaryPlaceholder,
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
          } = this.state;


        var weeknoList=[];
        var weekDates = []
        var months = []
        var years = []
        var weekNoFromList = [];

        var finsldates = [];


        console.log("finish", finishDateList);

        for (let i = 0; i < finishDateList.length; i++) {
            finsldates.push(new Date(Date.parse(finishDateList[i])))

        }
      console.log("fin datea",finsldates)

        var categoryListDisplay = [...new Set(categoryList)];
          categoryListDisplay.sort((a, b) => a.localeCompare(b));

         


        const result = finsldates.reduce(
            (acc, date) => {
              const min = acc.min ? (date < acc.min ? date : acc.min) : date;
              const max = acc.max ? (date > acc.max ? date : acc.max) : date || new Date("2026-01-01");
              return { min, max };
            },
            { min: undefined, max: undefined }
          );


       

        


    let startDate4 = moment(new Date(Date.parse(result.min))).startOf('month');
  // let startDate4 = moment().startOf('year').set({ month: 0, date: 1, year: 2024 });
        const startDate = startDate4.subtract(1, 'months');
   let endDate4 = moment(result.max).startOf('months');
 //  let endDate4 = moment().startOf('year').set({ month: 0, date: 1, year: 2025});
        const endDate = endDate4.add(1, 'months');
 

        // Define a variable to hold the current date
        let currentDate = startDate;

        while (currentDate.isSameOrBefore(endDate)) {
            const month = currentDate.month();
            const year = currentDate.year();


            months.push(monthNames[month]);
            years.push(year);
            // Advance the current date by one week
            currentDate = currentDate.add(1, 'months');
        }

        const start = subMonths(result.min, 1);

        const todayDate = new Date();

        const todaysLine = todayDate.getDate() + todayDate.getDay();

        const prefix = [0, 1, 2, 3, 4, 5]

        const currentWeek = prefix[0 | todaysLine / 7] + 1


        const todayDateLocation = Math.abs(differenceInCalendarMonths(start, Date.now())) * 5 * 48 + currentWeek * 48 - 24;
        
        const weeksArray = months.map((week, index) =>
            <>
                <button style={{ width: 48, padding: 0, border: 0 }}>{1}</button>
                <button style={{ width: 48, padding: 0, border: 0 }}>{2}</button>
                <button style={{ width: 48, padding: 0, border: 0 }}>{3}</button>
                <button style={{ width: 48, padding: 0, border: 0 }}>{4}</button>
                <button style={{ width: 48, padding: 0, border: 0 }}>{5}</button>
            </>
        )













        const monthsArray = months.map((month, index) =>

            <div className="monthitem" style={{ backgroundColor: backgroundColorVis }}>
                <button >{month}</button><button>{years[index]}</button>
            </div >



        )

        // Segment 1 Values
      var shortCodeSeg1 = []
      var statusSeg1 = []
      var trendSeg1 =[]
     var titleSeg1 = []
      var ownerSeg1 = []
      var beginSeg1 = []
      var endSeg1 = []
      var lastReportedEndDateSeg1 = []
      var slipSeg1 =[]
      var commentarySeg1 = [] 
      var Seg1Values = []


// Segment 2 Values
var shortCodeSeg2 = [];
var statusSeg2 = [];
var trendSeg2 = [];
var titleSeg2 = [];
var ownerSeg2 = [];
var beginSeg2 = [];
var endSeg2 = [];
var lastReportedEndDateSeg2 = [];
var slipSeg2 = [];
var commentarySeg2 = [];
var Seg2Values = [];

// Segment 3 Values
var shortCodeSeg3 = [];
var statusSeg3 = [];
var trendSeg3 = [];
var titleSeg3 = [];
var ownerSeg3 = [];
var beginSeg3 = [];
var endSeg3 = [];
var lastReportedEndDateSeg3 = [];
var slipSeg3 = [];
var commentarySeg3 = [];
var Seg3Values = [];

// Segment 4 Values
var shortCodeSeg4 = [];
var statusSeg4 = [];
var trendSeg4 = [];
var titleSeg4 = [];
var ownerSeg4 = [];
var beginSeg4 = [];
var endSeg4 = [];
var lastReportedEndDateSeg4 = [];
var slipSeg4 = [];
var commentarySeg4 = [];
var Seg4Values = [];

// Segment 5 Values
var shortCodeSeg5 = [];
var statusSeg5 = [];
var trendSeg5 = [];
var titleSeg5 = [];
var ownerSeg5 = [];
var beginSeg5 = [];
var endSeg5 = [];
var lastReportedEndDateSeg5 = [];
var slipSeg5 = [];
var commentarySeg5 = [];
var Seg5Values = [];

// Segment 6 Values
var shortCodeSeg6 = [];
var statusSeg6 = [];
var trendSeg6 = [];
var titleSeg6 = [];
var ownerSeg6 = [];
var beginSeg6 = [];
var endSeg6 = [];
var lastReportedEndDateSeg6 = [];
var slipSeg6 = [];
var commentarySeg6 = [];
var Seg6Values = [];

var yBarSeg1 = [300,350,380,450,300,350,380,450,300,350,380,450,300,350,380,450,300,350,380,450,]




        const handleClick = (e) => {
          this.scrollReference.current.scrollLeft = todayDateLocation - 250;
      }




        for (let i = 0; i < finishDateList.length; i++) {

            const start = subMonths(result.min, 1);
            let week = new Date(Date.parse(finishDateList[i]));
            let weekNos = Math.abs(differenceInCalendarMonths(start, week)) * 5 + (week.getDate() / 7);
            weekNoFromList.push(weekNos)

        }

       categoryListDisplay = [ 'CVL Phasing Strategy',' Infrastructure Transformation', 'Operational Readiness','Rolling Stock','TT Readiness']
      
for (let  i=0; i < activityIDList.length; i++){

  if (categoryList[i].includes(categoryListDisplay[0])) {

    shortCodeSeg1.push(activityIDList[i])

    titleSeg1.push(activityNameList[i])

    ownerSeg1.push(ownerList[i])

    beginSeg1.push(startDateList[i])

    endSeg1.push(finishDateList[i])


    lastReportedEndDateSeg1.push(lastReportedEndDateList[i])

    slipSeg1.push(totalFloatList[i])

    commentarySeg1.push(commentaryList[i])
 


    

  

    if (trendLists[i].toLowerCase().includes("no change")) {
      trendSeg1.push("↔️");
    }
    if (trendLists[i].toLowerCase().includes("deteriorated")) {
      trendSeg1.push("⬇️");
    }
    if (trendLists[i].toLowerCase().includes("improved")) {
      trendSeg1.push("⬆️");
    }
  
  
  
  
    if (statusNameList[i].toLowerCase().includes("Not Started")){
      statusSeg1.push("grey")
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
  
     let obj = {
      x: 48 * Number(weekNoFromList[i]) + 3,
      y: 200 + 40,
      y1: 300,
      y2:350,
      y3: 450,
      fill: statusSeg1[i],
      id: "SEG1" + i
  };
  Seg1Values.push(obj);




}
if (categoryList[i].includes('Infrastructure Transformation')) {
  // Segment 2
  shortCodeSeg2.push(activityIDList[i]);
  titleSeg2.push(activityNameList[i]);
  ownerSeg2.push(ownerList[i]);
  beginSeg2.push(startDateList[i]);
  endSeg2.push(finishDateList[i]);
  lastReportedEndDateSeg2.push(lastReportedEndDateList[i]);
  slipSeg2.push(totalFloatList[i]);
  commentarySeg2.push(commentaryList[i]);

  if (trendLists[i].toLowerCase().includes("no change")) {
    trendSeg2.push("↔️");
  }
  if (trendLists[i].toLowerCase().includes("deteriorated")) {
    trendSeg2.push("⬇️");
  }
  if (trendLists[i].toLowerCase().includes("improved")) {
    trendSeg2.push("⬆️");
  }

  if (statusNameList[i].toLowerCase().includes("not started")) {
    statusSeg2.push("grey");
  }
  if (statusNameList[i].toLowerCase().includes("late")) {
    statusSeg2.push("red");
  }
  if (statusNameList[i].toLowerCase().includes("at risk")) {
    statusSeg2.push("yellow");
  }
  if (statusNameList[i].toLowerCase().includes("on plan")) {
    statusSeg2.push("green");
  }
  if (statusNameList[i].toLowerCase().includes("completed")) {
    statusSeg2.push("blue");
  }

  let obj = {
    x: 48 * Number(weekNoFromList[i]) + 3,
    y: 200 + 40,
    y1: 300,
    y2: 350,
    y3: 450,
    fill: statusSeg2[i],
    id: "SEG2" + i,
  };
  Seg2Values.push(obj);
}
console.log()

if (categoryList[i].includes('Operational Readiness')) {
  // Segment 3
  shortCodeSeg3.push(activityIDList[i]);
  titleSeg3.push(activityNameList[i]);
  ownerSeg3.push(ownerList[i]);
  beginSeg3.push(startDateList[i]);
  endSeg3.push(finishDateList[i]);
  lastReportedEndDateSeg3.push(lastReportedEndDateList[i]);
  slipSeg3.push(totalFloatList[i]);
  commentarySeg3.push(commentaryList[i]);

  if (trendLists[i].toLowerCase().includes("no change")) {
    trendSeg3.push("↔️");
  }
  if (trendLists[i].toLowerCase().includes("deteriorated")) {
    trendSeg3.push("⬇️");
  }
  if (trendLists[i].toLowerCase().includes("improved")) {
    trendSeg3.push("⬆️");
  }

  if (statusNameList[i].toLowerCase().includes("not started")) {
    statusSeg3.push("grey");
  }
  if (statusNameList[i].toLowerCase().includes("late")) {
    statusSeg3.push("red");
  }
  if (statusNameList[i].toLowerCase().includes("at risk")) {
    statusSeg3.push("yellow");
  }
  if (statusNameList[i].toLowerCase().includes("on plan")) {
    statusSeg3.push("green");
  }
  if (statusNameList[i].toLowerCase().includes("completed")) {
    statusSeg3.push("blue");
  }

  let obj = {
    x: 48 * Number(weekNoFromList[i]) + 3,
    y: 200 + 40,
    y1: 300,
    y2: 350,
    y3: 450,
    fill: statusSeg3[i],
    id: "SEG3" + i,
  };
  Seg3Values.push(obj);
}
if (categoryList[i].includes('Rolling Stock')) {
  // Segment 4
  shortCodeSeg4.push(activityIDList[i]);
  titleSeg4.push(activityNameList[i]);
  ownerSeg4.push(ownerList[i]);
  beginSeg4.push(startDateList[i]);
  endSeg4.push(finishDateList[i]);
  lastReportedEndDateSeg4.push(lastReportedEndDateList[i]);
  slipSeg4.push(totalFloatList[i]);
  commentarySeg4.push(commentaryList[i]);

  if (trendLists[i].toLowerCase().includes("no change")) {
    trendSeg4.push("↔️");
  }
  if (trendLists[i].toLowerCase().includes("deteriorated")) {
    trendSeg4.push("⬇️");
  }
  if (trendLists[i].toLowerCase().includes("improved")) {
    trendSeg4.push("⬆️");
  }

  if (statusNameList[i].toLowerCase().includes("not started")) {
    statusSeg4.push("grey");
  }
  if (statusNameList[i].toLowerCase().includes("late")) {
    statusSeg4.push("red");
  }
  if (statusNameList[i].toLowerCase().includes("at risk")) {
    statusSeg4.push("yellow");
  }
  if (statusNameList[i].toLowerCase().includes("on plan")) {
    statusSeg4.push("green");
  }
  if (statusNameList[i].toLowerCase().includes("completed")) {
    statusSeg4.push("blue");
  }

  let obj = {
    x: 48 * Number(weekNoFromList[i]) + 3,
    y: 200 + 40,
    y1: 300,
    y2: 350,
    y3: 450,
    fill: statusSeg4[i],
    id: "SEG4" + i,
  };
  Seg4Values.push(obj);
}

// Segment 4
if (categoryList[i].includes('TT Readiness')) {
  // Segment 4
  shortCodeSeg4.push(activityIDList[i]);
  titleSeg4.push(activityNameList[i]);
  ownerSeg4.push(ownerList[i]);
  beginSeg4.push(startDateList[i]);
  endSeg4.push(finishDateList[i]);
  lastReportedEndDateSeg4.push(lastReportedEndDateList[i]);
  slipSeg4.push(totalFloatList[i]);
  commentarySeg4.push(commentaryList[i]);

  if (trendLists[i].toLowerCase().includes("no change")) {
    trendSeg4.push("↔️");
  }
  if (trendLists[i].toLowerCase().includes("deteriorated")) {
    trendSeg4.push("⬇️");
  }
  if (trendLists[i].toLowerCase().includes("improved")) {
    trendSeg4.push("⬆️");
  }

  if (statusNameList[i].toLowerCase().includes("not started")) {
    statusSeg4.push("grey");
  }
  if (statusNameList[i].toLowerCase().includes("late")) {
    statusSeg4.push("red");
  }
  if (statusNameList[i].toLowerCase().includes("at risk")) {
    statusSeg4.push("yellow");
  }
  if (statusNameList[i].toLowerCase().includes("on plan")) {
    statusSeg4.push("green");
  }
  if (statusNameList[i].toLowerCase().includes("completed")) {
    statusSeg4.push("blue");
  }

  let obj = {
    x: 48 * Number(weekNoFromList[i]) + 3,
    y: 200 + 40,
    y1: 300,
    y2: 350,
    y3: 450,
    fill: statusSeg4[i],
    id: "SEG4" + i,
  };
  Seg4Values.push(obj);
}

if (categoryList[i].includes(categoryListDisplay[4])) {
  // Segment 5
  shortCodeSeg5.push(activityIDList[i]);
  titleSeg5.push(activityNameList[i]);
  ownerSeg5.push(ownerList[i]);
  beginSeg5.push(startDateList[i]);
  endSeg5.push(finishDateList[i]);
  lastReportedEndDateSeg5.push(lastReportedEndDateList[i]);
  slipSeg5.push(totalFloatList[i]);
  commentarySeg5.push(commentaryList[i]);

  if (trendLists[i].toLowerCase().includes("no change")) {
    trendSeg5.push("↔️");
  }
  if (trendLists[i].toLowerCase().includes("deteriorated")) {
    trendSeg5.push("⬇️");
  }
  if (trendLists[i].toLowerCase().includes("improved")) {
    trendSeg5.push("⬆️");
  }

  if (statusNameList[i].toLowerCase().includes("not started")) {
    statusSeg5.push("grey");
  }
  if (statusNameList[i].toLowerCase().includes("late")) {
    statusSeg5.push("red");
  }
  if (statusNameList[i].toLowerCase().includes("at risk")) {
    statusSeg5.push("yellow");
  }
  if (statusNameList[i].toLowerCase().includes("on plan")) {
    statusSeg5.push("green");
  }
  if (statusNameList[i].toLowerCase().includes("completed")) {
    statusSeg5.push("blue");
  }

  let obj = {
    x: 48 * Number(weekNoFromList[i]) + 3,
    y: 200 + 40,
    y1: 300,
    y2: 350,
    y3: 450,
    fill: statusSeg5[i],
    id: "SEG5" + i,
  };
  Seg5Values.push(obj);
}



if (categoryList[i].includes(categoryListDisplay[5])) {
  // Segment 6
  shortCodeSeg6.push(activityIDList[i]);
  titleSeg6.push(activityNameList[i]);
  ownerSeg6.push(ownerList[i]);
  beginSeg6.push(startDateList[i]);
  endSeg6.push(finishDateList[i]);
  lastReportedEndDateSeg6.push(lastReportedEndDateList[i]);
  slipSeg6.push(totalFloatList[i]);
  commentarySeg6.push(commentaryList[i]);

  if (trendLists[i].toLowerCase().includes("no change")) {
    trendSeg6.push("↔️");
  }
  if (trendLists[i].toLowerCase().includes("deteriorated")) {
    trendSeg6.push("⬇️");
  }
  if (trendLists[i].toLowerCase().includes("improved")) {
    trendSeg6.push("⬆️");
  }

  if (statusNameList[i].toLowerCase().includes("not started")) {
    statusSeg6.push("grey");
  }
  if (statusNameList[i].toLowerCase().includes("late")) {
    statusSeg6.push("red");
  }
  if (statusNameList[i].toLowerCase().includes("at risk")) {
    statusSeg6.push("yellow");
  }
  if (statusNameList[i].toLowerCase().includes("on plan")) {
    statusSeg6.push("green");
  }
  if (statusNameList[i].toLowerCase().includes("completed")) {
    statusSeg6.push("blue");
  }

  let obj = {
    x: 48 * Number(weekNoFromList[i]) + 3,
    y: 200 + 40,
    y1: 300,
    y2: 350,
    y3: 450,
    fill: statusSeg6[i],
    id: "SEG6" + i,
  };
  Seg6Values.push(obj);
}














}
console.log("shortCodeSeg2:", shortCodeSeg2);
console.log("statusSeg2:", statusSeg2);
console.log("trendSeg2:", trendSeg2);
console.log("titleSeg2:", titleSeg2);
console.log("ownerSeg2:", ownerSeg2);
console.log("beginSeg2:", beginSeg2);
console.log("endSeg2:", endSeg2);
console.log("lastReportedEndDateSeg2:", lastReportedEndDateSeg2);
console.log("slipSeg2:", slipSeg2);
console.log("commentarySeg2:", commentarySeg2);
console.log("Seg2Values:", Seg2Values);


console.log("trend",trendLists)
const Segment1Categories = endSeg1.map((week, index) => (<>


<Line

points={[Seg1Values[index]["x"], 30, Seg1Values[index]["x"],200]}
stroke={Segment1Color}
strokeWidth={7}


/>
<Circle
x={Seg1Values[index]["x"]}
y={200 + 40}
radius={40}
stroke={statusSeg1[index]}
strokeWidth={5}

>

</Circle>

<Text
x={Seg1Values[index]["x"]-40}
y={240-40}
width={40 * 2}
height={40 * 2}
align="center"
verticalAlign="middle"
text={shortCodeSeg1[index]}
fontSize={12}
fill={textColor}
/>

<Text
x={Seg1Values[index]["x"]-40}
y={240-20}
width={40 * 2}
height={40 * 2}
align="center"
verticalAlign="middle"
text={"⬆️"}
fontSize={20}
fill={textColor}
/>

</>));

const Segment2Categories = endSeg2.map((week, index) => (
  <>
    <Line
      points={[Seg2Values[index]["x"], 50, Seg2Values[index]["x"], 270]}
      stroke={Segment2Color}
      strokeWidth={7}
    />
    <Circle
      x={Seg2Values[index]["x"]}
      y={270 + 40}
      radius={40}
      stroke={statusSeg2[index]}
      strokeWidth={5}
    ></Circle>
    <Text
      x={Seg2Values[index]["x"] - 40}
      y={270 }
      width={40 * 2}
      height={40 * 2}
      align="center"
      verticalAlign="middle"
      text={shortCodeSeg2[index]}
      fontSize={12}
      fill={textColor}
    />
    <Text
      x={Seg2Values[index]["x"] - 40}
      y={270+30}
      width={40 * 2}
      height={40 * 2}
      align="center"
      verticalAlign="middle"
      text={"⬆️"}
      fontSize={20}
      fill={textColor}
    />
  </>
));

console.log("Segment2",shortCodeSeg2)

const Segment3Categories = endSeg3.map((week, index) => (
  <>
    <Line
      points={[Seg3Values[index]["x"], 50, Seg3Values[index]["x"], 300]}
      stroke={Segment3Color}
      strokeWidth={7}
    />
    <Circle
      x={Seg3Values[index]["x"]}
      y={300 + 40}
      radius={40}
      stroke={statusSeg3[index]}
      strokeWidth={5}
    ></Circle>
    <Text
      x={Seg3Values[index]["x"] - 40}
      y={340 - 40}
      width={40 * 2}
      height={40 * 2}
      align="center"
      verticalAlign="middle"
      text={shortCodeSeg3[index]}
      fontSize={12}
      fill={textColor}
    />
    <Text
      x={Seg3Values[index]["x"] - 40}
      y={340 - 20}
      width={40 * 2}
      height={40 * 2}
      align="center"
      verticalAlign="middle"
      text={"⬆️"}
      fontSize={12}
      fill={textColor}
    />
  </>
));


const Segment4Categories = endSeg4.map((week, index) => (
  <>
    <Line
      points={[Seg4Values[index]["x"], 70, Seg4Values[index]["x"], 400]}
      stroke={Segment4Color}
      strokeWidth={7}
    />
    <Circle
      x={Seg4Values[index]["x"]}
      y={400 + 40}
      radius={40}
      stroke={statusSeg4[index]}
      strokeWidth={5}
    ></Circle>
    <Text
      x={Seg4Values[index]["x"] - 40}
      y={440 - 40}
      width={40 * 2}
      height={40 * 2}
      align="center"
      verticalAlign="middle"
      text={shortCodeSeg4[index]}
      fontSize={12}
      fill={textColor}
    />
    <Text
      x={Seg4Values[index]["x"] - 40}
      y={440 - 20}
      width={40 * 2}
      height={40 * 2}
      align="center"
      verticalAlign="middle"
      text={"⬆️"}
      fontSize={12}
      fill={textColor}
    />
  </>
));

const segments = [
  { y: 30, fill: Segment1Color },
  { y: 50, fill: Segment2Color },
  { y: 70, fill: Segment3Color },
  { y: 90, fill: Segment4Color },
  { y: 110, fill: Segment5Color },
  { y: 130, fill: Segment6Color }
];


      


        return (
            <>

<div style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
  <div style={{ display: 'flex', flexGrow: 1 }}>
    <div style={{ width: '20%', backgroundColor: 'white' }}>
    <svg height="100%" strokeMiterlimit="10" version="1.1" viewBox="0 0 300 700" width="100%" transform="translate(0,27.2)">
    <g clipPath="Sidebar" id="Layer-1" fill="green">
<rect x="20" y="200" width="235" height="35" fill={Segment1Color}></rect>
<rect x="20" y="250" width="235" height="35" fill={Segment2Color}></rect>
<rect x="20" y="300" width="235" height="35" fill={Segment3Color}></rect>
<rect x="20" y="350" width="235" height="35" fill={Segment4Color}></rect>
<rect x="20" y="400" width="235" height="35" fill={Segment5Color}></rect>
<rect x="20" y="450" width="235" height="35" fill={Segment6Color}></rect>
<text x={25} y={220} fontSize={18} fill={textColor}>{categoryListDisplay[0]}</text>
<text x={25} y={275} fontSize={18} fill={textColor}>{categoryListDisplay[1]}</text>
<text x={25} y={320} fontSize={18} fill={textColor}>{categoryListDisplay[2]}</text>
<text x={25} y={370} fontSize={18} fill={textColor}>{categoryListDisplay[3]}</text>
<text x={25} y={420} fontSize={18} fill={textColor}>{categoryListDisplay[4]}</text>
<text x={25} y={480} fontSize={18} fill={textColor}>{categoryListDisplay[5]}</text>
</g>
    </svg>
</div>
    <div ref={this.scrollReference} style={{ width: '60%', overflowX: 'scroll', backgroundColor: 'white'  }}>
    <div style={{width:'20000px'}}>
      <div className="relative" style={{backgroundColor:"red"}}>
                        {monthsArray}
                    </div>
                    <div className="relative">
                        {weeksArray}
         </div>
<Stage width={20000} height={560} style={{ backgroundColor:backgroundColorVis}} >
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
{Segment2Categories}
{Segment3Categories}
{Segment4Categories}



       
    </Layer>
    <Layer>
        <Rect
            x={todayDateLocation}
            y={150}
            width={2}
            height={800}
            fill="green"

        ></Rect>
        <Text x={todayDateLocation} y={35} text="Today" fontSize={15} fill="white"></Text>


    </Layer>


     </Stage>
      </div>
    </div>
    <div style={{ width: '20%', backgroundColor: 'grey', display: 'flex', justifyContent: 'center' }}>
    {/* <p style={{textAlign:"center", fontSize:"30px", color:"white" }}>🚧 WORK IN PROGRESS <br></br> (  Table ) </p> */}

    
    <table style={{ margin: 'auto' }}>
        <tbody >
            <tr>
                <td style={{ fontWeight: 'bold' }}>Title</td>
                <td>EE4b</td>
            </tr>
            <tr>
                <td style={{ fontWeight: 'bold' }}>Owner</td>
                <td>Infrastrucutre Transformation</td>
            </tr>
            <tr>
                <td style={{ fontWeight: 'bold' }}>Trend</td>
                <td>⬆️ ⬇️↔️</td>
            </tr>
            <tr>
                <td style={{ fontWeight: 'bold' }}>BaseLine</td>
                <td>01/01/2024</td>
            </tr>
            <tr>
                <td style={{ fontWeight: 'bold' }}>End Date</td>
                <td>01/01/2024</td>
            </tr>
            <tr>
                <td style={{ fontWeight: 'bold' }}>Last Reported End Date</td>
                <td>01/01/2024</td>
            </tr>
            <tr>
                <td style={{ fontWeight: 'bold' }}>Slip</td>
                <td>20 Days</td>
            </tr>
        </tbody>
    </table>
            
</div>
  </div>
  <div style={{ height: '4rem', backgroundColor: 'grey' }}>
    <p style={{textAlign:"center", fontSize:"30px", color:"white" }}>🚧 WORK IN PROGRESS (  Dynamic table ) </p>
    {/*
  <div style={{ width: '100%', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
    <table style={{ width: '100%', tableLayout: 'fixed' ,justifyContent: 'center'   }}>
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




        )
    }
}

export default segmentedBar;