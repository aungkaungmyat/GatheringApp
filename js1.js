function Redirect() {
               if(document.getElementById("Cgroup")){
                       window.location="groupchat.html";}
                else{
                    window.location="groupchat.html"
                }
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


