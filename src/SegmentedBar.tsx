import * as React from "react";
import { Stage, Layer, Rect, Text, Line } from 'react-konva';
import * as moment from 'moment';
import { differenceInCalendarMonths, addMonths, subMonths, getWeek } from 'date-fns';


export interface State {
    commentaryPlaceholder?: string,
    backgroundColorVis?: string,
    Segment1Color?: string,
    Segment2Color?: string,
    Segment3Color?: string,
    Segment4Color?: string,
    Segment5Color?: string,
    Segment6Color?: string,
    textColor?: string,
    activityList?: string[]
    commentaryList?: string[],
    weeknoList?: string[],
    categoryList?: string[],
    milestoneCategoryList?: string[],
    statusList?: string[],
    activityPlaceholder?: string,
    scrollReference?: string
}

export const initialState: State = {
    backgroundColorVis: "white",
    activityList: [],
    weeknoList: [],
    categoryList: [],
    milestoneCategoryList: [],
    statusList: [],
    commentaryList: [],


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
            activityList,
            weeknoList,
            categoryList,
            milestoneCategoryList,
            statusList,
            commentaryList,
            commentaryPlaceholder,
            activityPlaceholder,
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

        var categoryListDisplay = [...new Set(categoryList)];

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



        let startDate4 = moment(new Date(Date.parse(result.min))).startOf('month');
        const startDate = startDate4.subtract(1, 'months');
        let endDate4 = moment(result.max).startOf('months');
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













        for (let i = 0; i < weeknoList.length; i++) {

            const start = subMonths(result.min, 1);
            let week = new Date(Date.parse(weeknoList[i]));
            let weekNos = Math.abs(differenceInCalendarMonths(start, week)) * 5 + (week.getDate() / 7);
            weekNoFromList.push(weekNos)

        }



        for (let i = 0; i < activityList.length; i++) {










            if (categoryList[i].includes(categoryListDisplay[0])) {



                var currentWeekDate = moment(new Date(Date.parse(weeknoList[i])));
                var valueLayer: Number = Math.abs(startDate.diff(currentWeekDate, 'week'));
                weeksSeg1.push(valueLayer);
                activitySeg1.push(activityList[i])




                if (commentaryList[i] === '') {
                    commentarySeg1.push("No Commentary Found")
                }
                else {
                    commentarySeg1.push(commentaryList[i])

                }

                if (statusList[i].toLowerCase().includes('grey')) {
                    statusSeg1.push("black")

                }
                if (statusList[i].toLowerCase().includes('amber')) {
                    statusSeg1.push("yellow")

                }
                if (statusList[i].toLowerCase().includes('green')) {
                    statusSeg1.push("green")

                }
                for (let i = 0; i < milestoneCategoryList.length; i++) {
                    if (milestoneCategoryList[i].toLowerCase().includes('energisation') && categoryList[i].includes('1. Infrastructure Transformation')) {

                        elecrificationSeg1.push(weekNoFromList[i])


                    }
                }
                if (milestoneCategoryList[i].toLowerCase().includes('critical')) {

                    milestoneCategoryListSeg1.push("🚩")


                }
                else {
                    milestoneCategoryListSeg1.push('')

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

                activitySeg2.push(activityList[i])
                commentarySeg2.push(commentaryList[i])
                weeksSeg2.push(parseInt(weekNoFromList[i]))


                if (statusList[i].toLowerCase().includes('grey')) {
                    statusSeg2.push("black")

                }
                if (statusList[i].toLowerCase().includes('amber')) {
                    statusSeg2.push("yellow")

                }
                if (statusList[i].toLowerCase().includes('green')) {
                    statusSeg2.push("green")

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
                if (milestoneCategoryList[i].toLowerCase().includes('critical')) {

                    milestoneCategoryListSeg2.push("🚩")


                }
                else {
                    milestoneCategoryListSeg2.push('')

                }




            }
            if (categoryList[i].includes(categoryListDisplay[2])) {
                weeksSeg3.push(parseInt(weekNoFromList[i]))
                activitySeg3.push(activityList[i])
                commentarySeg3.push(commentaryList[i])


                if (statusList[i].toLowerCase().includes('grey')) {
                    statusSeg3.push("black")

                }
                if (statusList[i].toLowerCase().includes('amber')) {
                    statusSeg3.push("yellow")

                }
                if (statusList[i].toLowerCase().includes('green')) {
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
                activitySeg4.push(activityList[i])
                commentarySeg4.push(commentaryList[i])



                if (statusList[i].toLowerCase().includes('grey')) {
                    statusSeg4.push("black")

                }
                if (statusList[i].toLowerCase().includes('amber')) {
                    statusSeg4.push("yellow")

                }
                if (statusList[i].toLowerCase().includes('green')) {
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
                activitySeg5.push(activityList[i])
                commentarySeg5.push(commentaryList[i])



                if (statusList[i].toLowerCase().includes('grey')) {
                    statusSeg5.push("black")

                }
                if (statusList[i].toLowerCase().includes('amber')) {
                    statusSeg5.push("yellow")

                }
                if (statusList[i].toLowerCase().includes('green')) {
                    statusSeg5.push("green")

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
                activitySeg6.push(activityList[i])
                commentarySeg6.push(commentaryList[i])



                if (statusList[i].toLowerCase().includes('grey')) {
                    statusSeg6.push("black")

                }
                if (statusList[i].toLowerCase().includes('amber')) {
                    statusSeg6.push("yellow")

                }
                if (statusList[i].toLowerCase().includes('green')) {
                    statusSeg6.push("green")

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

        for (let i = 0; i < milestoneCategoryList.length; i++) {

            if (milestoneCategoryList[i].toLowerCase().includes('Critical') && categoryList[i].includes('1. Infrastructure Transformation')) {

                milestoneCategoryListSeg1.push(weekNoFromList[i])


            }
        }
        for (let i = 0; i < milestoneCategoryList.length; i++) {
            if (milestoneCategoryList[i].toLowerCase().includes('Critical') && categoryList[i].includes('3. Operational Readiness')) {

                milestoneCategoryListSeg2.push(weekNoFromList[i])


            }
        }



 //       var yBarList = [10, 50, 80, 100, 120, 180, 200, 155, 40, 140, 120, 180, 10, 50, 80, 100, 120, 180, 10, 50, 80, 100, 120, 180, 65, 140, 120, 180, 10, 50, 80, 100, 120, 180, 10, 50, 80, 100, 120, 180]
//        var yBarListSeg2 = [40, 60, 200, 240, 260, 280, 30, 60, 200, 240, 260, 280, 30, 60, 200, 240, 260, 280, 30, 60, 200, 240, 260, 280]
//        var yBarListSeg3 = [40, 60, 200, 240, 260, 280, 30, 60, 200, 240, 260, 280, 30, 60, 200, 240, 260, 280, 30, 60, 200, 240, 260, 280] 
     //   var yBarListSeg4 = [430, 450, 470, 490, 510, 530, 430, 450, 470, 490, 510, 530, 430, 450, 470, 490, 510, 530,]
     //   var yBarListSeg5 = [430, 450, 470, 490, 510, 530, 430, 450, 470, 490, 510, 530, 430, 450, 470, 490, 510, 530,]
     //   var yBarListSeg6 = [430, 450, 470, 490, 510, 530, 430, 450, 470, 490, 510, 530, 430, 450, 470, 490, 510, 530,]

        function generateArray(start, end, count,variance) {
            var step = (end - start) / (count - 1);
            var array = [];
          
            for (var i = 0; i < count; i++) {
                var fraction = i / (count - 1);
    var randomOffset = (Math.random() * 2 - 1) * variance;
    var value = start + (end - start) * fraction + randomOffset;
    array.push(value);
  }

  return array;

          }
          var yBarList = generateArray(50, 100, activityList.length, 100);
          var yBarListSeg2 = generateArray(100, 200, activityList.length, 80);
          var yBarListSeg3 = generateArray(200, 280, activityList.length, 80);
          var yBarListSeg4 = generateArray(430, 530,  activityList.length, 50);
          var yBarListSeg5 = generateArray(430, 530, activityList.length, 50);
          var yBarListSeg6 = generateArray(430, 530,  activityList.length, 50);



        const Segment1Categories = weeksSeg1.map((week, index) =>

            <>

                <Text text={milestoneCategoryListSeg1[index] + String(activitySeg1[index]).substring(0, 30)} x={Seg1Values[index]['x']} y={yBarList[index]} fontSize={12}
                    fill={textColor}
                    width={250}
                    height={5}
                    draggable={false}
                    onClick={(e) =>



                        this.setState({
                            commentaryPlaceholder: commentarySeg1[index],
                            activityPlaceholder: activitySeg1[index]




                        })
                    }

                />




                <Line

                    points={[Seg1Values[index]['x'], yBarList[index], Seg1Values[index]['x'], 304]}


                    stroke={statusSeg1[index]}

                />




            </>




        )
        const Segment2Categories = weeksSeg2.map((week, index) =>

            <>

                <Text text={String(activitySeg2[index]).substring(0, 30) + String(milestoneCategoryListSeg2[index])}
                    x={Seg2Values[index]['x'] + 3} y={yBarListSeg2[index]}
                    fontSize={12}
                    width={250}
                    height={5}
                    fill={textColor}
                    draggable={false}

                    onClick={(e) =>


                        this.setState({
                            activityPlaceholder: activitySeg2[index],
                            commentaryPlaceholder: commentarySeg2[index]




                        })}

                />

                <Line

                    points={[Seg2Values[index]['x'], yBarListSeg2[index], Seg2Values[index]['x'], 317]}


                    stroke={statusSeg2[index]}

                />



            </>



        )
        const Segment3Categories = weeksSeg3.map((week, index) =>
            <>
                <Text text={activitySeg3[index]}
                    x={Seg3Values[index]['x'] + 3} y={yBarListSeg3[index]}
                    width={250}
                    height={5}
                    fontSize={12}
                    fill={textColor}
                    draggable={false}

                    onClick={() =>


                        this.setState({
                            activityPlaceholder: activitySeg3[index],
                            commentaryPlaceholder: commentarySeg3[index]



                        })}

                />
                <Line

                    points={[Seg3Values[index]['x'], yBarListSeg3[index], Seg3Values[index]['x'], 330]}


                    stroke={statusSeg3[index]}

                />







            </>

        )
        const Segment4Categories = weeksSeg4.map((week, index) =>

            <>

                <Text text={activitySeg4[index]}

                    x={Seg4Values[index]['x'] + 3} y={yBarListSeg4[index]}

                    fontSize={12}
                    fill={textColor}
                    width={250}
                    height={5}
                    draggable={false}
                    onClick={() =>


                        this.setState({
                            activityPlaceholder: activitySeg4[index],
                            commentaryPlaceholder: commentarySeg4[index],


                        })}

                />
                <Line

                    points={[Seg4Values[index]['x'], yBarListSeg4[index], Seg4Values[index]['x'], 343]}


                    stroke={statusSeg4[index]}

                />






            </>

        )
        const Segment5Categories = weeksSeg5.map((week, index) =>

        <>

            <Text text={activitySeg5[index]}

                x={Seg5Values[index]['x'] + 3} y={yBarListSeg5[index]}

                fontSize={12}
                fill={textColor}
                width={250}
                height={5}
                draggable={false}
                onClick={() =>


                    this.setState({
                        activityPlaceholder: activitySeg4[index],
                        commentaryPlaceholder: commentarySeg4[index],


                    })}

            />
            <Line

                points={[Seg5Values[index]['x'], yBarListSeg4[index], Seg5Values[index]['x'], 356]}


                stroke={statusSeg5[index]}

            />






        </>

    )
       const Segment6Categories = weeksSeg6.map((week, index) =>

    <>

        <Text text={activitySeg6[index]}

            x={Seg6Values[index]['x'] + 3} y={yBarListSeg6[index]}

            fontSize={12}
            fill={textColor}
            width={250}
            height={5}
            draggable={false}
            onClick={() =>


                this.setState({
                    activityPlaceholder: activitySeg6[index],
                    commentaryPlaceholder: commentarySeg6[index],


                })}

        />
        <Line

            points={[Seg6Values[index]['x'], yBarListSeg6[index], Seg6Values[index]['x'], 369]}


            stroke={statusSeg6[index]}

        />






    </>

)
 

        const ElectricalEvents = elecrificationSeg1.map(electric =>
            <Text text="⚡" fontSize={27} x={48 * electric - 18} y={304} />
        )


        const handleClick = (e) => {
            this.scrollReference.current.scrollLeft = todayDateLocation - 250;
        }
     

        



        return (
            <>

                <div className="block-left" style={{ backgroundColor: backgroundColorVis }}>
                  <button className="todaybutton" onClick={(e) => handleClick(e)}>Scroll To Today</button>     
                    <div className="imageplaceholder" style={{ position: "relative" }}>
                    <svg height="100%" stroke-miterlimit="10" version="1.1" viewBox="0 0 300 700" width="100%" transform="translate(0,27.2)">
  <g clip-path="Sidebar" id="Layer-1">
 

  <rect x="20" y="70" width="220" height="25" fill="red"></rect>
<rect x="20" y="110" width="220" height="25" fill="blue"></rect>
<rect x="20" y="150" width="220" height="25" fill="green"></rect>
<rect x="20" y="190" width="220" height="25" fill="yellow"></rect>
<rect x="20" y="230" width="220" height="25" fill="orange"></rect>
<rect x="20" y="270" width="220" height="25" fill="purple"></rect>



    <text x="25" y="90" fontSize="13" fill="black">{categoryListDisplay[0]}</text>
    <text x="25" y="130" fontSize="13" fill="black">{categoryListDisplay[1]}</text>
    <text x="25" y="170" fontSize="13" fill="black">{categoryListDisplay[2]}</text>
    <text x="25" y="210" fontSize="13" fill="black">{categoryListDisplay[3]}</text>
    <text x="25" y="250" fontSize="13" fill="black">{categoryListDisplay[4]}</text>
    <text x="25" y="290" fontSize="13" fill="black">{categoryListDisplay[5]}</text>



  </g>
  
</svg>
                    </div>
                </div>
                <div className="block" style={{ backgroundColor: backgroundColorVis }} ref={this.scrollReference} >

                    <div className="relative">
                        {monthsArray}
                    </div>
                    <div className="relative">
                        {weeksArray}
                    </div>



                    <Stage width={19000} height={560}  >

                    <Layer>
<Rect
                                x={0}
                                y={304}
                                width={18000}
                                height={4}
                                fill={Segment1Color}
                                draggable={true}
                          
                                onDragMove={(e) => {

                    this.setState({
                        activityPlaceholder:  String(e.target.y())


                    })}
                }
                onClick={(e) => {

                    this.setState({
                        activityPlaceholder:  String(e.target.y())


                    })}
                }
                       

                                  
                            />
                            <Rect
                                x={0}
                                y={317}
                                width={18000}
                                height={4 }
                                fill={Segment2Color}
                                draggable={true}
                                onClick={(e) => {

                                    this.setState({
                                        activityPlaceholder:  String(e.target.y())
                
                
                                    })}}


                            ></Rect>
                            <Rect
                                x={0}
                                y={330}
                                width={18000}
                                height={4}
                                fill={Segment3Color}
                                draggable={true}
                                onClick={(e) => {

                                    this.setState({
                                        activityPlaceholder:  String(e.target.y())
                
                
                                    })}}


                            ></Rect>
                            
                            <Rect
                                x={0}
                                y={343}
                                width={18000}
                                height={4}
                                fill={Segment4Color}
                                draggable={true}

                                onClick={(e) => {

                                    this.setState({
                                        activityPlaceholder:  String(e.target.y())
                
                
                                    })}}
                           / >
                             <Rect
                                x={0}
                                y={356}
                                width={18000}
                                height={4}
                                fill={Segment5Color}
                                draggable={true}
                                onClick={(e) => {

                                    this.setState({
                                        activityPlaceholder:  String(e.target.y())
                
                
                                    })}}


                           / >
                            <Rect
                                x={0}
                                y={369}
                                width={18000}
                                height={4}
                                fill={Segment6Color}
                                draggable={true}
                                onClick={(e) => {

                                    this.setState({
                                        activityPlaceholder:  String(e.target.y())
                
                
                                    })}}


                           / >
                        </Layer>
                        <Layer>
                           {Segment1Categories}
                           {Segment2Categories}
                           {Segment3Categories}
                           {Segment4Categories}
                           {Segment5Categories}
                           {Segment6Categories}


                            {ElectricalEvents}

                        </Layer>
                        <Layer>
                            <Rect
                                x={todayDateLocation}
                                y={5}
                                width={2}
                                height={800}
                                fill="green"

                            ></Rect>
                            <Text x={todayDateLocation} y={35} text="Today" fontSize={15} fill="white"></Text>


                        </Layer>


                    </Stage>


















                </div>



                <div style={{ backgroundColor: backgroundColorVis, color: textColor }}>

                    <Text fill={textColor}> Activity:-{activityPlaceholder} </Text>
                    <br></br>
                    <Text fill={textColor}>Commentary:- {commentaryPlaceholder}</Text>




                </div>




            </>




        )
    }
}

export default segmentedBar;