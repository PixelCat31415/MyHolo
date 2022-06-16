function toggleDimmed(){
    $("body").toggleClass("dimmed");
}

$(async ()=>{
    await $("#pg_home_container").load("html/home.html");
})