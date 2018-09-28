// Blur images on hover
$('.special.cards .image').dimmer({
    on: 'hover'
})

// Display modal on button click
$('.ui.inverted.button.food-menu').on('click', function () {
    $('.ui.basic.modal')
        .modal('show')
})