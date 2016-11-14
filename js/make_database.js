var tokenValue = "d4GUCSYK79B2is6nnP8V8X1nyrSJC_Q4SM8NoDMWLwzMMtEv2Mz-dPRG1d9m_0n8TXqnefzfEPwQGP0_8coxkVklwujq1NhY";
var apiUrl1 = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/sleepingactivity/minutes"
var apiUrl2 = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/activity/days"
var apiUrl3 = "https://gnvduf9ntg.execute-api.ap-northeast-1.amazonaws.com/intern/bodycomp/days"
var sokutei_start = "20160831";
var sokutei_end="20160906";
var date_list=["20160831","20160901","20160902","20160903","20160904","20160905","20160906"]

var apiUrl_put = "https://0g1fzm1lsd.execute-api.us-east-1.amazonaws.com/dev/putitem"
var apiUrl_get = "https://0g1fzm1lsd.execute-api.us-east-1.amazonaws.com/dev/getitem"
var apiUrl_scan = "https://0g1fzm1lsd.execute-api.us-east-1.amazonaws.com/dev/scanitems/mti-devintern2016-3c-term_3C"

$(function(){
  //ヘルスケアAPIから取得する処理たち
  //カロリー取得
  var totalkcal = $.ajax({
    headers: {
      "X-AccessToken" : tokenValue
    },
    type: "GET",
    dataType: "json",
    url: apiUrl2,
    data: {startDate: sokutei_start, endDate: sokutei_end},

    success: function(data){
      var results = data.results;
      for (var i=0;i<results.length;i++){
          put_totalkcal(results,i);//データベースへ入れる関数
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
    },
  });
  //ＢＭＩと体重取得
  var weightBMI = $.ajax({
    headers: {
      "X-AccessToken" : tokenValue
    },
    type: "GET",
    dataType: "json",
    url: apiUrl3,
    data: {startDate: sokutei_start, endDate: sokutei_end},

    success: function(data){
      var results = data.results;
      for (var i=0;i<results.length;i++){
          // console.log("体重:"+results[i].weight+"kg, BMI:"+results[i].bmi);
          put_BMIandWight(results,i);//データベースへ入れる関数
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
    },
  });



});

//ヘルスケアＡＰＩから取得したデータをデータベースに保存する関数たち
function put_totalkcal(results,i){
  var put_totalkcal= $.ajax({
    type: "POST",
    dataType: "json",
    url: apiUrl_put,
    data: JSON.stringify({
    "tablename":"mti-devintern2016-3c-term_3C",
        "item":{
            "user_id":tokenValue,
            "date":results[i].measurementDate,
            "calorie":results[i].totalUsedCalories
        }
      })
  });
}
function put_BMIandWight(results,i){
  var put_totalkcal= $.ajax({
    type: "POST",
    dataType: "json",
    url: apiUrl_put,
    data: JSON.stringify({
    "tablename":"mti-devintern2016-3c-term_3C",
        "item":{
            "user_id":tokenValue,
            "date":results[i].measurementDate,
            "BMI":results[i].bmi,
            "weight":results[i].weight
        }
      })
  });
}

function put_ibiki_rank(tonight){
  var put_ibiki_rank= $.ajax({
    type: "POST",
    dataType: "json",
    url: apiUrl_put,
    data: JSON.stringify({
    "tablename":"mti-devintern2016-3c-term_3C",
        "item":{
            "user_id":tokenValue,
            "date":tonight,
            "ibiki_rank":4,
        }
      })
  });
}

//関数実行
for(var i=0;i++;i<date_list.length){
  tonight=date_list[i];
  put_ibiki_rank(tonight);
}


//データベースに入っている値を取り出す関数
$(function(){
  var get_totalkcal = $.ajax({
    type: "GET",
    dataType: "json",
    url: apiUrl_scan,
    tablename:"mti-devintern2016-3c-term_3C",

    success: function(response){
      var results = response;
      for (var i=0;i<results.length;i++){
          console.log(results[i].calorie+"kcal");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR + '-' + textStatus + '-' + errorThrown);
    },
  });
});
