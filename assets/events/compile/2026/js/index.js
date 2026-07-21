document.addEventListener('DOMContentLoaded', onDocumentReady);

function onDocumentReady()
{
    let venueMap = null;
    const activeTBTab  = document.getElementById('taskbar-active-window-tab');
    const closeButtons = document.getElementsByClassName('window__close');
    const desktopIcons = document.getElementsByClassName('desktop-icon');
    const desktopIconIDToWindowID = new Map([
        ['main-window-icon', 'main-window'],
        ['venue-window-icon', 'venue-window']
    ]);

    setUpWindowCloseButtons();
    setUpDesktopIconClicks()
    setUpDesktopSpace();
    setUpVenueMap();

    function setUpWindowCloseButtons()
    {
        for (let button of closeButtons) {
            button.onclick = function () {
                let window = button.parentElement.parentElement.parentElement;
                window.classList.add('no-display');

                activeTBTab.classList.add('no-display');
            }
        }
    }

    function setUpDesktopIconClicks()
    {
        for (let icon of desktopIcons) {
            const iconID   = icon.id;
            const windowID = desktopIconIDToWindowID.get(iconID);
            const window   = document.getElementById(windowID);
            const titleBar = window.getElementsByClassName('window__title')[0];
            const title    = titleBar.textContent;

            icon.addEventListener('click', function (e) {
                e.stopPropagation();

                deselectDesktopIcons();
                icon.classList.add('selected');
            });

            icon.addEventListener('dblclick', () => {
                if (window.classList.contains('no-display')) {
                    closeActiveWindows();

                    window.classList.remove('no-display');
                    activeTBTab.textContent = title;
                    activeTBTab.classList.remove('no-display');

                    if (iconID === 'venue-window-icon') {
                        venueMap.invalidateSize();
                    }
                }
            });
        }
    }

    function setUpDesktopSpace()
    {
        let desktopSpace = document.getElementById('desktop-space');
        desktopSpace.addEventListener('click', function (e) {
            // Taken from:
            // https://www.roytettero.com/posts
            //        /detect-click-outside-of-element-with-javascript/
            const target = e.target;
            if (
                !target.classList.contains('desktop-icon')
                || !target.classList.contains('desktop-icon__icon')
                || !target.classList.contains('desktop-icon__label')
            ) {
                deselectDesktopIcons();
            }
        })
    }

    function setUpVenueMap()
    {
        let greenIcon = new L.Icon({
            iconUrl:     'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl:   'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize:    [25, 41],
            iconAnchor:  [12, 41],
            popupAnchor: [1, -48],
            shadowSize:  [41, 41]
        });

        venueMap = L
            .map('venue-map')
            .setView([11.212966, 125.009689], 50);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(venueMap);

        let marker = L.marker(
            [11.212966, 125.009689],
            {
                icon:        greenIcon,
                closeButton: false
            }
        );

        marker
            .addTo(venueMap)
            .bindPopup('<p style="text-align: center">ACLC Tacloban Fatima Campus, Tacloban City</p>')
            .openPopup();
    }

    function deselectDesktopIcons()
    {
        for (let icon of desktopIcons) {
            if (icon.classList.contains('selected')) {
                icon.classList.remove('selected');
            }
        }
    }

    function closeActiveWindows()
    {
        const windows = getActiveWindows();
        for (let window of windows) {
            window.classList.add('no-display');
        }
    }

    function getActiveWindows()
    {
        return document.querySelectorAll('div.window:not(.no-display)');
    }
}
