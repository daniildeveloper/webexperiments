$(function () {
  var folder = $(".folder"),
    front = folder.find('front'),
    img = $("img"),
    droppedCount = 0;

    img.draggable();

    folder.droppable({
      drop: function(event, ui) {
        //remove the dragged icon
        ui.draggable.remove();
        //update the counters
        front.text(++droppedCount);
      },
      activate: function () {
        //when users start drawing on icon
        folder.addClass(".open");
      },
      deactivate: function () {
        //close the folder
        folder.removeClass(".open");
      }
    });


});