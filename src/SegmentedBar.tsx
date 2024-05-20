import * as React from "react";
import { Stage, Layer, Rect, Text, Line, Circle, Image,Group } from "react-konva";
import * as moment from "moment";
import { differenceInCalendarMonths, subMonths } from "date-fns";
import { monthNames } from "./CONS_TABLE";
import useImage from "use-image";
import { MdOutlineTrendingUp, MdOutlineTrendingDown, MdOutlineTrendingFlat } from 'react-icons/md';
import DataTable,  {TableStyles ,} from 'react-data-table-component';
import { useState } from "react";

const StatusIcon = (props) => {
  if (props.status === "Improved") {
    const [image] = useImage(
      "https://raw.githubusercontent.com/Fishbone-Solutions/FB_CDN/main/stick.png"
    );
    return (
      <Image width={30} height={30} image={image} x={props.x} y={props.y} />
    );
  } else if (props.status === "Deteriorated") {
    const [image] = useImage(
      "https://raw.githubusercontent.com/Fishbone-Solutions/FB_CDN/main/down.png"
    );
    return (
      <Image width={30} height={30} image={image} x={props.x} y={props.y} />
    );
  } else if (props.status === "No Change") {
    const [image] = useImage(
      "https://raw.githubusercontent.com/Fishbone-Solutions/FB_CDN/main/stable.png"
    );
    return (
      <Image width={30} height={30} image={image} x={props.x} y={props.y} />
    );
  }

  else if (props.status === "flag") {
    const [image] = useImage(
      "https://raw.githubusercontent.com/Fishbone-Solutions/FB_CDN/main/flag.png"
    );
    return (
      <Image width={30} height={30} image={image} x={props.x} y={props.y} />
    );
  }
  else if (props.status === null) {
    const [image] = useImage(
      "https://raw.githubusercontent.com/Fishbone-Solutions/FB_CDN/main/flag.png"
    );
    return (
     <></>
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
  SidetextColor?:string,
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
  activityPlaceholder?: string,
  rightSideBar?: string,
  currentActiveMilestonePlaceholder?:string,
  dataArray?:DataItem[],
  predecessorsArray?:  PrecedessorsPointers[],
  NavigationTracker?: string[];
  activeLayer?: boolean

}
export const initialState: State = {
  backgroundColorVis: "white",
  activityIDList: [],
  textColor: "black",
  SidetextColor:"white",
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
  activityPlaceholder:"",
  rightSideBar: "flex",
  currentActiveMilestonePlaceholder:"",
  NavigationTracker:[],
  activeLayer: false

};

interface PrecedessorsPointers {
   milestone: string,
   scrollpositon: Number
}

interface DataItem {
  activeElement: string,
  milestone: string,
  title: string;
  owner: string;
  impactedBy: string;
  planDate?: string;
  projectedStart?: string;
  planFinish?: string;
  projectedFinish?: string;
  comments: string;
}
export class segmentedBar extends React.Component<any, State> {
  private static updateCallback: (data: object) => void = null;
  scrollReference: React.RefObject<HTMLDivElement>;
  rightSideBar: String;
  scrollPosition: number = 0; // New scrollPosition property
 

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
    this.rightSideBar="flex";
    
    


  }


  public static getUpdateCallback() {
    return segmentedBar.updateCallback;
  }


  handleClick = (LookupTable, successorsList, predecessorsList, activeElement) => {




    
    const successors = successorsList.split(',').map((item) => item.trim().replace(/\n/g, ''));
    const predecessors = predecessorsList.split(',').map((item) => item.trim().replace(/\n/g, ''));   
    this.setState((prevState) => {
      const filteredDataArray = LookupTable.filter((item) => {
      const itemActiveElement = item[1];
        return itemActiveElement === activeElement || successors.includes(itemActiveElement);
      }).map((item) => ({
        milestone: item[1],
        title: item[2],
        owner: item[3],
        impactedBy: item[8],
        planDate: item[4],
        projectedStart: item[6],
        planFinish: item[5],
        projectedFinish: item[7],
        comments: item[10],
      }));
  
  
      const predDataArray = LookupTable.filter((item) => {
        const itemActiveElement = item[1];
        return predecessors.includes(itemActiveElement);
      }).map((item) => ({
        ScrollPointer:  Number(item[0]),
        }));


         // Insert activeElement as the first item in filteredDataArray
         const activeElementData = filteredDataArray.find((item) => item.milestone === activeElement);
         const filteredDataArrayWithoutActive = filteredDataArray.filter((item) => item.milestone !== activeElement);
         filteredDataArrayWithoutActive.sort((a, b) => {
          const dateA = new Date(a.planFinish);
          const dateB = new Date(b.planFinish);
          return dateA.getTime() - dateB.getTime();
        });
         const updatedFilteredDataArray = [activeElementData, ...filteredDataArrayWithoutActive];
       return {
        currentActiveMilestonePlaceholder: String(activeElement),
        dataArray: updatedFilteredDataArray,
        predecessorsArray: predDataArray,
      };
    });
  };


  handleToggleDisplay = () => {
    this.setState(prevState => ({
      rightSideBar: prevState.rightSideBar === "flex" ? "none" : "flex"
    }));
  };

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
      SidetextColor,
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
      activityPlaceholder,
      rightSideBar,
      currentActiveMilestonePlaceholder,
     NavigationTracker,
      dataArray,
      activeLayer
    } = this.state;

    let months = [];
    let years = [];
    let finalDatesIterator = [];

    for (const element of finishDateList) {
      finalDatesIterator.push(new Date(Date.parse(element)));
    }
    let categoryListDisplay = [...new Set(categoryList)];
    categoryListDisplay.sort((a, b) => a.localeCompare(b));

    const result = finalDatesIterator.reduce(
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
    let currentDate = startDate;

    while (currentDate.isSameOrBefore(endDate)) {
      const month = currentDate.month();
      const year = currentDate.year();

      months.push(monthNames[month]);
      years.push(year);
      currentDate = currentDate.add(1, "months");
    }

    const start = subMonths(result.min, 1);
    const todayDate = new Date();
    const todaysLine = todayDate.getDate() + todayDate.getDay();
    const prefix = [0, 1, 2, 3, 4, 5];
    const currentWeek = prefix[0 | (todaysLine / 7)] + 1;
    const todayDateLocation = Math.abs(differenceInCalendarMonths(start, Date.now())) * 5 * 55 +currentWeek * 55 -24;
    const EndDateLocation = Math.abs(differenceInCalendarMonths(start, endDate.toDate())) * 5 * 55;
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const todayDateString: string = today.toLocaleDateString('en-UK', options).split('/').join('/');
    
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
    
    const handleClickHomeNavigation = (e) => {
      this.scrollReference.current.scrollLeft = todayDateLocation - 250;
    };


  
    const handleClickHome = (e, offset) => {
     const scrollpositon =  LookupTable.filter((item) => {
        const itemActiveElement = item[1].replace(/\s/g, "");
          return itemActiveElement === offset;
        }).map((item) => (item[0]));

          if (Number(scrollpositon[0]) == null || String(scrollpositon[0]) === '' ||isNaN(Number(scrollpositon[0]))) {
        }
      else {
        
        this.scrollReference.current.scrollLeft =  Number(scrollpositon[0])  - 100

      }
     };


  









    function formatDate(dateString) {
      const date = new Date(dateString);
      if (isNaN(date.getTime()) || dateString === null) {
        return ''; // Return an empty string if the date is NaN or null
      }
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const columns = [
      {
        name: "Milestone",
        selector: row => row.milestone,
        sortable: false,
        width: "100px"
        
      },
      {
        name: "Title",
        selector: row => row.title,
        width: "270px"

      },
      {
        name: "Owner",
        selector: row => row.owner,
        width: "100px"

      },
      {
        name: "Impacted By",
        selector: row => row.impactedBy,
        width: "100px"


      },
      {
        name: "Plan Date",
        selector: row => row.planDate,
        cell: row => formatDate(row.planDate),
        width: "100px"

      },
      {
        name: "Projected Start",
        selector: row => row.projectedStart,
        cell: row => formatDate(row.projectedStart),
        width: "100px"

      },
      {
        name: "Plan Finish",
        selector: row => row.planFinish,
        cell: row => formatDate(row.planFinish),
        width: "100px"

      },
      {
        name: "Projected Finish",
        selector: row => row.projectedFinish,
        cell: row => formatDate(row.projectedFinish),
        width: "130px"

      },
      {
        name: "Comments",
        selector: row => row.comments,
        width: "210px"

      },
    ];
  
    const ExpandedComponent = ({ data }) => {
      return (
        <>
        {data.impactedBy && data.impactedBy.split(',').map((value, index) => (
          value.trim().includes("NaN") ? null : (
            <button
            key={index}
            onClick={(e) => {
              const trimmedValue = value.trim().replace(/\s/g, "");
              handleClickHome(e, String(trimmedValue));
          
              if (trimmedValue !== "null") {
                this.setState((prevState) => {
                  const lastValue = prevState.NavigationTracker[prevState.NavigationTracker.length - 1];
                  if (lastValue !== trimmedValue) {
                    return {
                      NavigationTracker: [...prevState.NavigationTracker, trimmedValue],
                    };
                  }
                  return prevState;
                });
              }
            }}
            style={{ backgroundColor: '#B93333', color: 'white', width: 'fit-content' }}
          >
            {value.trim()}
          </button>
          )
        ))}
        {!data.impactedBy && (
          <button
            style={{ backgroundColor: '#B93333', color: 'white', width: 'fit-content' }}
          >
            No Predecessors
          </button>
        )}
      </>
      );
    };
    
 


    var shortCodeSeg1 = [];
    var statusSeg1 = [];
    var titleSeg1 = [];
    var ownerSeg1 = [];
    var beginSeg1 = [];
    var endSeg1 = [];
    var lastReportedEndDateSeg1 = [];
    var slipSeg1 = [];
    var ypositionLocator;
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
    var TrendsList = [];
    var predecessorsListSeg1 = [];
    var LookupTable: string[][] = [];
    

    const segments = [
      { y: 25, fill: Segment1Color, y1: 380 },
      { y: 57, fill: Segment2Color, y1: 320 },
      { y: 89, fill: Segment3Color, y1: 260 },
      { y: 121, fill: Segment4Color, y1: 220 },
      { y: 153, fill: Segment5Color, y1: 380 },
      { y: 185, fill: Segment6Color, y1: 300 },
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
      if (statusNameList[i].toLowerCase().includes("not started")) {
        statusSeg1.push("grey");
      }
      else if (statusNameList[i].toLowerCase().includes("late")) {
        statusSeg1.push("red");
      }
      else if (statusNameList[i].toLowerCase().includes("at risk")) {
        statusSeg1.push("yellow");
      }
      else if (statusNameList[i].toLowerCase().includes("on plan")) {
        statusSeg1.push("green");
      }
      else if (statusNameList[i].toLowerCase().includes("complete")) {
        statusSeg1.push("blue");
      }  
      else {
        statusSeg1.push("black");
      }
    } 
    for (let i = 0; i < activityIDList.length; i++) {
      shortCodeSeg1.push(activityIDList[i]);
      if (trendLists[i].toLowerCase().includes("No Trend")) {
        TrendsList.push("stable");
      }
      else if (trendLists[i].toLowerCase().includes("Deteriorated")) {
        TrendsList.push("down");
      }
     else if (trendLists[i].toLowerCase().includes("Improved")) {
        TrendsList.push("up");
      }
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
      predecessorsListSeg1.push(predecessorsList[i]);
      for (let j = 0; j < categoryListDisplay.length; j++) {
        if (categoryList[i].includes(categoryListDisplay[j])) {
          yBarSeg1.push(segments[j]["y"]);
          categoryListDisplayYSeg1.push(segments[j]["y1"]);
          segmentColor.push(segments[j]["fill"]);
        }
      }
      visitedWeeks.push(weekNoFromList[i]);
      visitedWeeks.forEach((num) => {
        countMap[num] = (countMap[num] || 0) + 1;
      });
      ypositionLocator = 0;
      if (weekNoFromList[i] % 2 === 0) {
        ypositionLocator = 200;
   
      } else {
        ypositionLocator = 210;
      }

    
   
      const countDict: { [key: number]: number } = {};

      for (const value of weekNoFromList) {
        if (value in countDict) {
          countDict[value]++;
        } else {
          countDict[value] = 1;
        }
      }
      

    

      
      let milestone = {
        x: 55.4 * Number(weekNoFromList[i]),
        y: ypositionLocator,
        fill: statusSeg1[i],
        id: "SEG1" + i,
        trends: trendLists[i],
        categoryList: categoryList[i],
        shortCodeSeg: shortCodeSeg1[i].replace(/\s/g, ""),
        titleSeg: titleSeg1[i],
        ybarSeg: yBarSeg1[i],
        ownerSeg1: ownerSeg1[i],
        beginSeg1: beginSeg1[i],
        endSeg1: endSeg1[i],
        lastReportedEndDateSeg1: lastReportedEndDateSeg1[i],
        slipSeg1: slipSeg1[i],
        commentarySeg1: commentarySeg1[i],
        categoryListDisplaySeg1: categoryListDisplaySeg1[i],
        successorsList: successorsListSeg1[i],
        predecessorsList: predecessorsListSeg1[i]
      };



  
for (const existingMilestone of Seg1Values) {
  if (existingMilestone.x === milestone.x && existingMilestone.y === milestone.y) {
    milestone.y += 65; 
  }
}
      Seg1Values.push(milestone);
} 



for (let i = 0; i < activityIDList.length; i++) {
      LookupTable.push([
       String(55 * Number(weekNoFromList[i])), //0
        activityIDList[i].replace(/\s/g, ""), // 1
        activityNameList[i], // 2
        ownerList[i], // 3
        startDateList[i], // 4 
        finishDateList[i], // 5 
        projectedStartDateList[i], // 6
        projectedFinishDateList[i], // 7
        predecessorsList[i], // 8 
        successorsList[i], // 9
        commentaryList[i], // 10
      ]);
    } 
  


 



  

  
 


    const Segment1Categories = finishDateList.map((week, index) => {
      const {
        x,
        y,
        fill,
        shortCodeSeg,
        titleSeg,
        ownerSeg,
        beginSeg1,
        endSeg1,
        categoryListDisplaySeg1,
        trends,
        lastReportedEndDateSeg1,
        slipSeg1,
      } = Seg1Values[index];
    

    




      const handleMouseEnter = () => {
        this.setState({
          titlePlaceholder: titleSeg,
          ownerPlaceholder: ownerSeg,
          baseLineDatePlaceholder: String(beginSeg1),
          endDatePlaceholder: String(endSeg1),
          activityPlaceholder: categoryListDisplaySeg1,
          trendPlaceholder: trends,
          lastReportedDatePlaceholder: String(lastReportedEndDateSeg1),
          slipPlaceholder: slipSeg1
        });
      };
    
      const handleMouseLeave = () => {
        this.setState({
          titlePlaceholder: titleSeg,
          ownerPlaceholder: ownerSeg,
          trendPlaceholder: trends,
          baseLineDatePlaceholder: String(beginSeg1),
          endDatePlaceholder: String(endSeg1),
          activityPlaceholder: categoryListDisplaySeg1,
          lastReportedDatePlaceholder: String(lastReportedEndDateSeg1),
          slipPlaceholder: slipSeg1
        });
      };
    
      return (
        <React.Fragment key={index}>
              <Circle
                x={x}
                y={y + 25.8}
                fill={backgroundColorVis}
                radius={30}
                stroke={fill}
                strokeWidth={3}
            /*   onClick={()=>{
                this.setState({ NavigationTracker: [] });
                 this.handleClick(LookupTable, String(Seg1Values[index]["successorsList"]), String(Seg1Values[index]["predecessorsList"]),Seg1Values[index]["shortCodeSeg"])}
              } */
                onPointerEnter={handleMouseEnter}
              />
        
        
              <StatusIcon
                x={x - 14}
                y={y + 10}
                status={trends}
               /*  onClick={()=>{
                  this.setState({ NavigationTracker: [] });
                  this.handleClick(LookupTable, String(Seg1Values[index]["successorsList"]), String(Seg1Values[index]["predecessorsList"]),Seg1Values[index]["shortCodeSeg"])}
                } */
                onMouseEnter={handleMouseEnter}
        />
        <Text
                x={x - 40}
                y={y}
                width={80} // Increase the width to expand the clickable area horizontally
  height={70} 
                align="center"
                verticalAlign="middle"
                text={shortCodeSeg}
                fontSize={8}
                fill={textColor}
                onClick={()=>{
                  this.setState({ NavigationTracker: [] });
                  this.handleClick(LookupTable, String(Seg1Values[index]["successorsList"]), String(Seg1Values[index]["predecessorsList"]),Seg1Values[index]["shortCodeSeg"])}
                  
                }
                
                onMouseEnter={handleMouseEnter}
              />
             
             
            </React.Fragment>
      );
    });
    const Segment1Lines = finishDateList.map((week, index) => (
      <>
      <StatusIcon
          x={Seg1Values[index]["x"]}
          y={Seg1Values[index]["ybarSeg"]}
          status={Seg1Values[index]["fill"] == "red" ? "flag": null}
       

        />
      <Line
      points={[
        Seg1Values[index]["x"],
        yBarSeg1[index]-this.scrollPosition,
        Seg1Values[index]["x"],
        Seg1Values[index]["y"]-this.scrollPosition,
      ]}
      stroke={segmentColor[index]}
      strokeWidth={5}
    />

        </>
    ));


   

    const legendStyle: React.CSSProperties = {
      fontSize: "18px",
      marginBottom: "10px",
      marginTop: "-10px",
      
    };

    const colorRectStyle: React.CSSProperties = {
      width: "25px",
      height: "12px",
      marginRight: "10px",
      display: "inline-block",
    };
    const customStyles: TableStyles = {
  
  rows: {
		style: {
			minHeight: '30px', // override the row height
		},
	},
  
    headCells: {
      style: {
        backgroundColor: "#B93333",
        color: "#fff",
        paddingLeft: '8px', // override the cell padding for head cells
			  paddingRight: '8px',
        minHeight: '20px', // override the row height

      },
    },

    cells: {
      style: {
        color: "#32192f",
      },
    },
  };

  const NavigationSegment =  NavigationTracker.map((item) => (
      

    <button
      key={item}
      onClick={(e) => {
        const trimmedValue = item.trim().replace(/\s/g, "");
        handleClickHome(e, String(trimmedValue)); 
      }}
      style={{ backgroundColor:"#f87171" , color:"white", fontSize:"16px"}}
    >
      {item}
      
    </button>
  
  
  ))



  const handleClick = () => {
    this.setState({ activeLayer: true });
  };

   const Xval = [60,92,124,156,188,220]
    return (
      
        <div
          style={{ display: "flex", flexDirection: "column",  }}
        >
          <div style={{ display: "flex", height: " 500px", flexGrow: 3 }}>
            <div style={{ width: "20%", backgroundColor: backgroundColorVis  }}>

            <div className="sidebar">
    <Stage width={251.64} height={500} style={{ zIndex:0}} >
    <Layer>
  {categoryListDisplay[0] && (
    <>
      <Rect
        id="Rectangle1"
        x={50}
        y={Xval[0]}
        width={208.9}
        height={20}
        fill={Segment1Color}
      />
      <Text
        x={50}
        y={Xval[0]}
        width={208.9}
        height={20}
        text={categoryListDisplay[0]}
        fill={SidetextColor}
        align="center"
        verticalAlign="middle"
      />
    </>
  )}

  {categoryListDisplay[1] && (
    <>
      <Rect
        id="Rectangle2"
        x={50}
        y={Xval[1]}
        width={208.9}
        height={20}
        fill={Segment2Color}
      />
      <Text
        x={50}
        y={Xval[1]}
        width={208.9}
        height={20}
        text={categoryListDisplay[1]}
        fill={SidetextColor}
        align="center"
        verticalAlign="middle"
      />
    </>
  )}

  {categoryListDisplay[2] && (
    <>
      <Rect
        id="Rectangle3"
        x={50}
        y={Xval[2]}
        width={208.9}
        height={20}
        fill={Segment3Color}
      />
      <Text
        x={50}
        y={Xval[2]}
        width={208.9}
        height={20}
        text={categoryListDisplay[2]}
        fill={SidetextColor}
        align="center"
        verticalAlign="middle"
      />
    </>
  )}

  {categoryListDisplay[3] && (
    <>
      <Rect
        id="Rectangle4"
        x={50}
        y={Xval[3]}
        width={208.9}
        height={20}
        fill={Segment4Color}
      />
      <Text
        x={50}
        y={Xval[3]}
        width={208.9}
        height={20}
        text={categoryListDisplay[3]}
        fill={SidetextColor}
        align="center"
        verticalAlign="middle"
      />
    </>
  )}

  {categoryListDisplay[4] && (
    <>
      <Rect
        id="Rectangle5"
        x={50}
        y={Xval[4]}
        width={208.9}
        height={20}
        fill={Segment5Color}
      />
      <Text
        x={50}
        y={Xval[4]}
        width={208.9}
        height={20}
        text={categoryListDisplay[4]}
        fill={SidetextColor}

        align="center"
        verticalAlign="middle"
      />
    </>
  )}

  {categoryListDisplay[5] && (
    <>
      <Rect
        id="Rectangle6"
        x={50}
        y={Xval[5]}
        width={208.9}
        height={20}
        fill={Segment6Color}
      />
      <Text
        x={50}
        y={Xval[5]}
        width={208.9}
        height={20}
        text={categoryListDisplay[5]}
        fill={SidetextColor}
        align="center"
        verticalAlign="middle"
      />
    </>
  )}
</Layer>
  </Stage>
</div>
            </div>

            <div
              ref={this.scrollReference}
              style={{
                width: "100%",
                height: "500px",
                overflowX: "scroll",
                backgroundColor: backgroundColorVis,
              }}
            >
              <div>
                <div
                  className="relative"
                  style={{ backgroundColor: backgroundColorVis,  }}>
      
                  {monthsArray}
                </div>
                <div className="relative">{weeksArray}</div>
                <Stage
                  width={19000}
                  height={800}
                  style={{ backgroundColor: backgroundColorVis }}
                >
                   <Layer>
                  <Rect
                      x={todayDateLocation}
                      y={5}
                      width={0.8}
                      height={800}
                      fill="black"
                    ></Rect>
                    <Text
                      x={todayDateLocation + 3}
                      y={10}
                      text={"Today: " + todayDateString} 
                      fontSize={15}
                      fill="black"
                    ></Text>
                  </Layer>
                  {segments.map((segment, index) => {
  if (categoryListDisplay[index]) {
    return (
      <Layer>
      <Rect
        key={index}
        x={0}
        y={segment.y}
        width={months.length * 5 * 55}
        height={6}
        fill={segment.fill}
      />
      </Layer>
    );
  }
})}
                
      <Layer >
      {Segment1Lines}
      {Segment1Categories}
      </Layer>
                </Stage>
              </div>
            </div>
            <button onClick={this.handleToggleDisplay}  style={{ zIndex:999, backgroundColor:"#B93333", color:"white",  width: 'fit' }} >{"||"}</button>   
            <div
              style={{
                width: "40%",
                height:"550",
                backgroundColor: backgroundColorVis,
                display: rightSideBar,
                overflow: "auto"


              }}
            >
               <table >
                <tbody style={{ margin: "fixed"}}>
                  <tr style={{ display: 'block', width: '100%' }}></tr>
                </tbody>
                </table>
              <table >
              <button style={{ zIndex:999, backgroundColor:"#B93333", color:"white",  width: 'fit', }}   onClick={(e) => handleClickHomeNavigation(e)}>Today</button>   
              <tbody style={{ margin: "fixed", borderCollapse: "collapse"  }}>
                  <tr style={{ display: 'block', width: '100%' }}>
                   
                  </tr>
                  <tr>
  <td style={{ fontWeight: "bold" }}>Activity Category</td>
  <td>{activityPlaceholder}</td>
</tr>
<tr>
  <td style={{ fontWeight: "bold" }}>Title</td>
  <td style={{ }}>{titlePlaceholder}</td>  
</tr>
<tr>
  <td style={{ fontWeight: "bold" }}>Owner</td>
  <td style={{/* border: "1px solid black" */ }}>{ownerPlaceholder}</td>
</tr>
<tr>
  <td style={{ fontWeight: "bold", /*border: "1px solid black"*/ }}>Trend</td>
  <td style={{/* border: "1px solid black"*/ }}>
  {trendPlaceholder === "Improved" ? (
  <MdOutlineTrendingUp style={{ color: "#40B04A", fontSize: "2em" }} />
) : trendPlaceholder === "Deteriorated" ? (
  <MdOutlineTrendingDown style={{ color: "red", fontSize: "2em" }} />
) : trendPlaceholder === "No Change" ? (
  <MdOutlineTrendingFlat style={{ color: "yellow", fontSize: "2em" }} />
) : null}
  </td>
</tr>
<tr>
  <td style={{ fontWeight: "bold",/* border: "1px solid black" */}}>BaseLine</td>
  <td>
    {baseLineDatePlaceholder.split("T")[0].split("-").reverse().join("-")}
  </td>
</tr>
<tr>
  <td style={{ fontWeight: "bold"}}>End Date</td>
  <td >
    {endDatePlaceholder.split("T")[0].split("-").reverse().join("-")}
  </td>
</tr>
<tr>
  <td style={{ fontWeight: "bold" }}>Last Reported End Date</td>
  <td >
    {lastReportedDatePlaceholder.split("T")[0].split("-").reverse().join("-")}
  </td>
</tr>
<tr>
  <td style={{ fontWeight: "bold" }}>Slip</td>
  <td >{slipPlaceholder} Days</td>
</tr>


                </tbody>
                <tr>
  <td colSpan={2}>
    <div> 
      <p style={legendStyle}><b>{"Legend"}</b></p>
      <div style={{ ...colorRectStyle, backgroundColor: "grey" }}></div>
      <span>Not Started</span>
      <br />
      <div style={{ ...colorRectStyle, backgroundColor: "red" }}></div>
      <span>Late</span>
      <br />
      <div style={{ ...colorRectStyle, backgroundColor: "yellow" }}></div>
      <span>At Risk</span>
      <br />
      <div style={{ ...colorRectStyle, backgroundColor: "green" }}></div>
      <span>On Plan</span>
      <br />
      <div style={{ ...colorRectStyle, backgroundColor: "blue" }}></div>
      <span>Complete</span>
      <br />
</div>
  </td>
</tr>
              </table>
            </div>
          </div>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
  <tr  style={{ width: "100%", borderCollapse: "collapse" }}>
  <td
  onClick={(e) => { 
    handleClickHome(e, String(currentActiveMilestonePlaceholder)); 
    this.setState({ NavigationTracker: [] }

      
    ); }}
  style={{
    width: "1.5%",
    borderCollapse: "collapse",
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
  }}
>
  X
</td>
    <td  style={{borderCollapse: "collapse"   ,width: "25%",backgroundColor: "blue", color: "white", fontSize: ""}}>
     Selected Milestone :  {currentActiveMilestonePlaceholder}
    </td>
    <td >
    {NavigationSegment}

    </td>
    
  </tr>
</table>
  <div style={{ display: "grid", gridTemplateColumns: "auto min-content" }}>
  <div>

</div>
  </div>

    <div style={{ height: "200px", overflow:"auto" }}>
 


  <DataTable
    columns={columns}
    data={dataArray}
    expandableRows
    expandableRowsComponent={ExpandedComponent}
    customStyles={customStyles}
    pagination 
    dense={true}   
  />
</div>

        </div> 
      
    );
  }
}
export default segmentedBar;
