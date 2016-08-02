console.log('linked');

$(function(){

  let title = "January"

  let ctx = document.getElementById("chart");
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [{
          label: `${title} Predicted Sales`,
          data: [12, 19, 3, 5],
      }]
    }
  });

  function randomNumber(){
    return Math.round(Math.random()*10);
  }

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
    
    $.getJSON('/result',data)
      .done(function(response){
        console.log(response);

        let newData = [randomNumber(),randomNumber(),randomNumber(),randomNumber()]
        
        myChart.config.data.datasets[0].data = newData;
        let month = $children.eq(0).find('option:selected').text();
        myChart.config.data.datasets[0].label = `${month} Predicted Sales`
        myChart.update()

      })
  }

  $('form').submit(graphUpdate);


})