mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
}

var collapsibles = document.querySelectorAll('[data-collapsible]');

document
    .getElementById('close-all')
    .addEventListener('click', function () {
        for (var i = 0; i < collapsibles.length; ++i) {
            mobiscroll.instances[collapsibles[i].id].hide();
        }
    })


document
    .getElementById('toggle-first')
    .addEventListener('click', function () {
        mobiscroll.instances[collapsibles[0].id].toggle();
    })