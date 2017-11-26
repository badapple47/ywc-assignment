import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios'
import './home.css';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
        defaultZoom={14}
        defaultCenter={{ lat: 13.727505, lng: 100.532688 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 13.727505, lng: 100.532688 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
    )




const data = [
    { name: 'Content', ผู้มีสิทธิ์เข้าสัมภาษณ์: 56, จำนวนคนสมัคร: 227, amt: 2400 },
    { name: 'Design', ผู้มีสิทธิ์เข้าสัมภาษณ์: 51, จำนวนคนสมัคร: 219, amt: 2210 },
    { name: 'Marketing', ผู้มีสิทธิ์เข้าสัมภาษณ์: 50, จำนวนคนสมัคร: 308, amt: 2290 },
    { name: 'Programming', ผู้มีสิทธิ์เข้าสัมภาษณ์: 63, จำนวนคนสมัคร: 357, amt: 2000 },

];

class Home extends React.PureComponent {
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
            findName: {},
            isMarkerShown: false,
            major: 1


        }
        this.sendgetRequest = this.sendgetRequest.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.checkSearch = this.checkSearch.bind(this)
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









    }

    checkSearch() {


        if (this.state.findName.fullName == null) {
            alert("โปรดใส่ชื่อ เว้นวรรค และตามด้วยนามสกุล")
            return 0
        }


        var str = this.state.findName.fullName
        var stringArray = str.split(/(\s+)/).filter(function (e) { return e.trim().length > 0; });


        this.state.findName.name = stringArray[0]
        this.state.findName.sirName = stringArray[1]


        if (this.state.findName.sirName == null && this.state.findName.name != null) {
            console.log(this.state.findName.name)
            alert("โปรดเว้นวรรค แล้วตามด้วยนามสกุล")
            return 0
        }






        for (var i = 0; i < this.state.data.length; i++) {


            if (this.state.data[i].firstName == this.state.findName.name && this.state.data[i].lastName == this.state.findName.sirName) {




                alert("ขอแสดงความยินดี คุณมีสิทธิ์เข้าสัมภาษณ์ในสาย" + " " + this.state.data[i].major + " รหัส" + " " + this.state.data[i].interviewRef);
                return 0

            }


        }
        alert("ขอแสดงความเสียใจ ท่านไม่มีสิทธิ์เข้าร่วมสัมภาษณ์");

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

                        <img id="imgywc" src={ywc} />

                        <h1>   SEMI_FINAL ROUND
  </h1>

                        <h3>ประกาศผู้มีสิทธิ์เข้าสัมภาษณ์ </h3>

                        <br />

                        <div className="panel panel-default" id="fact-panel">
                            <div className="panel-body">

                                <h5>การสัมภาษณ์จะจัดขึ้นในวันที่ 26 พฤศจิกายน 2560 ณ อาคาร ซี.พี.ทาวเวอร์ 1 (สีลม) </h5>
                                <h5>ซึ่งจะแบ่งออกเป็น 2 รอบ คือ รอบช่วงเช้าตั้งแต่เวลา 9.00 น. ถึง 12.00 น. และ รอบช่วงบ่ายตั้งแต่เวลา 13.00 น. ถึง 18.00 น.</h5>

                            </div>
                        </div>




                    </div>
                </center>



                <div className="col-md-2" >

                </div>


                <div className="col-md-8" id="whole-center-column" >

                    <div className="form-group" >
                        <center>
                            <input type="text" className="form-control" id="seachName-Field" placeholder="ชื่อ นามสกุล" value={this.state.findName.searchName} name="fullName" onChange={this.handleChange} />
                        </center>
                    </div>

                    <center>
                        <button type="submit" className="btn btn-primary" id="name-search-button" onClick={this.checkSearch} >ตรวจสอบสิทธิ์สัมภาษณ์</button>
                    </center>

                    <div id="Body-Major">
                        <center><h3> ผลแยกตามสาขา </h3></center>
                        <div className="row" id="Body-logistic-logo">

                            <div className="col-md-3">

                                <a target="_blank" href="/content" className="thumbnail">
                                    <img id="img-circle" src={LogoDHL} />
                                    <center><p>Content</p></center>

                                </a>
                            </div>

                            <div className="col-md-3">
                                <a target="_blank" href="/design" className="thumbnail">
                                    <img id="img-circle" src={LogoFedEx} />
                                    <center><p>Design</p></center>
                                </a>
                            </div>

                            <div className="col-md-3">
                                <a target="_blank" href="/marketing" className="thumbnail">
                                    <img id="img-circle" src={LogoKerry} />
                                    <center><p>Marketing</p></center>
                                </a>
                            </div>

                            <div className="col-md-3">
                                <a target="_blank" href="/programming" className="thumbnail">
                                    <img id="img-circle" src={LogoSendIt} />
                                    <center><p>Programming</p></center>
                                </a>
                            </div>

                            <div className="field">






                            </div>
                        </div>
                    </div>





                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h1 className="panel-title">สิ่งที่ต้องเตรียมมาในวันสัมภาษณ์</h1>
                        </div>
                        <div className="panel-body">
                            1. <big id="bigTag">บัตรประชาชน</big> สำหรับการแลกบัตรเข้าอาคาร ซี.พี.ทาวเวอร์ 1 (สีลม) และ <big id="bigTag">บัตรนักศึกษา</big>สำหรับการลงทะเบียนสัมภาษณ์ กรุณาแต่งกายด้วยชุดนักศึกษา<br />
                            2. <big id="bigTag">การบ้านและสิ่งที่กรรมการสาขากำหนดไว้ </big> กรุณาอ่านรายละเอียดการบ้านและสิ่งที่กรรมการให้เตรียมมาให้ครบถ้วน หากสาขาใดต้องใช้โน้ตบุ๊ค ควรชาร์ตแบตเตอรี่และเตรียมอินเทอร์เน็ตส่วนตัวมาให้พร้อม เนื่องจากสถานที่ไม่มีบริการอินเทอร์เน็ตให้ใช้<br />
                            3. <big id="bigTag">Portfolio </big> สามารถนำมาประกอบการสัมภาษณ์ได้ สำหรับน้อง ๆ สาขาดีไซน์จะต้องนำ Portfolio มาด้วยทุกคน

</div>
                    </div>

                    <div className="page-header">
                        <h1>การเดินทางมาสัมภาษณ์ <small>อาคาร ซี.พี.ทาวเวอร์ 1 (สีลม)</small></h1>


                    </div>


                    <div className="col-md-8" >
                        <MyMapComponent
                            isMarkerShown={this.state.isMarkerShown}
                            onMarkerClick={this.handleMarkerClick}
                        />

                    </div>

                    <div className="col-md-4" >
                        <p> 1. <big id="bigTag"> ด้วยรถไฟฟ้า BTS </big>สามารถลงสถานีศาลาแดง ณ ทางออกที่ 2 <br /><br />
                            2. <big id="bigTag"> ด้วยรถไฟฟ้า MRT BTS </big> สามารถลงสถานีสีลม ณ ทางออกที่ 2 โดยเดินเรียบทางเท้าไปตามถนนสีลม<br /><br />
                            3. <big id="bigTag"> ด้วยรถประจำทาง BTS </big> สามารถขึ้นใช้บริการสาย 15, 77, 155, 504, 177, 76 </p><br /><br />

                        <div className="alert alert-warning" role="alert">
                            <p>หมายเหตุ: สำหรับน้อง ๆ ที่ไม่สะดวกเดินทางมาสัมภาษณ์ที่อาคาร CP Tower สีลม ให้ Inbox มาทางเพจเฟสบุ๊ค Young Webmaster Camp ภายในวันที่ 20 พฤศจิกายน 2560</p>
                        </div>

                        <br />
                        <br />
                        <br />
                        <br />




                    </div>


                    <div className="page-header" id="timeline">
                        <h1>Timeline </h1>
                    </div>

                    {/* start timeline */}

                    <div className="row bs-wizard" >


                        <div className="col-xs-3 bs-wizard-step complete">
                            <div className="text-center bs-wizard-stepnum">ประกาศผล</div>
                            <div className="progress"><div className="progress-bar"></div></div>
                            <a href="#" className="bs-wizard-dot"></a>
                            <div className="bs-wizard-info text-center">17 พฤศจิกายน</div>
                        </div>


                        <div className="col-xs-3 bs-wizard-step active">
                            <div className="text-center bs-wizard-stepnum">สัมภาษณ์</div>
                            <div className="progress"><div className="progress-bar"></div></div>
                            <a href="#" className="bs-wizard-dot"></a>
                            <div className="bs-wizard-info text-center">26 พฤศจิกายน</div>
                        </div>

                        <div className="col-xs-3 bs-wizard-step disabled">
                            <div className="text-center bs-wizard-stepnum">ประกาศผลสัมภาษณ์</div>
                            <div className="progress"><div className="progress-bar"></div></div>
                            <a href="#" className="bs-wizard-dot"></a>
                            <div className="bs-wizard-info text-center"> 3 ธันวาคม</div>
                        </div>

                        <div className="col-xs-3 bs-wizard-step disabled">
                            <div className="text-center bs-wizard-stepnum">วันค่าย</div>
                            <div className="progress"><div className="progress-bar"></div></div>
                            <a href="#" className="bs-wizard-dot"></a>
                            <div className="bs-wizard-info text-center"> 4 - 7 มกราคม </div>
                        </div>




                    </div>


                    {/* end timeline */}

                    <div className="col-md-6" id="chart">

                        <center>
                            <BarChart width={470} height={300} data={data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="จำนวนคนสมัคร" fill="#8884d8" minPointSize={5} />
                                <Bar dataKey="ผู้มีสิทธิ์เข้าสัมภาษณ์" fill="#82ca9d" minPointSize={10} />
                            </BarChart>
                        </center>

                    </div>

                    <div className="col-md-6" id="tellno">


                        <center>

                            <div className="alert alert-info" role="alert">
                                <h3>
                                    สอบถามเพิ่มเติมติดต่อ</h3><br />
                                <p>
                                    พี่เบ๊บ: 064-174-7080<br />
                                    <br />
                                    พี่ฟง: 092-458-7067<br /><br />
                                    พี่เบนซ์: 085-666-7571<br /><br />
                                </p>
                            </div>
                        </center>
                    </div>









                </div>

                <div className="col-md-2" >

                </div>











            </div>

        );
    };
};


export default Home;
