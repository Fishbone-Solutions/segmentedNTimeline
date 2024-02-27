import * as React from "react";
import { useRef } from "react";
import { Stage, Layer, Rect, Text, Line, Circle } from 'react-konva';
import * as moment from 'moment';
import { differenceInCalendarMonths, addMonths, subMonths, getWeek } from 'date-fns';

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
    ActivityNameList?: string[];
    StatusNameList?: string[];
    StartDateList?: string[];
    FinishDateList?: string[];
    ProjectedStartDate?: string[];
    ProjectedFinishDate?: string[];
    OwnerList?: string[];
    PredecessorsList?: string[];
    SuccessorsList?: string[];
    milestoneList?: string[];
    commentaryList?: string[];
    totalFloatList?: string[];
    trendLists?: string[];
    ImpactedByList?: string[];
    LastReportedEnddate?: string[];
}

export const initialState: State = {
    backgroundColorVis: "white",
    activityIDList: [],
    textColor:"white"


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
  console.log(container)
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
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];


        const {
            backgroundColorVis,
            Segment1Color,
            Segment2Color,
            Segment3Color,
            Segment4Color,
            Segment5Color,
            Segment6Color,
            textColor,
            commentaryList,

           
        } = this.state;


















        var weeksSeg1 = [];
        var activitySeg1 = []; 
        var commentarySeg1 = []; 
        var statusSeg1 = []; 
        var elecrificationSeg1 = []; 
        var milestoneCategoryListSeg1 = [];
        
        var weeksSeg2 = []; 
        var activitySeg2 = []; 
        var commentarySeg2 = []; 
        var statusSeg2 = []; 
        var milestoneCategoryListSeg2 = [];
        var weeksSeg3 = []; 
        var activitySeg3 = [];
        var commentarySeg3 = [];
         var statusSeg3 = [];
        
         var weeksSeg4 = [];
         var weeksSeg5 = [];
        var weeksSeg6 = [];
        var activitySeg4 = []; 
        var commentarySeg4 = []; 
        var statusSeg4 = [];
        var activitySeg5 = []; 
        var commentarySeg5 = []; 
        var statusSeg5 = [];
        var activitySeg6 = []; 
        var commentarySeg6 = []; 
        var statusSeg6 = [];

        var categoryList = [];
        var weeknoList=[];

      



        var Seg1Values = [];
        var Seg2Values = [];
        var Seg3Values = [];
        var Seg4Values = [];

        var Seg5Values = [];
        var Seg6Values = [];


        var weekDates = []
        var months = []
        var years = []
        var weekNoFromList = [];

        var flagTrackerListSeg1 = [];
        var flagTrackerListSeg2 = [];
        var flagTrackerListSeg3 = [];
        var flagTrackerListSeg4 = [];
        var flagTrackerListSeg5 = [];
        var flagTrackerListSeg6 = [];


        var activityIDList = [];

        var StatusNameList = [];




        var categoryListDisplay = [...new Set(categoryList)];
        console.log(categoryList)

        categoryListDisplay.sort((a, b) => a.localeCompare(b));

        for (let i = 0; i < weeknoList.length; i++) {
            weekDates.push(new Date(Date.parse(weeknoList[i])))

        }

        const result = weekDates.reduce(
            (acc, date) => {
              const min = acc.min ? (date < acc.min ? date : acc.min) : date;
              const max = acc.max ? (date > acc.max ? date : acc.max) : date || new Date("2026-01-01");
              return { min, max };
            },
            { min: undefined, max: undefined }
          );


        


    //    let startDate4 = moment(new Date(Date.parse(result.min))).startOf('month');
    let startDate4 = moment().startOf('year').set({ month: 0, date: 1, year: 2024 });
        const startDate = startDate4.subtract(1, 'months');
    //    let endDate4 = moment(result.max).startOf('months');
    let endDate4 = moment().startOf('year').set({ month: 0, date: 1, year: 2025});
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
                <button  >{month}</button><button>{years[index]}</button>
            </div >



        )













        for (let i = 0; i < weeknoList.length; i++) {

            const start = subMonths(result.min, 1);
            let week = new Date(Date.parse(weeknoList[i]));
            let weekNos = Math.abs(differenceInCalendarMonths(start, week)) * 5 + (week.getDate() / 7);
            weekNoFromList.push(weekNos)

        }

       categoryListDisplay = [ 'CVL Phasing Strategy',' Infrastructure Management', 'Infrastructure Transformation ', 'Operational Readiness','Rolling Stock','TT Readiness']



        for (let i = 0; i < activityIDList.length; i++) {










            if (categoryList[i].includes(categoryListDisplay[0])) {



                var currentWeekDate = moment(new Date(Date.parse(weeknoList[i])));
                var valueLayer: Number = Math.abs(startDate.diff(currentWeekDate, 'week'));
                weeksSeg1.push(valueLayer);
                activitySeg1.push([i])
                

            




                if (commentaryList[i] === '') {
                    commentarySeg1.push("No Commentary Found")
                }
                else {
                    commentarySeg1.push(commentaryList[i])

                }

                if (StatusNameList[i].toLowerCase().includes('grey')) {
                    statusSeg1.push("black")

                }
                if (StatusNameList[i].toLowerCase().includes('amber')) {
                    statusSeg1.push("amber")

                }
                if (StatusNameList[i].toLowerCase().includes('green')) {
                    statusSeg1.push("green")

                }
                if (StatusNameList[i].toLowerCase().includes('red')) {
                    statusSeg1.push("red")

                }
            


                var obj = {
                    x: 48 * Number(weekNoFromList[i]) + 3,
                    y: 58,
                    width: 3.1,

                    fill: statusSeg1[i],
                    id: 'SEG1' + i,

                };
                Seg1Values.push(obj);







            }
            if (categoryList[i].includes(categoryListDisplay[1])) {

                activitySeg2.push(activityIDList[i])
                commentarySeg2.push(commentaryList[i])
                weeksSeg2.push(parseInt(weekNoFromList[i]))

            


                if (StatusNameList[i].toLowerCase().includes('grey')) {
                    statusSeg2.push("black")

                }
                if (StatusNameList[i].toLowerCase().includes('amber')) {
                    statusSeg2.push("yellow")

                }
                if (StatusNameList[i].toLowerCase().includes('green')) {
                    statusSeg2.push("green")

                }
                if (StatusNameList[i].toLowerCase().includes('red')) {
                    statusSeg2.push("red")

                }
                var rectobjects2 = {
                    x: 48 * Number(weekNoFromList[i]) + 10,
                    y: 180,
                    width: 3.1,
                    height: 103,
                    fill: statusSeg2[i],
                    id: 'SEG2' + i,
                };
                Seg2Values.push(rectobjects2)
         



            }
            if (categoryList[i].includes(categoryListDisplay[2])) {
                weeksSeg3.push(parseInt(weekNoFromList[i]))
                activitySeg3.push(activityIDList[i])
                commentarySeg3.push(commentaryList[i])

          
                if (StatusNameList[i].toLowerCase().includes('red')) {
                    statusSeg3.push("red")

                }


                if (StatusNameList[i].toLowerCase().includes('grey')) {
                    statusSeg3.push("black")

                }
                if (StatusNameList[i].toLowerCase().includes('amber')) {
                    statusSeg3.push("yellow")

                }
                if (StatusNameList[i].toLowerCase().includes('green')) {
                    statusSeg3.push("green")

                }
                var rectobjects3 = {
                    x: 48 * Number(weekNoFromList[i]) + 2,
                    y: 200,
                    width: 3.1,
                    height: 120,
                    fill: statusSeg3[i],
                    id: 'SEG3' + i,
                };
                Seg3Values.push(rectobjects3);



            }
            if (categoryList[i].includes(categoryListDisplay[3])) {
                weeksSeg4.push(parseInt(weekNoFromList[i]))
                activitySeg4.push(activityIDList[i])
                commentarySeg4.push(commentaryList[i])



                if (StatusNameList[i].toLowerCase().includes('grey')) {
                    statusSeg4.push("black")

                }
                if (StatusNameList[i].toLowerCase().includes('amber')) {
                    statusSeg4.push("yellow")

                }
                if (StatusNameList[i].toLowerCase().includes('green')) {
                    statusSeg4.push("green")

                }

                var rectobjects4 = {
                    x: 48 * Number(weekNoFromList[i]) + 10,
                    y: 490,
                    y_bar: 375,
                    width: 3.1,
                    height: 150,
                    fill: statusSeg4[i],
                    id: 'SEG4' + i,
                };
                Seg4Values.push(rectobjects4);


            }
            if (categoryList[i].includes(categoryListDisplay[4])) {
                weeksSeg5.push(parseInt(weekNoFromList[i]))
                activitySeg5.push(activityIDList[i])
                commentarySeg5.push(commentaryList[i])




                if (StatusNameList[i].toLowerCase().includes('grey')) {
                    statusSeg5.push("black")

                }
                if (StatusNameList[i].toLowerCase().includes('amber')) {
                    statusSeg5.push("yellow")

                }
                if (StatusNameList[i].toLowerCase().includes('green')) {
                    statusSeg5.push("green")

                }
                if (StatusNameList[i].toLowerCase().includes('red')) {
                    statusSeg5.push("red")

                }


                var rectobjects5 = {
                    x: 48 * Number(weekNoFromList[i]) + 10,
                    y: 356,
                    y_bar: 375,
                    width: 3.1,
                    height: 150,
                    fill: statusSeg5[i],
                    id: 'SEG5' + i,
                };
                Seg5Values.push(rectobjects5);


            }
            if (categoryList[i].includes(categoryListDisplay[5])) {
                weeksSeg6.push(parseInt(weekNoFromList[i]))
                activitySeg6.push(activityIDList[i])
                commentarySeg6.push(commentaryList[i])



                if (StatusNameList[i].toLowerCase().includes('grey')) {
                    statusSeg6.push("black")

                }
                if (StatusNameList[i].toLowerCase().includes('amber')) {
                    statusSeg6.push("yellow")

                }
                if (StatusNameList[i].toLowerCase().includes('green')) {
                    statusSeg6.push("green")

                }
                if (StatusNameList[i].toLowerCase().includes('red')) {
                    statusSeg6.push("red")

                }

                var rectobjects6 = {
                    x: 48 * Number(weekNoFromList[i]) + 10,
                    y: 356,
                    y_bar: 375,
                    width: 3.1,
                    height: 150,
                    fill: statusSeg6[i],
                    id: 'SEG6' + i,
                };
                Seg6Values.push(rectobjects6);


            }
       
         
        }

        const handleClick = (e) => {
            this.scrollReference.current.scrollLeft = todayDateLocation - 250;
        }

       

        console.log(textColor);


        return (
            <>

<div style={{ display: 'flex', flexDirection: 'column', height: '80vh' }}>
  <div style={{ display: 'flex', flexGrow: 1 }}>
    <div style={{ width: '20%', backgroundColor: 'white' }}>
    <svg height="100%" strokeMiterlimit="10" version="1.1" viewBox="0 0 300 700" width="100%" transform="translate(0,27.2)">
                        <g clipPath="Sidebar" id="Layer-1" fill="green">
                            <rect x="20" y="200" width="220" height="25"
                                fill={Segment1Color}></rect>
                            <rect x="20" y="250" width="220" height="25"
                                fill={Segment2Color}></rect>
                            <rect x="20" y="300" width="220" height="25"
                                fill={Segment3Color}></rect>
                            <rect x="20" y="350" width="220" height="25"
                                fill={Segment4Color}></rect>
                            <rect x="20" y="400" width="220" height="25"
                                fill={Segment5Color}></rect>
                            <rect x="20" y="450" width="220" height="25"
                                fill={Segment6Color}></rect>
                            <text x="25" y="215" fontSize="18"
                                fill="white"> {categoryListDisplay[0]}
                            </text>
                            <text x="25" y="265" fontSize="16"
                                fill={textColor}> {
                                categoryListDisplay[1]
                            } </text>
                            <text x="25" y="315" fontSize="16"
                                fill={textColor}> {
                                categoryListDisplay[2]
                            } </text>
                            <text x="25" y="365" fontSize="16"
                                fill={textColor}> {
                                categoryListDisplay[3]
                            } </text>
                            <text x="25" y="415" fontSize="16"
                                fill={textColor}> {
                                categoryListDisplay[4]
                            } </text>
                            <text x="25" y="465" fontSize="16"
                                fill={textColor}> {
                                categoryListDisplay[5]
                            } </text>


                        </g>
    </svg>
</div>
    <div ref={this.scrollReference} style={{ width: '60%', overflowX: 'scroll', backgroundColor: 'white'  }}>
    <div   ref={this.scrollReference} style={{ width: '900px'}}>
      <div className="relative" style={{backgroundColor:"red"}}>
                        {monthsArray}
                    </div>
                    <div className="relative">
                        {weeksArray}
         </div>
      <Stage width={9000} height={560}  >

<Layer>
<Rect
            x={0}
            y={30}
            width={18000}
            height={6}
            fill={Segment1Color}
            draggable={true}
      
            onDragMove={(e) => {

this.setState({
 //  activityPlaceholder:  String(e.target.y())


})}
}
onClick={(e) => {

this.setState({
  //  activityPlaceholder:  String(e.target.y())


})}
}
   

              
        />
        <Rect
            x={0}
            y={50}
            width={18000}
            height={6}
            fill={Segment2Color}
            onClick={(e) => {

                this.setState({
             //       activityPlaceholder:  String(e.target.y())


                })}}


        ></Rect>
        <Rect
            x={0}
            y={70}
            width={18000}
            height={6}
            fill={Segment3Color}
            onClick={(e) => {

                this.setState({
                  //  activityPlaceholder:  String(e.target.y())


                })}}


        ></Rect>
        
        <Rect
            x={0}
            y={90}
            width={18000}
            height={6}
            fill={Segment4Color}

            onClick={(e) => {

                this.setState({
            //        activityPlaceholder:  String(e.target.y())


                })}}
       / >
         <Rect
            x={0}
            y={110}
            width={18000}
            height={6}
            fill={Segment5Color}
            onClick={(e) => {

                this.setState({
         //           activityPlaceholder:  String(e.target.y())


                })}}


       / >
        <Rect
            x={0}
            y={130}
            width={18000}
            height={6}
            fill={Segment6Color}
            onClick={(e) => {

                this.setState({
            //        activityPlaceholder:  String(e.target.y())


                })}}


       / >
    </Layer>
    <Layer>
     <Line

                points={[400, 30, 400,200]}
                stroke={Segment1Color}
                strokeWidth={7}


            />
    <Circle
  x={400}
  y={200 + 40}
  radius={40}
  stroke="green"
  strokeWidth={5}
    
    >

    </Circle>
    <Text
        x={400-40}
        y={240-40}
        width={40 * 2}
        height={40 * 2}
        align="center"
        verticalAlign="middle"
        text="TfW-CTL-TRANS-T41"
        fontSize={12}
        fill={textColor}
      />



       
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
    <div style={{ width: '20%', backgroundColor: 'yellow', display: 'flex', justifyContent: 'center' }}>
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
  <div style={{ height: '4rem', backgroundColor: 'white' }}>
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
        {/* Additional rows */}
      </tbody>
    </table>
  </div>
</div>
</div>
</>




        )
    }
}

export default segmentedBar;