document.addEventListener('DOMContentLoaded', onDocumentReady);

function onDocumentReady()
{
    setUpTerminalOnInit();
    focusOnTerminalPrompt();
}

function setUpTerminalOnInit() {
    let terminalOutput = document.getElementById('hero-terminal-output');
    terminalOutput.innerHTML = defaultHeroSectionContent;

    addTerminalPrompt(terminalOutput);
    setUpLatestTerminalPrompt();
}

function focusOnTerminalPrompt()
{
    const latestPrompt = getLatestPromptInput();
    if (latestPrompt) {
        latestPrompt.focus();
    } else {
        console.warn('Prompt input not found.');
    }
}

function processPromptInput()
{
    let promptInput = getLatestPromptInput();
    if (promptInput) {
        let terminalOutput = document.getElementById('hero-terminal-output');

        const input    = promptInput.textContent;
        const commands = input.split(';');

        commands.forEach(function (command) {
            const parts      = command.trim().split(' ');
            const c          = parts[0].trim();
            const parameters = parts.slice(1);
            switch (c) {
                case 'register':
                    handleRegisterInput(parameters, terminalOutput);
                    break;
                case 'info':
                    handleInfoInput(parameters, terminalOutput);
                    break;
                case 'message':
                    handleMessageInput(parameters, terminalOutput);
                    break;
                case 'login':
                    handleLoginInput(parameters, terminalOutput);
                    break;
                case 'help':
                    handleHelpInput(parameters, terminalOutput);
                    break;
                case 'echo':
                    handleEchoInput(parameters, terminalOutput);
                    break;
                case 'shutdown':
                    handleShutdownInput(parameters, terminalOutput);
                    break;
                case 'restart':
                    handleRestartInput(parameters, terminalOutput);
                    break;
                case 'clear':
                    handleClearInput(parameters, terminalOutput);
                    break;
                case '':
                    break;
                default:
                    handleOtherInputs(c, terminalOutput);
                    break;
            }
        });
    }
}

function handleInfoInput(parameters, terminalOutput)
{
    if (parameters.length > 0) {
        displayUnrecognizedParamsWarning(parameters, terminalOutput);
    }

    const sections = document.getElementsByClassName('promotion-1-section');
    console.log(sections);
    if (sections.length > 0) {
        const section = sections[0];
        section.scrollIntoView({
            behavior: 'smooth',
            block:    'start'
        });
    }
}

function handleRegisterInput(parameters, terminalOutput)
{
    if (parameters.length > 0) {
        displayUnrecognizedParamsWarning(parameters, terminalOutput);
    }

    addNewTerminalOutput(
        '<p>You are now being redirected to the registration page.</p>',
        terminalOutput
    );
    window.location.href = '/events/boot/2026/register';
}

function handleMessageInput(parameters, terminalOutput)
{
    if (parameters.length > 0) {
        displayUnrecognizedParamsWarning(parameters, terminalOutput);
    }

    addNewTerminalOutput(defaultHeroSectionContent, terminalOutput);
}

function handleLoginInput(parameters, terminalOutput)
{
    if (parameters.length > 0) {
        displayUnrecognizedParamsWarning(parameters, terminalOutput);
    }

    addNewTerminalOutput(
        '<p>ERROR: No user accounts available.</p>',
        terminalOutput
    );
}

function handleHelpInput(parameters, terminalOutput)
{
    if (parameters.length > 0) {
        displayUnrecognizedParamsWarning(parameters, terminalOutput);
    }

    addNewTerminalOutput(helpMessageContent, terminalOutput);
}

function handleEchoInput(parameters, terminalOutput)
{
    const newOutput = parameters.join(' ');
    addNewTerminalOutput(`<p>${newOutput}</p>`, terminalOutput);
}

function handleShutdownInput(parameters, terminalOutput)
{
    if (parameters.length > 0) {
        displayUnrecognizedParamsWarning(parameters, terminalOutput);
    }

    addNewTerminalOutput('<p>Shutting down...</p>', terminalOutput);

    // First phase of shutdown will show a blue overlay.
    const shutdownOverlay = document.getElementById('shutdown-overlay');
    shutdownOverlay.classList.value = '';
    document.body.style.overflow    = 'hidden';

    // Then, on "successful shutdown", the overlay becomes black after
    // 3 seconds.
    setTimeout(function () {
        shutdownOverlay.classList.value = 'phase-2';
    }, 3000);
}

function handleRestartInput(parameters, terminalOutput)
{
    if (parameters.length > 0) {
        displayUnrecognizedParamsWarning(parameters, terminalOutput);
    }

    addNewTerminalOutput('<p>Restarting...</p>', terminalOutput);

    window.location.reload();
}

function handleClearInput(parameters, terminalOutput)
{
    if (parameters) {
        displayUnrecognizedParamsWarning(parameters, terminalOutput);
    }

    terminalOutput.innerHTML = '';
}

function handleOtherInputs(input, terminalOutput)
{
    const messageHTML = `<p>Unrecognized command: ${input}</p>`
    addNewTerminalOutput(messageHTML, terminalOutput);
}

function setUpLatestTerminalPrompt()
{
    teardownTerminalPrompts();

    const latestPromptInput = getLatestPromptInput();
    if (latestPromptInput) {
        latestPromptInput.addEventListener(
            'keydown',
            handleTerminalPromptKeyDown
        );

        // Needed since all terminal prompts' contents cannot be editable
        // after teardown.
        latestPromptInput.contentEditable = 'plaintext-only';
    }

    const heroSections = document.getElementsByClassName('hero-section');
    const heroSection  = heroSections[0];
    heroSection.addEventListener('click', handleHeroSectionClick);
}

