const student = document.querySelector('.student')
const teacher = document.querySelector('.teacher')
const form = document.querySelector('form')

student.addEventListener('click', () => {
    let html = `<div class="grid grid-rows-3 items-center justify-items-center gap-y-3">
                    <div class="text-center">
                    <h1 class="text-3xl font-medium">Student's Updation Form</h1>
                    </div>
                    <div id="student" class="grid grid-cols-2 space-x-5">
                    <div class="col-start-1">
                        <label for="uAdd">Email Address to add:</label>
                        <input class="bg-gray-400 text-black rounded p-2 placeholder-gray-700 focus:outline-none focus:shadow-myOutline" type="email" name="uAdd" id="uAdd" placeholder="JohnDoe@gmail.com"/>
                    </div>
                    <div class="col-start-2">
                        <label for="uDelete">Email Address to delete:</label>
                        <input class="bg-gray-400 text-black rounded p-2 placeholder-gray-700 focus:outline-none focus:shadow-myOutline" type="email" name="uDelete" id="uDelete" placeholder="JohnDoe@gmail.com"/>
                    </div>
                    </div>
                    <div class="">
                        <input type="submit" value="Perform Changes" class="logsign bg-gray-500 p-2 rounded text-xl text-white cursor-pointer"/>
                    </div>
                    <h4 class="text-lg font-semibold text-center"> Note: Perform one operation at a time. If both are tried to perform, first operation is only performed. </h4>
                </div>`
    student.classList.add('underline')
    teacher.classList.remove('underline')
    form.innerHTML = html
    form.reset()
})

teacher.addEventListener('click', () => {
    let html = `
    <div class="grid grid-rows-3 items-center justify-items-center gap-y-3">
            <div class="text-center">
              <h1 class="text-3xl font-medium">Teacher's Updation Form</h1>
            </div>
            <div id="teacher" class="grid grid-cols-2 space-x-5">
              <div class="col-start-1">
                <label for="tAdd">Email Address to add:</label>
                <input class="bg-gray-400 text-black rounded p-2 placeholder-gray-700 focus:outline-none focus:shadow-myOutline" type="email" name="tAdd" id="tAdd" placeholder="JohnDoe@gmail.com"/>
              </div>
              <div class="col-start-2">
                <label for="tDelete">Email Address to delete:</label>
                <input class="bg-gray-400 text-black rounded p-2 placeholder-gray-700 focus:outline-none focus:shadow-myOutline" type="email" name="tDelete" id="tDelete" placeholder="JohnDoe@gmail.com"/>
              </div>
            </div>
            <div class="">
              <input type="submit" value="Perform Changes" class="logsign bg-gray-500 p-2 rounded text-xl text-white cursor-pointer"/>
            </div>
            <h4 class="text-lg font-semibold text-center"> Note: Perform one operation at a time. If both are tried to perform, first operation is only performed. </h4>
    </div>
    `
    teacher.classList.add('underline')
    student.classList.remove('underline')
    form.innerHTML = html
    form.reset()
})
