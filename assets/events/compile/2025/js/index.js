function onDocumentReady()
{
    loopLogo();
}

function loopLogo()
{
    let logoElem = document.getElementById('logo');
    let frameNum = 0;
    setInterval(() => {
        logoElem.src = '/assets/events/compile/2025'
            + '/img/logo-frames/'
            + `logo-frame-${frameNum % 2}.png`;

        frameNum++;
    }, 800);
}

document.addEventListener('DOMContentLoaded', onDocumentReady);
