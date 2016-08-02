console.log('linked');

$(function(){

  let title = "June"

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
      data1: $children.eq(0).val(),
      data2: $children.eq(1).val(),
      data3: $children.eq(2).val(),
    }
    
    let newData = [randomNumber(),randomNumber(),randomNumber(),randomNumber()]
    
    myChart.config.data.datasets[0].data = newData;
    myChart.update()
    // $.getJSON('/result',data)
    //   .done(function(response){
    //     console.log(response);
    //   })
  }

  $('form').submit(graphUpdate);


})