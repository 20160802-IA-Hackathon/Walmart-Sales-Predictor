console.log('linked');

$(function(){

  let title = "January"

  let ctx = document.getElementById("chart");
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [{
          label: `Choose Data!`,
          data: [1, 1, 1, 1],
      }]
    }
  });

  function graphUpdate(e){
    e.preventDefault();
    let $children = $(e.target).children();
    let data = {
      month:    $children.eq(0).val(),
      size:     $children.eq(1).val(),
      temp:     $children.eq(2).val(),
      fuel:     $children.eq(3).val(),
      cpi:      $children.eq(4).val(),
      unemp:    $children.eq(5).val(),
      holiday:  $children.eq(6).val()
    }

    if (!data.size){
      data.size = 10000
    }
    if (!data.temp){
      data.temp = 60
    }
    if (!data.fuel){
      data.fuel = 2.8
    }
    if (!data.cpi){
      data.cpi = 220
    }
    if (!data.unemp){
      data.unemp = 8
    }
    
    $.getJSON('/result',data)
      .done(function(response){
        console.log(response);
        
        myChart.config.data.datasets[0].data = response["weekly_results"];
        let month = $children.eq(0).find('option:selected').text();
        myChart.config.data.datasets[0].label = `${month} Predicted Sales`
        myChart.update()

      })
  }

  $('form').submit(graphUpdate);


})