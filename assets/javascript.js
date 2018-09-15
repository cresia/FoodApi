

var food = ['Pizza', 'Orange Juice', 'Fried Rice', 'Durian', 'Blueberry', 'Strawberry', 'Avocado', 'Chocolate', 'Ice Cream']


function buttons(){
    $('#giphyButton').empty()
    for (var i = 0; i < food.length; i++){
        var buttons = $('<button>')
        buttons.attr('data-name', food[i])
        buttons.addClass('btn btn-outline-info btn-lg')
        buttons.text(food[i])
        buttons.css('margin-left', '10px')
        buttons.css('margin-bottom', '5px')
        $('#giphyButton').prepend(buttons)
    }
    $('#reset').on('click', function(){
        location.reload()
    })
}
buttons()


function displayPic (){

    $('button').on('click', function() {
        $('#giphyOutput').empty()
        var food = $(this).attr('data-name')
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=xYofdWEKDL7T4feEM5IJnnOV8EnswmIK&limit=15"

        $.ajax({
        url: queryURL,
        method: 'GET'
        })
        .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var picDiv = $('<div>')
                var giphyRating = results[i].rating
                var foodPic = $('<img>')
                var rating = $('<p>').text('Rating: ' + giphyRating)
                foodPic.css('height', '300px')
                foodPic.css('width', '400px')
                foodPic.css('padding', '8px')
                foodPic.attr('src', results[i].images.fixed_height_still.url)
                foodPic.attr('data-still',results[i].images.fixed_height_still.url)
                foodPic.attr('data-move',results[i].images.fixed_height.url)
                foodPic.attr('data-state', 'still')
                foodPic.attr('id', 'images')
                picDiv.append(rating)
                picDiv.append(foodPic)
                $('#giphyOutput').append(picDiv)
            }
        });
    });
    $(document).on('click', '#images', function(){
        var state = $(this).attr('data-state')
        if ( state == 'still'){
            $(this).attr('src', $(this).data('move'))
            $(this).attr('data-state', 'move')
        } else {
            $(this).attr('src', $(this).data('still'))
            $(this).attr('data-state', 'still')
        }

       
    });
}
displayPic()


function addFood () {

    $('#addFood').on('click', function(event) {
        event.preventDefault()
        var foodSpace = $('#addingFood').val().trim() //to strip
        if (foodSpace == '') {
            $('#emptyFood').text('add Food')
            return false
        }
        food.push(foodSpace)
        
        buttons()
        displayPic()

        
    });
}
addFood()