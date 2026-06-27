const clock = document.getElementById('clock');

setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString();
}, 1000);

let z = 1;

document.querySelectorAll('.task-btn').forEach(button => {
    button.onclick = () => {
        let windowElement = document.getElementById(button.dataset.open);
        windowElement.style.display = 'block';
        windowElement.style.zIndex = ++z;
    };
});

document.querySelectorAll('.window').forEach(win => {
    let header = win.querySelector('.window-header');

    win.querySelector('.close-btn').onclick = () => {
        win.style.display = 'none';
    };

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    header.onmousedown = e => {
        dragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = ++z;
    };

    document.addEventListener('mousemove', e => {
        if (!dragging) return;

        win.style.left = e.clientX - offsetX + 'px';
        win.style.top = e.clientY - offsetY + 'px';
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
    });
});

const disp = document.getElementById('calcDisplay');

document.querySelectorAll('.calc-grid button').forEach(button => {
    button.onclick = () => {
        let value = button.textContent;

        if (value === '=') {
            try {
                disp.value = eval(disp.value);
            } catch (e) {
                disp.value = 'Error';
            }
        } else if (value === 'C') {
            disp.value = '';
        } else {
            disp.value += value;
        }
    };
});

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        try {
            disp.value = eval(disp.value);
        } catch (err) {
            disp.value = 'Error';
        }
    }

    if (e.key === 'Escape') {
        disp.value = '';
    }
});

const details = {
    slack: `
        <button class="back">Back</button>
        <h2>Slack Bot</h2>
        <p>A simple Slack Bot I made for Stardance.</p>
        <a href="https://github.com/poepoepipi/SOEPBot" target="_blank" rel="noopener noreferrer">Visit the GitHub</a>
    `,
    os: `
        <button class="back">Back</button>
        <h2>SOEP OS</h2>
        <p>A browser operating system to learn about me.</p>
        <a href="https://github.com/poepoepipi/webOS" target="_blank" rel="noopener noreferrer">Visit the GitHub</a>
    `
};

const projectHome = document.getElementById('projectHome');
const projectDetail = document.getElementById('projectDetail');

document.querySelectorAll('.project-link').forEach(link => {
    link.onclick = e => {
        e.preventDefault();

        projectHome.style.display = 'none';
        projectDetail.style.display = 'block';

        projectDetail.innerHTML = details[link.dataset.project];

        projectDetail.querySelector('.back').onclick = () => {
            projectDetail.style.display = 'none';
            projectHome.style.display = 'block';
        };
    };
});

const terminal = document.getElementById("terminal");

function print(text){
    const div=document.createElement("div");
    div.innerHTML=text;
    terminal.appendChild(div);
}

function scrollTerminal() {
    const container = document.querySelector(".terminal-content");
    container.scrollTop = container.scrollHeight;
}

function prompt(){

    const line=document.createElement("div");
    line.className="prompt";

    line.innerHTML="soep@website:~$ ";

    const input=document.createElement("input");
    line.appendChild(input);

    terminal.appendChild(line);

    input.focus();

    input.addEventListener("keydown",e=>{

        if(e.key!="Enter") return;

        const cmd=input.value.trim().toLowerCase();

        input.disabled=true;

        switch(cmd){

            case "help":

                print(`Available commands:
help   - Show this menu
exit  - Go back to the CLI
clear  - Clear the terminal
neofetch - does the cool thingy
about - info about me`);

            break;

            case "about":

                print(`About Me

        Hi! I'm SOEP/poepoepipi.
        I'm a developer who enjoys building websites,
        electronics projects, servers, and other fun things.`);

            break;

            case "neofetch":

                print(`<pre>
              ███████╗ ██████╗ ███████╗██████╗       SOEP@website
              ██╔════╝██╔═══██╗██╔════╝██╔══██╗      -------------
              ███████╗██║   ██║█████╗  ██████╔╝      OS: SOEPOS 
              ╚════██║██║   ██║██╔══╝  ██╔═══╝       Host: Personal Website
              ███████║╚██████╔╝███████╗██║           Shell: website-terminal 
              ╚══════╝ ╚═════╝ ╚══════╝╚═╝           Uptime: Since you opened this page
                                                     Language: HTML / CSS / JavaScript
                                                     Status: Building cool stuff
</pre>`);
            scrollTerminal();
            break;

            case "clear":

                terminal.innerHTML="";
                prompt();
                return;

            case "exit":
                const output = document.createElement("div");
                output.textContent = "Loading...";
                terminal.appendChild(output);

                setTimeout(() => {
                    window.location.href = "index.html";
                }, 500);

                return;

            default:

                if(cmd!="")
                    print(`Unknown command: ${cmd}`);

        }

        prompt();

    });

}
prompt();