document.addEventListener("DOMContentLoaded", function () {
    const srchbutton = document.getElementById('search-btn');
    const usernameInput = document.getElementById('user-name');
    const statscont = document.querySelector(".stats");
    const easyprogress = document.querySelector(".easy-pro");
    const mediumprogress = document.querySelector('.medium-pro');
    const hardprogress = document.querySelector('.Hard-pro');
    const easylabel = document.getElementById('easy-level');
    const mediumlebel = document.getElementById('medium-level');
    const hardlebel = document.getElementById('hard-level');
    const cardstats = document.querySelector('.stats-cards');

    function validateusername(username) {
        if (username.trim() == "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^(?!.*[-_]{2})(?![_-])[a-zA-Z0-9_-]{4,20}(?<![_-])$/;
        const isValid = regex.test(username);
        if (!isValid) {
            alert("Invalid username");
        }
        return isValid;
    }
    function updateprogress(total,solved,lebel,circle){
        const progress=(solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progress}%`)
        lebel.textContent=`${solved}/${total}`;
    }
    function displayuserdata(data){
        const totalquestion=data.totalQuestions;
        const totalhardques=data.totalHard;
        const totalmediumques=data.totalMedium;
        const totaeasyques=data.totalEasy;
        const totalsolved=data.totalSolved;
        const easysolved=data.easySolved;
        const mediumsolved=data.mediumSolved;
        const hardsolved=data.hardSolved;
        updateprogress(totaeasyques,easysolved,easylabel,easyprogress);
        updateprogress(totalmediumques,mediumsolved,mediumlebel,mediumprogress);
        updateprogress(totalhardques,hardsolved,hardlebel,hardprogress);
        const statsdata={
            "Accepted":data.acceptanceRate,
            "Ranking":data.ranking,
            "contripoint":data.contributionPoints
        }
        cardstats.innerHTML = Object.entries(statsdata).map(([key, value]) => {
            return `<div class="card">
                <h3>${key}</h3>
                <p>${value}</p>
            </div>`;
        }).join('');
        
    }
    async function fetchuserdetails(username = 'Akanksha_negi') {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        try {
            srchbutton.textContent = "Searching...";
            srchbutton.disabled = true;
            const respose = await fetch(url);
            if (!respose.ok) {
                throw new Error("Unable to fetch data");
            }
            const data = await respose.json();
            console.log("Logging data ", data);
            displayuserdata(data);
        }
        catch (error) {
            statscont.innerHTML = '<p>No Data Found</p>'
        }
        finally {
            srchbutton.textContent = "Search";
            srchbutton.disabled = false;
        }
    }
    srchbutton.addEventListener('click', function () {
        const username = usernameInput.value;
        if (validateusername(username)) {
            fetchuserdetails(username);
        }
    })
})