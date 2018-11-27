$(document).ready(function() {
    console.log("debug 1");

    /*
     * Add task to the database
     */
    $("#addTask").click(function() {

		$.get("addTask.php", {"description": $("#task").val()}, function(t) {
			console.log(t.id);
			console.log(t.description);
		}, "json");

    })

    /*
     * Get all tasks from the database, assign task ID as li class and display
     * to page
     */
    $.get("allTasks.php", function(t) {
        // console.log(t);

        $(t).find("task").each(function() {
            console.log($(this).find("description").text());
            var taskText = $("<li></li>").text($(this).find("description").text());
            $(taskText).addClass($(this).find("id").text());
            $("#toDoList").append(taskText);
            $("<img></img>").attr("src", "delete.png");
            refreshLi();
        });

    }, "xml");

})

/*
 * Function to display task to page as an li
 */
// function outputTasks(id, task) {
//     // var deleteButton = $("<input type='button' value='delete' />");
//     deleteButton.click(function() {
//
//         $.get("deleteTask.php", {"id": id}, function(t) {
//             if (t == 1) {
//                 // remove task from user interface
//             }
//         })
//     })
//
// }

/*
 * Function to add task from text box to clientside display
 */
$(function() {
    // TODO save new task to db
    $("#addTask").click(function() {
        $("#toDoList").append("<li>" + $('#task').val()+"</li>");
        // console.log($("#task").val());
        $("#task").val("");
        refreshLi();
    })

})



/*
 * Function that will be called when page is first loaded and when new tasks
 * are created so they can be deleted
 */
function refreshLi() {
    // Delete tasks for clientside
    $("#toDoList li").click(function() {
        console.log($(this).attr("class"));
        $(this).remove();
        $.get("deleteTask.php", {"id": $(this).attr("class")}, function(t) {
            if (t == 1) {
                // remove task from user interface

            }

        })
    })
    // TODO delete task with serverside code
    // $.get("deleteTask.php", {"id": id}, function(t) {
    //     if (t == 1) {
    //         // remove task from user interface
    //     }


    // Highlight li on mouseover (just for fun)
    $("#toDoList li").mouseover(function() {
        $(this).css("background-color", "yellow");
    })
    $("#toDoList li").mouseout(function() {
        $(this).css("background-color", "white");
    })

}
    refreshLi();
