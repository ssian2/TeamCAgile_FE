

$(document).ready(function(){
    $('#delete_job_role').on('click',function(e){
        if (confirm('Are you sure you want to delete this job role?')) {
            $target = $(e.target);
            window.location.href = '/admin/delete/'+ $target.attr('page_id');
          } else {
            console.log("Action Aborted");
          }
    });

    $("input").on("keyup",function() {
      var maxLength = $(this).attr("maxlength");
      if(maxLength == $(this).val().length) {
        alert("You can't write more than " + maxLength +" chacters")
      }
    })
});