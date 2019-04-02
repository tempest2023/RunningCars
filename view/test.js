var Class_Head = React.createClass({
  render: function() {
    return <thead >
      <
      tr >
      <
      th > 课程名称 < /th> <
    th > 课程学分 < /th> <
    th > 所属专业 < /th> <
    th style = {



      {

        'width': '200px'
      }

    } > 上课地点 < /th> <
    th > 课程热度 < /th> <
    th > 是否选择 < /th> < /
    tr > <
      /thead>; } }); var Class_TR = React.createClass({ getInitialState: function() { return {check: false}; }, handleClick: function(event) { this.setState({check: !this.state.check}); var sid="_"+this.props.idi Json_Class[sid]["check"]=!this.state.check; PubSub.publish('Choose_Class',
    'YouNeedToUpdate');
}, render: function() {
  if (JSON.stringify(Json_Class) != "{}") {
    if (Json_Class["_" + this.props.idi]["check"]) {
      this.state.check = true;
    } else {
      this.state.check = false
    };
  }
  var rows = [];
  var rows_class_name = [];
  var classname = "",
    classname_last = "";
  if (!this.state.check) rows.push( <
    button key = {
      this.props.idi + "++"
    }
    className = "circular ui icon inverted green button"
    id = {
      this.props.idi + "++"
    }
    onClick = {
      this.handleClick
    } > < i className = "icon add" > < /i></button > );
  else rows.push( <
    button key = {
      this.props.idi + "--"
    }
    className = "circular ui icon inverted red button"
    id = {
      this.props.idi + "--"
    }
    onClick = {
      this.handleClick
    } > < i className = "icon remove" > < /i></button > ) if (this.props.class_name.length > 15) {
    classname = this.props.class_name;
    classname_last = classname.substring(10, classname.length);
    classname = classname.substring(0, 10) + "...";
    rows_class_name.push( <
      td key = {
        "short" + this.props.idi
      }
      data - tooltip = {
        this.props.class_name
      }
      data - position = "right center" >
      <
      h5 > {
        classname
      } < /h5></td > )
  } else {
    rows_class_name.push( <
      td key = {
        "all" + this.props.idi
      } >
      <
      h5 > {
        this.props.class_name
      } < /h5></td > )
  } return <tr > {
      rows_class_name
    } <
    td > {
      this.props.point
    } < /td> <
  td > {
    this.props.major
  } < /td> <
  td > {
    this.props.loc
  } < /td> <
  td >
    <
    div className = "ui red button" > < i className = "heart icon" > < /i>喜欢</div >
    <
    span className = "ui inverted red left pointing label" > {
      this.props.like
    } < /span> < /
  td > <
    td className = "center aligned" > {
      rows
    } <
    /td> < /
  tr > ;
}
});
var Class_All_TR = React.createClass({
      getInitialState: function() {
        return {
          page: 1
        };
      },
      componentDidMount: function() {
        this.pubsub_token = PubSub.subscribe('Change_Page', function(topic, page_num) {
          this.setState({
            page: page_num
          });
        }.bind(this));
      },
      componentWillUnmount: function() {
        PubSub.unsubscribe(this.pubsub_token);
      },
      render: function() {
          var sid = "";
          var rows = []
          var td_num = (this.state.page - 1) * 8;
          for (var i = td_num; i <
            ((td_num + 8) > Num_Class ? Num_Class : (td_num + 8)); i++) {
            sid = "_" + i;
            rows.push( <
                Class_TR key = {
                  "TR__" + i
                }
                class_name = {
                  this.props.item[sid]["class_name"]
                }
                point = {
                  this.props.item[sid]["point"]
                }
                major = {
                  this.props.item[sid]["major"]
                }
                loc = {
                  this.props.item[sid]["loc"]
                }
                like = {
                  this.props.item[sid]["like"]
                }
                check = {
                  this.props.item[sid][
                    "check"
                  ]
                }
                idi = {
                  i
                }
                />); } return <
                tbody > {
                  rows
                } < /tbody>; } }); var Class_Foot = React.createClass({ getInitialState: function() { return {thispage: 1,lastpage:1,active:'active item',unactive:'item',allPage:Page_Class}; }, skipPage: function(event){ var page_num=parseInt(event.target.text);
                var last_pagenum = this.state.thispage; this.setState({
                  lastpage: last_pagenum,
                  thispage: page_num,
                }); PubSub.publish('Change_Page', page_num);
              }, ToFirst: function(event) {
                var page_num = 1;
                var last_pagenum = this.state.thispage;
                this.setState({
                  lastpage: last_pagenum,
                  thispage: page_num,
                });
                PubSub.publish('Change_Page', page_num);
              }, ToLast: function(event) {
                var page_num = Page_Class;
                var last_pagenum = this.state.thispage;
                this.setState({
                  lastpage: last_pagenum,
                  thispage: page_num,
                });
                PubSub.publish('Change_Page',
                  page_num);
              }, render: function() {
                var rows = [];
                if (Page_Class > 7) {
                  var ac = this.state.active;
                  var unac = this.state.unactive;
                  var tp = this.state.thispage;
                  var pc = Page_Class;
                  var bool1 = (tp <
                      4),
                    bool2 = (tp <= (pc - 3));
                  var _tmp1 = bool1 ? 1 : (bool2 ? -3 : pc - 6),
                    _tmp2 = bool1 ? 7 : (bool2 ? 3 : pc);
                  for (var j = _tmp1; j <= _tmp2; j++) {
                    rows.push( < a key = {
                        "1_" + j
                      }
                      onClick = {
                        this.skipPage
                      }
                      className = {
                        bool1 ? ((j == tp) ? ac : unac) : (bool2 ? ((j == 0) ? ac : unac) : ((tp == j) ? ac : unac))
                      } > {
                        bool1 ? j : (bool2 ? (tp + j) : j)
                      } < /a>) } }else{ for(var j=1;j <=
                      Page_Class; j++) {
                      rows.push( < a key = {
                          "2_" + j
                        }
                        onClick = {
                          this.skipPage
                        }
                        className = {
                          (j == this.state.thispage) ? this.state.active : this.state.unactive
                        } > {
                          j
                        } < /a>); } } return <
                        tfoot >
                        <
                        tr >
                        <
                        th colSpan = '6' >
                        <
                        div className = "ui right floated pagination menu" > < a onClick = {
                          this.ToFirst
                        }
                        data - tooltip = '前往首页'
                        data - position = 'bottom center'
                        className = "icon item" > < i className = "arrow left icon" > < /i></a > {
                          rows
                        } < a onClick = {
                          this.ToLast
                        }
                        data - tooltip = '末页'
                        className = "icon item" > < i className = "arrow right icon" > < /i></a > < /div> < /
                        th > <
                        /tr> < /
                        tfoot > ;
                      }
                    });
                  var Check_Class = React.createClass({
                      render: function() {
                        return <
                          div className = "item" >
                          <
                          i className = "large bookmark middle aligned icon" > < /i> <
                        div className = "content" >
                          <
                          span className = "header" > {
                            this.props.class_name
                          } < /span> <
                        div className = "description" > {
                          "学分:" + this.props.point
                        } < /div> < /
                        div > <
                          /div>; } }); var Check_Class_List=React.createClass({ getInitialState: function() { return { update: 'allright',draw:'true' }; },componentDidMount: function () { this.pubsub_token = PubSub.subscribe('Choose_Class', function (topic, msg) { this.setState({
                        update: msg
                      });
                  }.bind(this));
                this.pubsub_token2 = PubSub.subscribe('Draw_Class', function(topic, msg) {
                  this.setState({
                    draw: msg
                  });
                }.bind(this));
              }, componentWillUnmount: function() {
                PubSub.unsubscribe(this.pubsub_token);
                PubSub.unsubscribe(this.pubsub_token2);
              }, render: function() {
                var sid = "";
                var rows = []
                var flag = true;
                if ((JSON.stringify(Json_Class)) != "{}") {
                  for (var i = 0; i <
                    Num_Class; i++) {
                    sid = "_" + i;
                    if (Json_Class[sid]["check"]) {
                      flag = false;
                    }
                  }
                }
                if (!flag) {
                  for (var i = 0; i < Num_Class; i++) {
                    sid = "_" + i;
                    if (Json_Class[sid]["check"]) {
                      /*if(Json_Class[sid][ "class_name"].indexOf( "@")){console.log(Json_Class[sid][
                             "class_name"]);}*/
                      rows.push( < Check_Class key = {
                          "CK__" + i
                        }
                        class_name = {
                          Json_Class[sid]["class_name"]
                        }
                        point = {
                          Json_Class[sid]["point"]
                        }
                        idi = {
                          i
                        }
                        />); } } } else{ rows.push( <
                        div key = "static"
                        className = "ui segment" >
                        <
                        div className = "ui active dimmer" >
                        <
                        div className = "ui text loader" > 等待添加 < /div> < /
                        div > < br / > < br / > < br / > < /div>); } return <
                        div className = "ui segment" >
                        <
                        div className = "ui relaxed divided list" > {
                          rows
                        } < /div> < /
                        div > ;
                      }
                    });
                  var Draw_Button = React.createClass({
                        onClick: function(event) {
                          PubSub.publish('Draw_Class', 'false');
                        },
                        render: function() {
                          var styleobj = {
                            'display': 'none'
                          };
                          return <button id = "Draw_Table_Again"
                          className = 'ui hidden button'
                          style = {
                            styleobj
                          }
                          onClick = {
                              this.onClick
                            } > < /button> } }); var Class_Table=React.createClass({ getInitialState: function() { return { draw: 'true', search_result:'', search_state:'none' }; }, ChangeLiColor:function(event,id){ }, search:function(event){ / /
                            var keyEvent = event ||
                              window.event; //var keyCode=keyEvent.keyCode; // 数字键：48-57 // 字母键：65-90 // 删除键：8 // 后删除键：46 // 退格键：32 // enter键：13 //if((keyCode>=48&&keyCode
                          <=
                          57) || (keyCode >= 65 && keyCode <=
                          90) || keyCode == 8 || keyCode == 13 || keyCode == 32 || keyCode == 46) {
                        var searchText = event.target.value;
                        var results = [];
                        var showresults = [];
                        if (searchText == "") {
                          this.setState({
                            search_result: '',
                            search_state: 'none'
                          });
                        }
                        if (searchText.charCodeAt(0) >
                          255) {
                          if ((JSON.stringify(Json_Class)) != "{}") {
                            for (var i = 0; i <
                              get_JsonNum(Json_Class); i++) {
                              var sid = "_" + i;
                              if (Json_Class[sid] != undefined) {
                                if (Json_Class[sid]["class_name"].indexOf(searchText) >= 0) {
                                  showresults.push(sid) results.push(Json_Class[sid]['class_name']);
                                }
                              }
                            }
                          }
                          if (results.length > 0) {
                            var s_results = " <
                            ui > "; for (var i = 0; i <
                            results.length;
                            i++) {
                            if (results[i].length > 15) {
                              var short_class_name = results[i].substring(0, 15) + "...";
                              s_results += " <
                              li class = 'search_nav'
                              id = 'li"+i+"' > < a onClick = \"search_view(\'" + showresults[i] + "\')\">" + short_class_name + "</a></li>";
                            } else {
                              s_results += " <
                              li class = 'search_nav'
                              id = 'li"+i+"' > < a onClick = \"search_view(\'" + showresults[i] + "\')\">" + results[i] + "</a></li>";
                            }
                          }
                          s_results += " < /
                          ui > "; this.setState({ search_result:s_results, search_state:'block' }); $("#
                          search_result ").append(s_results); }else{ this.setState({ search_result:'', search_state:'none' }) } } }, componentDidMount: function () { this.pubsub_token = PubSub.subscribe('Draw_Class', function(topic, msg) {
                          this.setState({
                            draw: msg
                          });
                        }.bind(this));
                    },
                    componentWillUnmount: function() {
                      PubSub.unsubscribe(this.pubsub_token);
                    }, render: function() {
                      var rows = [];
                      if ((JSON.stringify(Json_Class)) == "{}") {
                        rows.push( <
                          div key = "No_Class"
                          className = "ui segment" >
                          <
                          div className = "ui active dimmer" >
                          <
                          div className = "ui text loader" > 加载课表中 < /div> < /
                          div > < br / > < br / > < br / > < br / > < /div>); }else{ rows.push( <
                          table key = "Have_Class"
                          style = {
                            {
                              'tableLayout': 'fixed',
                              'width': '1126px',
                              'maxWidth': '1126px',
                              'backgroundColor': 'rgb(249,250,251)'
                            }
                          }
                          className = 'ui compact orange table' >
                          <
                          Class_Head / >
                          <
                          Class_All_TR item = {
                            Json_Class
                          }
                          /> <
                          Class_Foot / >
                          <
                          /table>); } return <
                          div className = "ui segment"
                          style = {
                            {
                              'padding': 0,
                              'border': 0
                            }
                          } >
                          <
                          div style = {
                            {
                              'zIndex': 10,
                              'right': '10px',
                              'top': '3px',
                              'border': '1px solid white',
                              'backgroundColor': 'white',
                              'position': 'absolute'
                            }
                          } >
                          <
                          div className = "ui search" >
                          <
                          div className = "ui icon input" >
                          <
                          input id = "class_search"
                          className = "prompt"
                          type = "text"
                          onChange = {
                            this.search
                          }
                          placeholder = "您想要搜索什么课程..." / >
                          <
                          i className = "search icon" > < /i> < /
                          div > <
                          div id = "search_result"
                          style = {
                            {
                              'display': this.state.search_state,
                              'paddingLeft': '1%',
                              'paddingRight': '1%',
                              'width': '100%',
                              'maxHeight': '300px',
                              'overflowY': 'scroll'
                            }
                          }
                          className = "results"
                          dangerouslySetInnerHTML = {
                            {
                              __html: this.state.search_result
                            }
                          } > < /div>


                          < /
                          div > <
                          /div>{rows}</div > ;
                        }
                      });
                  ReactDOM.render(

                    <
                    div className = 'ui container'
                    style = {
                      {
                        'maxWidth': '800px'
                      }
                    } >
                    <
                    Draw_Button / >
                    <
                    Class_Table / >
                    <
                    br / >
                    <
                    div className = "ui pointing below label" > 已选择课程列表 < /div> <
                    Check_Class_List item = {
                      Json_Class
                    }
                    /> < /
                    div > , document.getElementById('class_container'));
