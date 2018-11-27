$(document).ready(function() {
    /*
     * Add task to the database
     */
    $("#addTask").click(function() {

		$.get("addTask.php", {"description": $("#task").val()}, function(t) {
		}, "json");

    })

    /*
     * Get all tasks from the database, assign task ID as li class and display
     * to page
     */
    $.get("allTasks.php", function(t) {

        $(t).find("task").each(function() {
            var taskText = $("<li></li>").text($(this).find("description").text());
            $(taskText).addClass($(this).find("id").text());
            $("#toDoList").append(taskText);
            $("<img></img>").attr("src", "delete.png");
            refreshLi();
        });

    }, "xml");
})


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
 * are created. Also, somehow magically responsible for deleting tasks from
 * server and client sides. Tried refactoring so delete and highlighting of li
 * where in their own methods to no avail.
 */
function refreshLi() {
    /*
     * Delete tasks for clientside and serverside.... TODO - figure out why the
     * hell this actually works, cuz right now it's just magic
     */
    $("#toDoList li").click(function() {
        // Remove task for UI
        $(this).remove();
        // Remove task from serverside
        $.get("deleteTask.php", {"id": $(this).attr("class")}, function(t) {
            if (t == 1) {
            }

        })
    })

    // Highlight li on mouseover (just for fun)
    $("#toDoList li").mouseover(function() {
        $(this).css("background-color", "yellow");
    })
    $("#toDoList li").mouseout(function() {
        $(this).css("background-color", "white");
    })
}
