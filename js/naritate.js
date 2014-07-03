$(".favCmdFr").click(function(){
  var a=$(this).parent().attr("id");
  $.post("/fav/fr",{id:a},function(){
      $("#"+a+">.favCmdFr").attr("disabled",true)
    })
});
$(".favCmdJp").click(function(){
  var a=$(this).parent().attr("id");
  $.post("/fav/jp",{id:a},function(){
    $("#"+a+">.favCmdJp").attr("disabled",true)
  })
});
$(".booCmdFr").click(function(){
  var a=$(this).parent().attr("id");
  $.post("/boo/fr",{id:a},function(){
    $("#"+a+">.booCmdFr").attr("disabled",true)
  })
});
$(".booCmdJp").click(function(){
  var a=$(this).parent().attr("id");
  $.post("/boo/jp",{id:a},function(){
    $("#"+a+">.booCmdJp").attr("disabled",true)
  })
});