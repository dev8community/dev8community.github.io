function main() {
    let dataToggleButtons = document.getElementsByClassName('toggle-data-btn');
    Array.from(dataToggleButtons).forEach(function (btn) {
        btn.addEventListener('click', function() {
            let graph = btn.previousElementSibling;
            if (graph.classList.contains('show-all')) {
                graph.classList.remove('show-all');
                const scrollY = graph.getBoundingClientRect().top + window.scrollY - 60;
                window.scroll({
                    top: scrollY,
                    behavior: 'smooth'
                });

                btn.innerHTML = 'Show More'
            } else {
                graph.classList.add('show-all');
                btn.innerHTML = 'Show Less'
            }
        });
    });

    let tabButtons = document.getElementsByClassName('data-demographic-tabs');
    for (let tab of tabButtons) {
        let buttons = tab.children;
        let dataGroups = tab.nextElementSibling.children;

        Array.from(buttons).forEach((button, index) => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('selected')) {
                    Array.from(buttons).forEach((button) => {
                        button.classList.remove('selected');
                    });

                    // Hide all data groups first before.
                    Array.from(dataGroups).forEach((group) => {
                        group.classList.add('hide');
                    });

                    button.classList.add('selected');
                    dataGroups[index].classList.remove('hide');
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', main);
