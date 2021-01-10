
$(document).on("turbolinks:load", function () {
  if ($('.static_pages.index').length > 0) {
    // render all tasks or GET
    indexTasks(function (response) {
      var htmlString = response.tasks.map(function (task) {
        //return "<div class='col-12 mb-3 p-2 border rounded task' data-id='" + task.id + "'>" + task.content + "</div>"
        return `<div class="col-12 mb-3 p-2 border rounded task" data-id="${task.id}">
                  <div class="row">
                    <div class="col-1">
                      <input type="checkbox" ${task.completed? 'checked': ''}>
                    </div>
                    <div class="col-9">
                      ${task.completed? `<p style="text-decoration: line-through;">${task.content}</p>`: `<p>${task.content}</p>`}
                    </div>
                    <div class="col-2" id="remove">
                      <button class="btn btn-danger">Remove</button>
                    </div>
                  </div>
                </div>`
      })

      $("#tasks").html(htmlString)
    })

    // add a new task
    $('#add').on('click', function () {
      input = $('input#content');
      if (input.val()) {
        postTask(input.val(), function (response) {
          $( `<div class="col-12 mb-3 p-2 border rounded task" data-id="${response.task.id}">
          <div class="row">
            <div class="col-1">
              <input type="checkbox" ${response.task.completed? 'checked': ''}>
            </div>
            <div class="col-9">
              <p>${response.task.content}</p>
            </div>
            <div class="col-2" id="remove">
              <button class="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>`).prependTo($('#tasks'))
        })
      }
      input.val('')
    })
     // add a new task when pressed 'Enter'
    $('input#content').on('keypress', function (event) {
      if (event.key === 'Enter') {
        if ($(this).val()) {
          postTask(input.val(), function (response) {
            $( `<div class="col-12 mb-3 p-2 border rounded task" data-id="${response.task.id}">
            <div class="row">
              <div class="col-1">
                <input type="checkbox" ${response.task.completed? 'checked': ''}>
              </div>
              <div class="col-9">
                <p>${response.task.content}</p>
              </div>
              <div class="col-2" id="remove">
                <button class="btn btn-danger">Remove</button>
              </div>
            </div>
          </div>`).prependTo($('#tasks'))
          })
        }

        // empty the input
        $(this).val('')
      }
    })

    // mark complete / active a task
    $(document).on('input', 'input[type=checkbox]', function () {
      // mark complete
      if ($(this).prop('checked')) {
        var id = $(this).closest('.col-12').attr('data-id');
        markComplete(id)
        $(this).parent().next().find('p').css('text-decoration', 'line-through')
      } else {
        var id = $(this).closest('.col-12').attr('data-id');
        markActive(id);
        $(this).parent().next().find('p').css('text-decoration', '')
      }
    })
   
    // delete task
    $(document).on('click', '#remove button', function () {
      var id = $(this).closest('.col-12').attr('data-id');
      deleteTask(id);
      $(this).closest('.col-12').remove()
    })
  }
})