const increment = (x,y,p,z) => {

    var item = {
        'name' : x,
        'quantity':y,
        'price':p,
        'id':z
    }
    var items = [];

    if(localStorage.getItem("items") == null){
      items.push(item);
      localStorage.setItem("items",JSON.stringify(items))
    } else {
      var all = JSON.parse(localStorage.getItem("items"));
      all.push(item);
      localStorage.setItem("items",JSON.stringify(all))
    }


    if(localStorage.getItem("count") == null){
      localStorage.setItem("count",1);
    } else {
      var x = localStorage.getItem("count");
      x++;
      localStorage.setItem("count",x);
    }


    return {
        type : 'INCREMENT'
    }
};

export default increment; 