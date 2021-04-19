//Load Notes
window.onload = function (event) {
    event.preventDefault();
    fetch('/note')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i in data) {
                // console.log(data)
                document.getElementById("results").innerHTML += '<div class="content"><div class="text">' + data[i].newNote + '</div><i class="fas fa-times-circle cross" value="' + data[i]._id + '"></i></div>';
            }
        })
        .then(deleteNote)
        .then(editNote)
        .catch(error => console.log('error:', error))
}
//Create Notes
let postNote = document.getElementById("post_note");
postNote.addEventListener('submit', newPost);

function newPost(event) {
    event.preventDefault();
    let newNote = event.target.newNote.value;
    event.target.newNote.value = '';
    post = {
        newNote: newNote,
    }
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json',
        })

    }
    return fetch('/note', options)
        .then(res => res.json())
        // .then(res => console.log('result:', res))
        .then(function (data) {
            // console.log(data);
            let content = document.getElementById("results");
            let note = document.createElement('div');
            note.className = 'content';
            // note.setAttribute('contentEditable',true);
            note.innerHTML = '<div class="text">'+ data.newNote + '</div><i class="fas fa-times-circle cross" value="' + data._id + '"></i>';
            content.appendChild(note);

        })
        .then(deleteNote)
        .then(editNote)
        .catch(error => console.log('error:', error))
}
//Delete Notes
function deleteNote() {
    let deleteNote = document.querySelectorAll('.cross');
    // console.log(deleteNote);
    for (let i = 0; i < deleteNote.length; i++) {
        deleteNote[i].addEventListener('click', deletePost);
    }
    function deletePost(event) {
        event.preventDefault();
        let noteId = event.path[0].getAttribute("value");
        event.path[0].parentNode.remove();
        const options = {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                _id: noteId
            })
        }
        const URL = `/note/${noteId}`;
        fetch(URL, options)
            .then(response => response.json())
            .then(data => console.log('Note to delete:', data))
            .catch(error => console.log('error:', error))
    }
}
//Update or Edit Notes
 function editNote() {
    let note = document.getElementsByClassName("text");
    console.log('editNote', note);
    for (let i = 0; i < note.length; i++) {
        note[i].addEventListener('click',    function () {
            let content = document.getElementById("modal");
            let modal = document.createElement('div');
            modal.className = 'modal-body';
            modal.innerHTML = `<form action="/" class="updateForm">
            <input name="noteText" type="text" value="${this.firstChild.data}" />
            <input name="noteID" type="hidden" value=${this.nextElementSibling.attributes.value.value} />
            <input type="submit" value="submit" />
            </form>
            `;
            content.appendChild(modal);
            editNoteSubmit();
        });
    }
    
}

function editNoteSubmit(){
    let content = document.getElementsByClassName("updateForm");
    for (let j = 0; j < content.length; j++) {
        content[j].addEventListener('submit',function(event){
            // event.preventDefault();
            let noteText = content[j].elements['noteText'].value;
            let noteId = content[j].elements['noteID'].value;
            // orgNote.innerHTML = noteText;
            // console.log(orgNote);
            // console.log(noteId);
            // console.log(event.path[0]);
            // event.path[0].parentNode.remove();
            const options = {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    _id: noteId,
                    newNote: noteText
                })
            }
            const URL = `/note/${noteId}`;
            fetch(URL, options)
                .then(response => response.json())
                .then(data => console.log('Note to update:', data))
                .catch(error => console.log('error:', error))
        })
        
    }
}