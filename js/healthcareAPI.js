//APIのデータを取得してコンソールに表示するプログラムです

var tokenValue = "d4GUCSYK79B2is6nnP8V8X1nyrSJC_Q4SM8NoDMWLwzMMtEv2Mz-dPRG1d9m_0n8TXqnefzfEPwQGP0_8coxkVklwujq1NhY";
var apiUrl1 = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/sleepingactivity/minutes"
var apiUrl2 = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/activity/days"
var apiUrl3 = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/bodycomp/days"

var sokutei = "20160902";
var end_sokutei="20160904";
$(function(){
  var sleepPosition = $.ajax({
    headers: {
      "X-AccessToken" : tokenValue
    },
    type: "GET",
    dataType: "json",
    url: apiUrl1,
    data: {date: sokutei},

    success: function(data){
      //console.log("GET Success !");//取得成功
      var results = data.results;
      //console.log(results);//データ表示
      //console.log(results.length);//データの長さ

      //姿勢とその回数の配列
      var muki = ["仰向け","うつ伏せ","横向き"];
      var posi = [0,0,0];


      //console.log(results[0].date);//日付

      //姿勢カウント
      for (var i=0;i<results.length;i++){
          //console.log(results[i].activities.length);//１時間の活動量表示
          for(var j=0;j<results[i].activities.length;j++){
            //console.log(results[i].hour+"："+results[i].activities[j].minute+"　→　"+results[i].activities[j].position); //睡眠姿勢表示
            if(results[i].activities[j].position==1||results[i].activities[j].position==6){
              posi[0]++;
            }else if(results[i].activities[j].position==2||results[i].activities[j].position==5){
              posi[1]++;
            }
            else{
              posi[2]++;
            }
          }
      }

      //姿勢カウント結果
      for(var i=0;i<muki.length;i++){
        console.log(muki[i]+" : "+posi[i]);
      }

      //姿勢傾向判定
      var keikou = muki[0];
      if(posi[1]>=posi[0]&&posi[1]>=posi[2]){
        keikou = muki[1];
      }else if(posi[2]>=posi[1]&&posi[2]>=posi[0]){
        keikou = muki[2];
      }
      console.log(keikou + "気味です");

    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
    },
  });

  var totalkcal = $.ajax({
    headers: {
      "X-AccessToken" : tokenValue
    },
    type: "GET",
    dataType: "json",
    url: apiUrl2,
    data: {startDate: sokutei, endDate: end_sokutei},

    success: function(data){
      //console.log("GET Success !");
      var results = data.results;
      console.log(results);
      //console.log(results.length);
      for (var i=0;i<results.length;i++){
          console.log(results[i].totalUsedCalories+"kcal");
      }


    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
    },
  });


  var weightBMI = $.ajax({
    headers: {
      "X-AccessToken" : tokenValue
    },
    type: "GET",
    dataType: "json",
    url: apiUrl3,
    data: {startDate: sokutei, endDate: sokutei},

    success: function(data){
      //console.log("GET Success !");//取得成功
      var results = data.results;
      //console.log(results);//データ表示
      //console.log(results.length);//データの長さ


      //console.log(results[0].measurementDate);//日付

      for (var i=0;i<results.length;i++){
          console.log("体重:"+results[i].weight+"kg, BMI:"+results[i].bmi);
      }


    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
    },


  });


});