function teardownTerminalPrompts()
{
    const prompts = document.getElementsByClassName('prompt-input');
    for (let i = 0; i < prompts.length; i++) {
        prompts[i].removeEventListener('keydown', handleTerminalPromptKeyDown);
        prompts[i].contentEditable = false;
    }

    const heroSections = document.getElementsByClassName('hero-section');
    const heroSection  = heroSections[0];
    heroSection.removeEventListener('click', handleHeroSectionClick);
}

function addTerminalPrompt(terminalOutput)
{
    const doc = new DOMParser().parseFromString(
        terminalPromptHTML,
        'text/html'
    );
    const promptElem = doc.body.children[0];
    terminalOutput.insertAdjacentElement('beforeend', promptElem);

    setUpLatestTerminalPrompt();
    focusOnTerminalPrompt();
}

function handleTerminalPromptKeyDown(e)
{
    if (e.key === 'Enter') {
        e.preventDefault();
        processPromptInput();

        let terminalOutput = document.getElementById('hero-terminal-output');
        addTerminalPrompt(terminalOutput);
        scrollDownTerminalOutput();
    }
}

function handleHeroSectionClick()
{
    if (!doesSelectionExist()) {
        focusOnTerminalPrompt();
    }
}

function displayUnrecognizedParamsWarning(parameters, terminalOutput)
{
    let processedParams = [];
    parameters.forEach(function (param) {
        processedParams.push(`"${param.trim()}"`);
    });

    let paramString = `[${processedParams.join(', ')}]`;
    let warningMessage = `
        <p>WARNING: Unrecognized parameters:</p>
        <p>&nbsp;&nbsp;${paramString}</p>
        <p>&nbsp;</p>
    `;
    addNewTerminalOutput(warningMessage, terminalOutput);
}

function addNewTerminalOutput(output, terminalOutput)
{
    const wrapperElem     = document.createElement('div');
    wrapperElem.innerHTML = output;
    terminalOutput.insertAdjacentElement('beforeend', wrapperElem);
}

function scrollDownTerminalOutput()
{
    const output = document.getElementById('hero-terminal-output');
    output.scrollTo({ top: output.scrollHeight });
}

function getLatestPromptInput()
{
    const prompts = document.getElementsByClassName('prompt-input');
    return prompts[prompts.length - 1];
}

// Based on: https://stackoverflow.com/a/43215606/1116098
// Placed here for now since importing modules is not supported in Knitter.
function doesSelectionExist()
{
    let selection = window.getSelection();
    return !selection.isCollapsed
        && selection.anchorNode != null
}

const defaultHeroSectionContent = `
    <img class="logo"
         src="/assets/img/logos/boot/logo.png"
         alt="Dev8 BOOT Logo">
    <h1 id="title">
        <span>------------------------------</span><br/>
        <span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</span><br/>
        <span>| WELCOME TO DEV8 BOOT 2026! |</span><br/>
        <span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</span><br/>
        <span>------------------------------</span>
    </h1>
    <h2>
        &gt; Load up your developer skills. &lt;
    </h2>
    <div class="hero-details">
        <img src="/assets/img/icons/calendar.png"
             alt="Date Icon"/>
        <p class="details">&nbsp;April 4, 2026</p>
    </div>
    <div class="hero-details">
        <img src="/assets/img/icons/clock.png"
             alt="Clock Icon"/>
        <p class="details">&nbsp;1:00PM - 6:00PM PHT</p>
    </div>
    <div class="hero-details">
        <img src="/assets/img/icons/pin.png"
             alt="Location Icon"/>
        <p class="details">&nbsp;Zoom</p>
    </div>
    <p>&nbsp;</p>
    <p>Bootloaded with</p>
    <div class="partner-logos">
        <a href="https://www.dict.gov.ph/"><img id="dict8-logo" src="/assets/img/logos/partners/dict8-light-sm.webp" alt="DICT 8 Logo"/></a>
        <a href="https://www.jetbrains.com/"><img id="jetbrains-logo" src="/assets/img/logos/partners/jetbrains-light.svg" alt="JetBrains Logo"/></a>
    </div>
    <p>&nbsp;</p>
    <p>
        Dev8's online virtual mini-conference for developers, students,
        and tech enthusiasts of Eastern Visayas is back this 2026 to provide
        you with new talks, discussions, demos, and ideas. Enter "info" or
        scroll down for further details.
    </p>
    <p>&nbsp;</p>
    <p>To register, enter "register". Limited slots only!</p>
    <p>&nbsp;</p>
    <p>If you need a full list of supported commands, enter "help".</p>
`;

const helpMessageContent = `
    <p>Dev8 BOOT 2026 Basic Input/Output Terminal</p>
    <p>&nbsp;</p>
    <p>Commands:</p>
    <p>&nbsp;&nbsp;register&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Register for Dev8 BOOT 2026.</p>
    <p>&nbsp;&nbsp;info&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View more information about Dev8 BOOT 2026.</p>
    <p>&nbsp;&nbsp;message&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Print the default Dev8 BOOT 2026 message.</p>
    <p>&nbsp;&nbsp;login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login to a user session.</p>
    <p>&nbsp;&nbsp;echo &lt;text&gt;...&nbsp;&nbsp;Print the texts after the command.</p>
    <p>&nbsp;&nbsp;help&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Print this help text.</p>
    <p>&nbsp;&nbsp;shutdown&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Shuts down" the page.</p>
    <p>&nbsp;&nbsp;restart&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reload the page.</p>
    <p>&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clears the terminal output.</p>
`;

const terminalPromptHTML = `
    <div class="hero-terminal-prompt">
        <p>
            <span class="green-highlight">&gt;</span>
            <span class="prompt-input"
                  contenteditable="plaintext-only"
                  spellcheck="false"></span>
        </p>
    </div>
`;
