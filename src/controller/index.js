const Base = require('./base.js');
const consoleSymbol = {
  "yes": "\u001b[0;32;40m[✓]\u001b[0m",
  "no": "\u001b[0;31;40m[✗]\u001b[0m",
  "info": "\u001b[1;34;40m[*]\u001b[0m"
};

var InitStatus = false;
var IsUpdated = false;
var Cars = [];
var Cross = [];
var Roads = [];
var HistoryStatus = [];
var TICK=0;

module.exports = class extends Base {
  indexAction() {
    TICK=0;
    return this.display();
  }
  testAction(){
    return this.display();
  }
  /**
   * @api {post} /putData
   * @apiName putData
   * @apiVersion 0.1.0
   * @apiDescription 将每tick数据存入后台的堆中,数据存储过多（超过400tick左右）会报heap limit Allocation failed
   * @apiError DataError Can not init status.
   * @apiParam {JSON} [tick_data] {"cars":[],"roads":[],"cross":[]}
   */
  putDataAction(){
    let postdata = this.post();

    postdata["cars"]=postdata["cars"].replace(/\'/g,"\"");
    postdata["roads"]=postdata["roads"].replace(/\'/g,"\"");
    postdata["cross"]=postdata["cross"].replace(/\'/g,"\"");
    // console.log(postdata["cars"]);
    // console.log("------------------");
    // console.log(postdata["roads"]);
    // console.log("------------------");
    // console.log(postdata["cross"]);
    // console.log("------------------");
    if (InitStatus == false) {
      try{
      initStatus(postdata);
      }
      catch(e){
        console.log(consoleSymbol["no"]+"Can not init status!",e);
        return this.fail("Can not init status");
      }
    } else {
      try{
        updateStatus(postdata);
      }
      catch(e){
        console.log(consoleSymbol["no"]+"Can not update status!",e);
        return this.fail("Can not update status");
      }
    }
    IsUpdated = true;
    return this.success();
  }

  isUpdateAction(){
    return this.success({"update":TICK<=(HistoryStatus.length-1)});
  }
  /**
   * @api {get} /selectStatus
   * @apiDescription 前端获取当前TICK的信息
   * @apiVersion 0.1.0
   * @apiExample {curl} Example usage:
   *        curl -i http://localhost:9999/selectStatus
   */
  selectStatusAction() {
    console.log("Now Tick:",TICK);
    console.log("Whole History:",HistoryStatus.length);
    // 清理历史缓存防止爆栈
    if(TICK<=HistoryStatus.length-1){
      if(HistoryStatus.length>100){
        for(let i=0;i<(TICK-5)>0?(TICK-5):0;i++){
          // 减少内存占用
          HistoryStatus[i]=0;
        }
      }

      let s=HistoryStatus[TICK];
      TICK+=1;
      console.log(consoleSymbol["yes"]+"Client Updates data, now tick:",TICK);
      return this.success({
        "cars": s["Cars"],
        "roads": s["Roads"],
        "cross": s["Cross"],
        time:TICK
      });
    }else{
      console.log(consoleSymbol["no"]+"No data in tick:"+String(TICK)+". The length of history is "+String(HistoryStatus.length))
      return this.fail("No data in tick:"+String(TICK)+". The length of history is "+String(HistoryStatus.length));
    }
    if(TICK<=HistoryStatus.length-1){
      IsUpdated = true;
    }else{
      IsUpdated = false;
    }
  }
};

function updateStatus(postdata) {
  let EachLastStatus={};
  EachLastStatus["Cars"] = Cars;
  EachLastStatus["Cross"] = Cross;
  EachLastStatus["Roads"] = Roads;
  HistoryStatus.push(EachLastStatus);
  Cars = JSON.parse(postdata["cars"]);
  Cross = JSON.parse(postdata["cross"]);
  Roads = JSON.parse(postdata["roads"]);
  console.log(consoleSymbol["yes"]+"update Data, now: ",HistoryStatus.length);
  // console.log(postdata);
}

function initStatus(postdata) {
  HistoryStatus.length=0;
  Cars = JSON.parse(postdata["cars"]);
  Cross = JSON.parse(postdata["cross"]);
  Roads = JSON.parse(postdata["roads"]);
  // EachLastStatus["Cars"] = Cars;
  // EachLastStatus["Cross"] = Cross;
  // EachLastStatus["Roads"] = Roads;
  // HistoryStatus.push(EachLastStatus);
  InitStatus=true;
  TICK=0;
  console.log(consoleSymbol["yes"]+"init Data, now: ",HistoryStatus.length);
  // console.log(postdata);
}
