// Set date and render it
function renderClock(){
$("#currentDay").text("Today's Date: " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

    //if the time is the same as the time on the timeblock, display task block as red
    //if the time is in the future, display green
    //if the time is in the past, display grey
function timeTableColor(t){
 if (moment().isSame(moment('9:00 AM', 'hh:mm A').add(t, 'hours'), 'hour')) {
           $(taskBlock).addClass('present');
     } else if (moment().isBefore(moment('9:00 AM', 'hh:mm A').add(t, 'hours'), 'hour')) {
           $(taskBlock).addClass('future');
     } else if (moment().isAfter(moment('9:00 AM', 'hh:mm A').add(t, 'hours'), 'hour')) {
           $(taskBlock).addClass('past');
     }
}

//runs main functionality once page is ready
$(document).ready(function() {

    // For loop to get and display tasks from local storage
    hourArr = $('.hour').toArray();
    for (i = 0; i < hourArr.length; i++) {
        $(hourArr[i]).siblings('textarea').text(localStorage.getItem($(hourArr[i]).attr('data-time')));
    }
});

// For loop to print rows with timeblocks, taskblocks, and save buttons. allows for longer or shorter timetables dependent on i variable
for (i = 0; i < 16; i++) {
    var rowBlock = $('<div>').addClass('row');
    var timeBlock = $('<div>').addClass('hour col-md-2').text(moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
    timeBlock.attr('data-time', moment('9:00 AM', 'hh:mm A').add(i, 'hours').format('hA'));
    var taskBlock = $('<textarea>').addClass('col-md-9');
    var saveButton = $('<button>').addClass('saveBtn col-md-1').html('<i class="fas fa-save"></i>');

  //appends the various display blocks to the DOM in an orderly manner
    $('.container').append(rowBlock);
    $(rowBlock).append(timeBlock);
    $(timeBlock).after(taskBlock);
    $(taskBlock).after(saveButton);

    timeTableColor(i);
    setInterval(timeTableColor, 60000);
}

// Save click event to store data in local storage
$('.saveBtn').on('click', function() {

    localStorage.setItem($(this).siblings('div.hour').attr('data-time'), $(this).siblings('textarea').val())
});

//run the update time function
renderClock();
//set interval to update the clock on the display every second
setInterval(renderClock, 1000);