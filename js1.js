function Redirect() {
               if(document.getElementById("Cgroup")){
                       window.location="groupchat.html";}
                /*else{
                    //window.location="groupchat.html"
                    console.log("Nth yet!!!")
                }*/
            }
function selectOnlyThis1(id) {
    for (var i = 1;i <= 2; i++)
    {
        document.getElementById("radio"+i).checked = false;
    }
    document.getElementById(id).checked = true;
}

function selectOnlyThis2(id) {
    for (var i = 1;i <= 2; i++)
    {
        document.getElementById("check"+i).checked = false;
    }
    document.getElementById(id).checked = true;
}

function getInputs(){
    var num = document.getElementById("numParti").value;
    console.log("Num of Participants: " + num);
    

    var wishlist;
    if(document.getElementById("radio1").checked){
        wishlist = true;
        console.log("wishlist " + wishlist);
    } else if(document.getElementById("radio2").checked){
        wishlist = false; 
        console.log("wishlist " + wishlist);
    }

    var numGameType = document.getElementsByName("GameType");
    var count =  0;
    for(var i = 0 ; i < numGameType.length ; i++){
        if(numGameType[i].checked){
            count +=  1;
        }
    }


    var gameType;
    if(count == 1){
        if(document.getElementById("check1").checked){
        gameType = "Normal";
        console.log("GameType " + gameType);
        } else if(document.getElementById("check2").checked){
        gameType = "Rank";
        console.log("GameType " + gameType);
        }
    } else {
        gameType = "Both Normal and Rank";
        console.log("GameType " + gameType);
    }

    var time = document.getElementsByName("StartTime");
    var num1 = time[0].value;
    console.log("Time: " + num1);

}


