const d = new Date();

var app = angular.module("app", [])


app.factory('Orders', () => {
  var factory = {};
  var orders_list = [{
    customer_name: "John Doe",
    product: "ASOS Ridley High Waist",
    amount: 51,
    date: 1599377379615
  }, {
    customer_name: "John Doe",
    product: "Phillip Morris International",
    amount: 90,
    date: 1599118400615
  }, {
    customer_name: "Lorem Ipsum",
    product: "Donna Karan",
    amount: 105,
    date: 1598859234361
  }, {
    customer_name: "Leicester Costa",
    product: "Dolce Gabbana",
    amount: 30,
    date: 1598600054685
  }, {
    customer_name: "Adam Smith",
    product: "Marco Pollo",
    amount: 35,
    date: 1598340881827
  }]
  
  
  factory.getProducts = (day) => {
    var time = d.getTime() - (day * 86400000)
    var filter_orders = orders_list.filter((item) => {
      return item.date > time
    })
    return filter_orders
  }

  return factory;
});

app.factory('Product', () => {
  var factory = {};
  var product_list = [{
    name: "ASOS Ridley High Waist",
    price: 25.05
  }, {
    name: "Phillip Morris International",
    price: 85.05
  }, {
    name: "Donna Karan",
    price: 96.05
  }, {
    name: "Marco Pollo",
    price: 31.09
  }, {
    name: "Dolce Gabbana",
    price: 27.09
  }]

  return factory;
})

app.controller("HomeCtrl",($scope, Orders)=> {
  $scope.FilterRange = [{
    name: "7 days", 
    value: 7
  },{
    name: "14 days", 
    value: 14
  },{
    name: "30 days",
    value: 30
  },{
    name: "90 days", 
    value: 90
  }]
  $scope.filter_days = $scope.FilterRange[0]
  $scope.orders = Orders.getProducts($scope.filter_days.value)
  $scope.amount = $scope.orders.reduce((CurrentTotal, item)=>{
    return CurrentTotal + item.amount
  },0)
  $scope.total_order = $scope.orders.length
  $scope.average_order = $scope.amount/$scope.orders.length
  var customer = $scope.orders.map((Item)=>{
    return Item.customer_name
  })
  $scope.customer = [...new Set(customer)].length
  //on change event
  $scope.jsshsg = ()=>{
    $scope.orders = Orders.getProducts($scope.filter_days.value)
    $scope.amount = $scope.orders.reduce((CurrentTotal, item) => {
      return CurrentTotal + item.amount
    }, 0)
    $scope.total_order = $scope.orders.length
    $scope.average_order = $scope.amount/$scope.orders.length
    var customer = $scope.orders.map((Item) => {
      return Item.customer_name
    })
    $scope.customer = [...new Set(customer)].length
  
    BuildChart($scope.orders)
  }
  BuildChart($scope.orders)
});
  
Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};  

const BuildChart = (order)=>{
 
 var week = {sun: 0,mon: 0,tue: 0,wed: 0,thu: 0,fri: 0,sat: 0};
 order.map((item)=>{
   var da = new Date(item.date)
   switch(da.getDay()) {
     case 0:
       week.sun = item.amount;
       break;
     case 1:
       week.mon = item.amount;
       break;
     case 2:
       week.tue = item.amount;
       break;
     case 3:
       week.wed = item.amount;
       break;
     case 4:
       week.thu = item.amount;
       break;
     case 5:
       week.fri = item.amount;
       break;
     case 6:
       week.sat = item.amount;
       break;
   }
 })
 
 
  var ctx = document.getElementById('Sales_Chart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['Sunday', 'Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
            label: 'Current Week',
            backgroundColor: '#33D6A5',
            borderColor: '#FFFFFF',
            data: [week.sun, week.mon, week.tue, week.wed, week.thu, week.fri, week.sat]
        }]
    },

    // Configuration options go here
    options: {}
  });
  
}