/*method to open and close connections to APIs - creates a new instance of the XML object
Ready state of 4 means that a operation has been completed, 0 would the method has not been called, readystate has values from 0-4. A ready state of 1 means open() has been called,
2 means send() method has been called and 3 means downloading*/
/*setTimeout(function(){console.log(data);}, 500); prevents the console.log(data) command from being executed for 500ms to allow the readystate to reach 4 and for the setData function to implement before
                                                    logging the data to the console. This is a method of accessing the data outside of the onereadystatechange functon.*/

/*Callback Functions - everything is made of objects, a function is also an object and can be passed as a argument to another function. A callback is a function passed as a parameter to another function
and executed inside that function.*/ 
const baseURL = "https://ci-swapi.herokuapp.com/api/"
function getData(type, cb){
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseURL + type + "/"); /* 1st argument: GET retreives data from the server, alternately could use POST to send data to the server
                                                           2nd arguement is the URL we want to retreive data from/post too*/
    xhr.send();/*Sends the request*/
    /*this.status represents http status code, 200 is request succeeded. Another example of a status code is 301,401, 404 and numerous other error codes*/
    xhr.onreadystatechange = function(){ /* onreadystatechange calls te function when the readystate property changes, xhr.open() and xhr.send() both change the readystate property and hence the function is called*/
    if(this.readyState == 4 && this.status == 200){
       cb(JSON.parse(this.responseText)); /*change inner html to responeText taken from our xhr object, JSON.parse coverts from a strong to an object rather than a string that looks like an object*/
    }
};
}

function writeToDocument(type){
    var el = document.getElementById("data");
    el.innerHTML="";
    getData(type,function(data){
        data = data.results; /*console.dir(data) used to show the format of data in the object and it found an array called results, which contains an array of 10 items */
        data.forEach(function(item){
             el.innerHTML += "<p>" + item.name + "</p>";
        })
        /*change inner html to responeText taken from our xhr object*/
    })
}