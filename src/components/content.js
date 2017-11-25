import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios'
import './home.css';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import LogoDHL from '../pic/content.png';
import LogoFedEx from '../pic/design.png';
import LogoKerry from '../pic/marketing.png';
import LogoSendIt from '../pic/programming.png';
import ywc from '../pic/logo.png';



// https://ywc15.ywc.in.th/api/interview



const MyMapComponent = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class content extends React.PureComponent {
    state = {
        isMarkerShown: false,
      }
    constructor(props) {
        super(props);
        this.state = {

            data: [],
            count: [],
            programming: [],
            marketing: [],
            design: [],
            content: [],
            findName:{},
            isMarkerShown: false,
            major : 1


        }
        this.sendgetRequest = this.sendgetRequest.bind(this);
        this.handleChange = this.handleChange.bind(this)
       
        this.delayedShowMarker = this.delayedShowMarker.bind(this)
        
        this.handleMarkerClick = this.handleMarkerClick.bind(this)
    }

    




    componentDidMount() {
        this.sendgetRequest();
        this.delayedShowMarker()
       

    }

    handleChange(e) {
        
                this.state.findName[e.target.name] = e.target.value
                
                this.setState(
                    this.state
        
                        )
                        // console.log(this.state.findName)

                        console.log(this.state.findName)
                        
                        
                }


    sendgetRequest() {


        if (this.data == null) {
            axios.get('https://ywc15.ywc.in.th/api/interview')
                .then((response) => {
                    console.log(response.data);
                    this.setState({ data: response.data })
                    

                    { this.splitdata() }

                })
                .then(() => {
                    // console.log("second then")
                    // console.log(this.state.data.length)
                    // console.log(this.state.programming)




                })
                .catch((error) => {
                    console.log(error);

                });
        }

    }

    splitdata() {

        for (var i = 0; i < this.state.data.length; i++) {
            switch (this.state.data[i].major) {
                case "programming":
                    this.state.programming.push(this.state.data[i])
                    break;

                case "marketing":
                    this.state.marketing.push(this.state.data[i])
                    break;

                case "content":
                    this.state.content.push(this.state.data[i])
                    break;

                case "design":
                    this.state.design.push(this.state.data[i])
                    break;

                default:
                    console.log("Switch Case Error")
            }
        }

        { this.sortData() }

    }

    sortData() {




        //ultimate sort  credit to : https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
        this.state.programming.sort(function (a, b) { return (a.interviewRef > b.interviewRef) ? 1 : ((b.interviewRef > a.interviewRef) ? -1 : 0); });
        this.state.marketing.sort(function (a, b) { return (a.interviewRef > b.interviewRef) ? 1 : ((b.interviewRef > a.interviewRef) ? -1 : 0); });
        this.state.content.sort(function (a, b) { return (a.interviewRef > b.interviewRef) ? 1 : ((b.interviewRef > a.interviewRef) ? -1 : 0); });
        this.state.design.sort(function (a, b) { return (a.interviewRef > b.interviewRef) ? 1 : ((b.interviewRef > a.interviewRef) ? -1 : 0); });


        // console.log(this.state.programming)
        // console.log(this.state.marketing)
        // console.log(this.state.content)
        // console.log(this.state.design)






    }

    


    delayedShowMarker = () => {
        setTimeout(() => {
          this.setState({ isMarkerShown: true })
        }, 100)
      }
    
      handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
      }


    render() {




        return (
            <div className="home" >


<center>



<div className="jumbotron">

<img id="imgywc" src={ywc}/>

<h1>   SEMI_FINAL ROUND
</h1>

<h3>ประกาศผู้มีสิทธิ์เข้าสัมภาษณ์ </h3>

<br/>

<div className="panel panel-default" id = "fact-panel">
<div className="panel-body">

<h5>การสัมภาษณ์จะจัดขึ้นในวันที่ 26 พฤศจิกายน 2560 ณ อาคาร ซี.พี.ทาวเวอร์ 1 (สีลม) </h5>
<h5>ซึ่งจะแบ่งออกเป็น 2 รอบ คือ รอบช่วงเช้าตั้งแต่เวลา 9.00 น. ถึง 12.00 น. และ รอบช่วงบ่ายตั้งแต่เวลา 13.00 น. ถึง 18.00 น.</h5>
 
</div>
</div>




</div>
</center>



                <div className="col-md-2" >
                

                </div>


                <div className="col-md-8" >

                <div className="panel panel-default">
  <div className="panel-heading">
    <h3 className="panel-title"><big id="bigTag">การบ้านสาขาคอนเทนท์</big></h3>
  </div>
  <div className="panel-body">
  ให้น้อง ๆ <big id="bigTag">เลือก</big> ทำคอนเทนต์ใด คอนเทนต์หนึ่งจาก 2 หัวข้อด้านล่าง โดยต้องทำเป็นคอนเทนต์ออกมาจริงเท่านั้น ไม่จำกัดรูปแบบการนำเสนอ
  <br/><br/>
  <big id="bigTag">หัวข้อที่ให้เลือก</big><br/>
1. คอนเทนต์ที่ทำให้ผู้ใช้ Social เข้าใจ Cyberbullying และตระหนักถึงปัญหาที่เกิดขึ้นจาก Cyberbullying<br/>
2. คอนเทนต์ที่ทำให้คนไทยเปลี่ยนพฤติกรรมเสพติดหน้าจอ เสพติด Social หันมาพูดคุยกัน เจอหน้ากันในชีวิตจริง ๆ มากกว่าที่เป็นอยู่
  </div>
</div>

<div className="alert alert-warning" role="alert">
           <p>CT1 - CT25 สัมภาษณ์ช่วงเช้าตั้งแต่เวลา 9.00 น. ถึง 12.00 น. </p>
           <p>CT26 - CT56 สัมภาษณ์ช่วงบ่ายตั้งแต่เวลา 13.00 น. ถึง 18.00 น. </p>

           </div>


                    <div id="wholetable">

                            

                            <div className="method">
                                <div className="row margin-0 list-header hidden-sm hidden-xs">
                                    <div className="col-md-4"><div className="header" id="header-prepare">Interview Ref</div></div>
                                    <div className="col-md-4"><div className="header" id="header-prepare">Name</div></div>
                                    <div className="col-md-4"><div className="header" id="header-prepare">Major</div></div>
                                   
                                </div>
                            </div>


                          


                              {this.state.content.map((each) =>(  
                            <div className="method">
                                <div className="row margin-0">
                               

                                    <div className="col-md-4">
                                        <div className="cell">
                                            <div className="prepare-trackingcode">
                                            {each.interviewRef}
                                      </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="cell">
                                            <div className="prepare-Recipient">
                                                {each.firstName +" "+ each.lastName}
                                      </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="cell">
                                            <div className="prepare-address">
                                                {each.major}
                                      </div>
                                        </div>
                                    </div>
                         

                                </div>


                            </div>
                          ))}  

                        </div>


                    

 
                   

                </div>

                <div className="col-md-2" >

                </div>



            </div>

        );
    };
};


export default content;
