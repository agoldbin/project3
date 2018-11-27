$(document).ready(function() {
    console.log("debug 1");

    // Add task to the database
    $("#addTask").click(function() {

		$.get("addTask.php", {"description": $("#task").val()}, function(t) {
			console.log(t.id);
			console.log(t.description);
		}, "json");

    })

    // Get all tasks from the database
    $.get("allTasks.php", function(t) {
        // console.log($this.find("description").text());




        console.log(t);
        $(t).find("task").each(function() {
            console.log($(this).find("description").text());
            var taskText = "<li>" + $(this).find("description").text() + "</li>";
            $("#toDoList").append(taskText);
        });

    }, "xml");
})

/*
 * Function to display task to page as an li
 */
function outputTasks(id, task) {
    // var deleteButton = $("<input type='button' value='delete' />");
    // deleteButton.click() {}
    $.get("deleteTask.php", {"id": id}, function(t) {
        if (t == 1) {
            // remove task from user interface
        }
    })
// }
}

/* Function to add task from text box to clientside display
 *
 */
$(function() {
    // TODO save new task to db
    $("#addTask").click(function() {
        $("#toDoList").append("<li>" + $('#task').val()+"</li>");
        // console.log($("#task").val());
        $("#task").val("");
        refreshLi();
    })

    refreshLi();
})

/* Function that will be called when page is first loaded and when new tasks
 * are created so they can be deleted
 */
function refreshLi() {
    // Delete tasks for clientside
    $("#toDoList li").click(function() {
        $(this).remove();
    })
    // TODO delete task with serverside code

    // Highlight li on mouseover (just for fun)
    $("#toDoList li").mouseover(function() {
        $(this).css("background-color", "yellow");
    })
    $("#toDoList li").mouseout(function() {
        $(this).css("background-color", "white");
    })
}
