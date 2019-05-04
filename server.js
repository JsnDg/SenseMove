var allItem = require('./website/js/data.json');

var fs = require('fs');

/*
function readJSONdata(jsonfilename){
    var dataLoad = fs.readFileSync(jsonfilename);
    //change it to json
    var itemHave = JSON.parse(dataLoad);
    return itemHave;
}

itemHave = readJSONdata('website/js/data.json');
*/

var express = require('express');

var app = express();

var server = app.listen(process.env.PORT || 3000, listening);

function listening() {
    console.log("Listening");
}

app.use(express.static('website'));

app.get('/add/:name/:price/:timeStamp/:expireDate/:weight/:unit/:type', addNewItem);

function addNewItem(request, response){
    var data = request.params;
    var name = data.name;
    var price = Number(data.price);
    var timeStamp = data.timeStamp;
    var expireDate = data.expireDate;
    var weight = Number(data.weight);
    var unit = data.unit;
    var type = data.type;
    var reply; 
    if(!name){
        reply = {msg: "The name is required."};
        response.send(reply)
    } else 
    {
    var newItem = {
        "name": name,
        "price": price,
        "timeStamp": timeStamp,
        "expireDate": expireDate,
        "weight": weight,
        "unit": unit,
        "type": type,
    }
    var newItem4Receipt = {
        "name": name,
        "price": price,
        "timeStamp": timeStamp,
    }
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        allItem.item.push(newItem);
        allItem.item_receipt.push(newItem4Receipt);
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your new item is recorded."};
        response.send(reply)
    })
    }
}

app.get('/page_A', function(request, response){
    response.sendfile('website/home.html');
});

app.get('/page_B', function(request, response){
    response.sendfile('website/home_test.html');
});

app.get('/add_receipt/:name/:price/:timeStamp', addNewItem2Receipt);

function addNewItem2Receipt(request, response){
    var data = request.params;
    var name = data.name;
    var price = Number(data.price);
    var timeStamp = data.timeStamp;
    var reply; 
    if(!name){
        reply = {msg: "The name is required."};
        response.send(reply)
    } else 
    {
    var newItem4Receipt = {
        "name": name,
        "price": price,
        "timeStamp": timeStamp,
    }
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem_receipt = data.toString();
        console.log('Done');
        allItem_receipt = JSON.parse(allItem_receipt);
        allItem_receipt.item_receipt.push(newItem4Receipt);
        var newData_receipt = JSON.stringify(allItem_receipt, null, 2);
        fs.writeFile('website/js/data.json', newData_receipt, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your new item is recorded."};
        response.send(reply)
    })
    }
}

app.get('/del/:delID', delItem);

function delItem(request, response){
    var data = request.params;
    var delID= data.delID;
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        allItem.item.splice(delID,1);
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your item is used."};
        response.send(reply);
    })
}

app.get('/delWaste/:delID', delWaste);

function delWaste(request, response){
    var data = request.params;
    var delID= data.delID;
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        allItem.waste.splice(delID,1);
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Your item is used.');
        };
        reply = {msg: "Your item is used."};
        response.send(reply);
    })
}

app.get('/checkExpire', checkExpire);

function checkExpire(request, response){
    var today = new Date();
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        for(var i=0;i<allItem.item.length;i++){
            if (today.getFullYear()>Number(allItem.item[i].expireDate.slice(0, 4)) 
            || (today.getFullYear()==Number(allItem.item[i].expireDate.slice(0, 4)) && (today.getMonth()+1)>Number(allItem.item[i].expireDate.slice(5, 7)))
            || (today.getFullYear()==Number(allItem.item[i].expireDate.slice(0, 4)) && (today.getMonth()+1)==Number(allItem.item[i].expireDate.slice(5, 7)) && today.getDate()>Number(allItem.item[i].expireDate.slice(8, 10))))
            {
                allItem.item[i].wastePer = 100;
                allItem.waste.push(allItem.item[i]);
                allItem.item.splice(i,1);
            }
          }
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your item is used."};
        response.send(reply);
    })
}

app.get('/changeWastePercent/:selID/:percentage', changeWastePercent);

function changeWastePercent(request, response){
    var data = request.params;
    var selID= data.selID;
    var percentage = data.percentage;
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        allItem.waste[selID].wastePer = percentage;
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your item is used."};
        response.send(reply);
    })
}

app.get('/addwaste/:name/:price/:timeStamp/:expireDate/:weight/:unit/:type/:wastePer', addWasteItem);

function addWasteItem(request, response){
    var data = request.params;
    var name = data.name;
    var price = Number(data.price);
    var timeStamp = data.timeStamp;
    var expireDate = data.expireDate;
    var weight = Number(data.weight);
    var unit = data.unit;
    var type = data.type;
    var wastePer = data.wastePer;
    var reply; 
    if(!name){
        reply = {msg: "The name is required."};
        response.send(reply)
    } else 
    {
    var newItem = {
        "name": name,
        "price": price,
        "timeStamp": timeStamp,
        "expireDate": expireDate,
        "weight": weight,
        "unit": unit,
        "type": type,
        "wastePer": wastePer,
    }
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        allItem.waste.push(newItem);
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your new item is recorded."};
        response.send(reply)
    })
    }
}

app.get('/changeBudget/:fromDate/:toDate/:budgetAmount', changeBudget);

function changeBudget(request, response){
    var data = request.params;
    var fromDate = data.fromDate;
    var toDate = data.toDate;
    var budgetAmount = Number(data.budgetAmount);
    var reply;
    if(!budgetAmount){
        reply = {msg: "The budget is required."};
        response.send(reply)
    } else 
    {
    var revisedBudget = {
        "fromDate": fromDate,
        "toDate": toDate,
        "budgetAmount": budgetAmount,
    }
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        allItem.budget[0] = revisedBudget;
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your new budget is recorded."};
        response.send(reply)
    })
    }
}

app.get('/delShopList/:delName', delShopList);

function delShopList(request, response){
    
    var data = request.params;
    var delName= data.delName;
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        for (var i=0;i<allItem.shop_list.length;i++){
            if (allItem.shop_list[i].name === delName){
                allItem.shop_list.splice(i,1);
            }
        }
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Is updated.');
        };
        reply = {msg: "Your shop list is updated."};
        response.send(reply);
    })
}

app.get('/add2ShopList/:name', add2ShopList);

function add2ShopList(request, response){
    var data = request.params;
    var name = data.name;
    var reply; 
    if(!name){
        reply = {msg: "The name is required."};
        response.send(reply)
    } else 
    {
    var newItem = {
        "name": name,
    }
    fs.readFile('website/js/data.json',function(err, data){
        if(err){
            return console.error(err);
        }
        var allItem = data.toString();
        allItem = JSON.parse(allItem);
        allItem.shop_list.push(newItem);
        var newData = JSON.stringify(allItem, null, 2);
        fs.writeFile('website/js/data.json', newData, finished);
        function finished(err){
            console.log('Done');
        };
        reply = {msg: "Your new item is recorded."};
        response.send(reply)
    })
    }
}