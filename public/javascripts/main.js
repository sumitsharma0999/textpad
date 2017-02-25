$(document).ready(function() {
    var saveSuccessMsg = "Saved successfully";
    var noteCreatedSuccessMsg = "New note created successfully";
    
    putCursorToEndOfEditor();

    var $textarea = $(".editor");

    $(".save-button").click(function(e) {
        var noteId = getCurrentNoteIdFromUrl();
        var url = "/" + noteId;
        var content = $textarea.val();
        var data = {"noteContent": content};

        showOverlay();

        var jqXhr = $.post(url, data, function(returnData) {
        })
        .done(function(returnNoteId) {
            if(!noteId) {
                history.pushState({}, "", returnNoteId);
                displayToast(noteCreatedSuccessMsg);
            }
            else {
                displayToast(saveSuccessMsg);
            }
            console.log("saved successfully");
        })
        .fail(function(error) {
            console.log("failed due to " + error);
            displayToast("Error: " + error);
        })
        .always(function() {
            hideOverlay();
            putCursorToEndOfEditor();
        });
    });
});

function showOverlay() {
    $(".editor-layover").show();
    // disable save button as well
    $(".save-button").prop('disabled', true);
}

function hideOverlay() {
    $(".editor-layover").hide();
    // Enable save button
    $(".save-button").prop('disabled', false);
}

function getCurrentNoteIdFromUrl() {
    return location.pathname.substring(1, location.pathname.length);
}

function displayToast(text, duration) {
    $(".toast-area").text(text);
    $(".toast-area").css({'display': 'table'});

    // Set a timeout to hide the toast
    if(!duration) {
        duration = 3000;
        setTimeout(function() {
             $(".toast-area").fadeOut('slow');
        }, duration);
    }
}

function putCursorToEndOfEditor() {
    var $textarea = $(".editor");
    $textarea.focus();
    $textarea.val($textarea.val());

}
