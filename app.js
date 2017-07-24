$(document).ready(function() {
  var todos = [];
  var state = "";

  function filterByState(todo) {
    if (state === "completed") {
      return todo.completed;
    } else if (state === "active") {
      return !todo.completed;
    } else if (!state) {
      return true;
    } else {
      return false;
    }
  }

  function render(todos) {
    todos = todos.filter(filterByState);
    // $('.empty').empty();
    $(".item").empty();
    if (todos.length === 0) {
      var empty = $(`
      <div class="empty">
        <p>Nothing to show here</p>
      </div>
      <hr>

      </div>
      `);
      $(".item").append(empty);
    } else {
      for (var i = 0; i < todos.length; i++) {
        var todoItem = $(`
      <div id=${todos[i].id} class="todo ${todos[i].completed
          ? "completed"
          : ""}">
        <input class="item-box" type="checkbox" ${todos[i].completed
          ? "checked"
          : ""}><span>${todos[i]
          .activity}</span><i class="pull-right close">x</i>
      </div>
      `);
        $(".item").append(todoItem);
      }
    }

    $(".count").html(todos.length + " item" + (todos.length === 1 ? "" : "s"));
    addHover();
    $(".item-box").change(checkChange);
    $(".close").click(deleteTodo);
  }

  function checkChange() {
    var id = $(this).parent().attr("id");
    todos = todos.map(function(todo) {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    render(todos);
  }

  function deleteTodo() {
    var id = $(this).parent().attr("id");
    todos = todos.filter(function(todo) {
      return todo.id !== id;
    });
    render(todos);
  }

  $(".filter .all").click(showAll);
  $(".filter .completed").click(showCompleted);
  $(".filter .active").click(showActive);

  function showAll() {
    // var todoAll = todos;
    // render(todoAll);
    state = "";
    render(todos);
  }

  function showCompleted() {
    // var todoComplete = todos.filter(function (todo) {
    //   return todo.completed === true;
    // })
    // render(todoComplete);
    state = "completed";
    render(todos);
  }

  function showActive() {
    // var todoActive = todos.filter(function (todo) {
    //   return todo.completed === false;
    // })
    // render(todoActive)
    state = "active";
    render(todos);
  }

  $("#submittodo").click(function() {
    $("#todoform").submit();
  });

  $("#todoform").submit(function(e) {
    e.preventDefault();
    // console.log('Form Submitted!!!')
    var input = $("#todoinput").val();
    // console.log(input);
    if (!input) return;

    var todoObj = {
      activity: input,
      id: "x" + Math.random() * 100,
      created: new Date(),
      completed: false
    };

    // todoObj.activity = input;
    // todoObj.id = 'x' + (Math.random() * 100);
    // todoObj.created = new Date();
    // todoObj.completed = false;

    todos.unshift(todoObj);

    $("#todoinput").val("");

    render(todos);
  });

  function addHover() {
    $(".todo").hover(function() {
      //   $(this).find('.close').css('visibility', 'visible')
      // }, function() {
      //   $(this).find('.close').css('visibility', 'hidden')
      $(this).find(".close").toggle();
    });
  }
  render(todos);
});
