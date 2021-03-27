const student = document.querySelector('#student')
const teacher = document.querySelector('#teacher')
const form = document.querySelector('form')

student.addEventListener('click', () => {
    let html = `<h1>Student</h1>
                <div id="user">
                    <input type="email" name="uAdd" id="uAdd" />
                    <input type="email" name="uDelete" id="uDelete" />
                </div>
                <input type="submit" value="Perform Changes" class="logsign bg-gray-500 p-2 rounded text-xl text-white cursor-pointer"></input>`

    form.innerHTML = html
})

teacher.addEventListener('click', () => {
    let html = `<h1>Teacher</h1>
                <div id="teacher">
                    <input type="email" name="tAdd" id="tAdd" />
                    <input type="email" name="tDelete" id="tDelete" />
                </div>
                <input type="submit" value="Perform Changes" class="logsign bg-gray-500 p-2 rounded text-xl text-white cursor-pointer"></input>`

    form.innerHTML = html
})
