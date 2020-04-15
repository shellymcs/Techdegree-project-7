const alertBanner = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart");
const dailyCanvas = document.getElementById("daily-chart");
const mobileCanvas = document.getElementById("mobile-user-chart");
const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

const bellDropdown = document.querySelector('.bell-icon');
const dropdownContent = document.querySelector('.dropdown-content');


bellDropdown.addEventListener('click', () => {
    dropdownContent.style.display = 'block';
})

bellDropdown.addEventListener('mouseout', () => {
    dropdownContent.style.display = 'none';
})

// create the html for the banner
alertBanner.innerHTML =
`<div class="alert-banner">
<p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks
to complete</p>
<p class="alert-banner-close">X</p>
</div>`

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none"
    }
});

//Traffic
const currentData = [
    [50, 80, 120, 100, 70, 90, 140, 100, 40, 60, 80],
    [200, 300, 400, 200, 250, 260, 240, 200, 200, 300, 350],
    [50, 80, 120, 100, 70, 90, 140, 100, 40, 60, 80],
    [200, 300, 400, 200, 250, 260, 240, 200, 200, 300, 350],
  ];

let trafficData = {
    type: 'line',
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
    "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
    data: currentData[2],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    }]
}

let trafficOptions = {
        aspectRatio: 2.5,
        animation: {
        duration: 0
        },
        scales: {
         yAxes: [{
          ticks: {
           beginAtZero:true
          }
          }]
  },
  legend : {
  display: false
     }
 };

 let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
 });     

 function addChart(chart, data) {
    chart.data.datasets.forEach(dataset => {
      dataset.data = data;
    });
    chart.update();
  }
  
  function removeChart(chart) {
    chart.data.datasets.forEach(dataset => {
      dataset.data = [];
    });
    chart.render();
  }

 const listTime = document.querySelectorAll(".traffic-nav-link");
  
        for (let i = 0; i < listTime.length; i++) {
          listTime[i].addEventListener("click", function(e) {
            const current = document.querySelector(".active");
            current.className = e.target.className.replace(" active", "");
            this.className += " active";
            removeChart(trafficChart);
            addChart(trafficChart, currentData[i]);
          });
        }

 // data for daily traffic bar chart
const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
    label: '# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1
    }]
    };
    const dailyOptions = {
    scales: {
    yAxes: [{
    ticks: {
    beginAtZero:true
    }
    }]
    },
    legend : {
    display: false
    }
    }

    let dailyChart = new Chart(dailyCanvas, {
        type: 'bar',
        data: dailyData,
        options: dailyOptions
        });   

 

  //Mobile Users      

 const mobileData = {
     labels: ["Desktop", "Tablet", "Phones"],
     datasets: [{
     label: '# of Users',
     data: [2000, 550, 500],
     borderWidth: 0,
    backgroundColor: [
         '#7477BF',
        '#78CF82',
        '#51B6C8'
         ]
      }]
 };    
 
 const mobileOptions = {
    legend: {
    position: 'right',
    labels: {
    boxWidth: 20,
    fontStyle: 'bold'
    }
    }
    };

 let mobileChart = new Chart(mobileCanvas, {
     type: 'doughnut',
    data: mobileData,
    options: mobileOptions
        });    
        
  //Message      

  send.addEventListener('click', () => {
   // ensure user and message fields are filled out
     if (user.value === "" && message.value === "") {
  alert("Please fill out user and message fields before sending");
       } else if (user.value === "" ) {
  alert("Please fill out user field before sending");
     } else if (message.value === "" ) {
  alert("Please fill out message field before sending");
     } else {
   alert(`Message successfully sent to: ${user.value}`);
     }
});

//search user
$( function() {
    var availableTags = [
      "Dan Oliver",
      "Lucy Sullivan",
      "Victoria Chambers",
      "Dale Byrd",
      "Dawn Wood"
      
    ];
    $( "#formField" ).autocomplete({
      source: availableTags
    });
  } );

  //Local storage 

  const saveButton = document.getElementById('save')
  const cancelButton = document.getElementById('cancel')
  const checkEmail = document.querySelector('.checkEmail')
  const checkPublic= document.querySelector('.checkPublic')
  const timeZone = document.getElementById('timezone')

  saveButton.addEventListener('click', () => {
    let emailChecked = checkEmail.checked;
    let publicChecked = publicEmail.checked;
    let saveTimezone = timeZone.value;
    localStorage.setItem('checkEmail', emailChecked); 
    localStorage.setItem('checkPublic', publicChecked); 
    localStorage.setItem('timezone', saveTimezone);  
})

cancelButton.addEventListener('click', () => {
    localStorage.clear();
    emailChecked.checked = false;
    publicChecked.checked = false;
    timeZone.value = timeZone.firstChild;
})

var emailSettingStorage = JSON.parse(localStorage.getItem('emailChecked'));
emailChecked.checked = emailSettingStorage;
var publicSettingStorage = JSON.parse(localStorage.getItem('publicChecked'));
publicChecked.checked = publicSettingStorage;
var timeZoneStorage = localStorage.getItem('timezone');
timeZone.value = timeZoneStorage;


