

$(document).ready(function(){
    $('#delete_job_role').on('click',function(e){
        if (confirm('Are you sure you want to delete this job role?')) {
            $target = $(e.target);
        
        $.ajax({
            url: '/admin/delete/'+ $target.attr('page_id'),
            type: 'DELETE',
            success: function (result) {
                // Do something with the result
            }
        });
          } else {
            console.log("Action Aborted");
          }
    });
});