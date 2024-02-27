

function display(data){console.log(data)}

function printHelloWorld(){ console.log("Hello WOrld");}
    
function blockFor300ms()
{} // blocks js thread for 300ms }
 
setTimeout(printHelloWorld, 0); //nakon 0 ms, preglednik funkciju PrintHello stavlja u callback queqe, ali je JS još ne stavlja na call stack

const futureData= fetch('https://oss.unist.hr');
futureData.then(display, handleError);
blockFor300ms()
console.log("Me first!"); 

//futureData.then(display, handleError);
//futureData.catch(handleError) onFulfilled() onRejection()